import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { toast } from "sonner";
import {
  UserCheck,
  Trash2,
  Tag,
  Download,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DataTable,
  FilterBar,
  BulkActionsBar,
  StatusBadgePreset,
  type DataTableColumn,
  type FilterDefinition,
  type FilterValues,
  type SortState,
  type BulkAction,
} from "@/components/admin";
import { LeadDetailDrawer } from "@/components/admin/lead-detail-drawer";
import {
  AGENTS,
  CITIES,
  MOCK_LEADS,
  SOURCE_LABELS,
  STATUS_LABELS,
  STATUS_PRESET,
  agentName,
  formatINR,
  relativeTime,
  type Lead,
  type LeadStatus,
} from "@/lib/leads-mock";

/* -------- Search params -------- */

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  city: fallback(z.string(), "").default(""),
  source: fallback(z.string().array(), []).default([]),
  status: fallback(z.string().array(), []).default([]),
  assigned: fallback(z.string(), "").default(""),
  page: fallback(z.number().int(), 1).default(1),
  pageSize: fallback(z.number().int(), 10).default(10),
  sortKey: fallback(z.string(), "createdAt").default("createdAt"),
  sortDir: fallback(z.string(), "desc").default("desc"),
});

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [
      { title: "Lead Management — CSA Prime Realty Admin" },
      {
        name: "description",
        content:
          "Manage, filter, and assign real-estate leads across cities, sources, and pipeline stages.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: zodValidator(searchSchema),
  component: LeadsAdminPage,
});

/* -------- Page -------- */

function LeadsAdminPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  // Local editable store (until Cloud is wired).
  const [leads, setLeads] = React.useState<Lead[]>(MOCK_LEADS);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [drawerId, setDrawerId] = React.useState<string | null>(null);
  const [assignOpen, setAssignOpen] = React.useState(false);
  const [assignTarget, setAssignTarget] = React.useState<string>("");

  /* --- Derived: filter + sort --- */
  const filtered = React.useMemo(() => {
    const q = search.q.toLowerCase().trim();
    return leads.filter((l) => {
      if (search.city && l.city !== search.city) return false;
      if (search.source.length && !search.source.includes(l.source)) return false;
      if (search.status.length && !search.status.includes(l.status)) return false;
      if (search.assigned === "unassigned" && l.assignedTo) return false;
      if (search.assigned && search.assigned !== "unassigned" && l.assignedTo !== search.assigned)
        return false;
      if (q) {
        const hay = `${l.name} ${l.phone} ${l.email} ${l.id} ${l.interestedIn}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    const dir = search.sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      const key = search.sortKey as keyof Lead;
      const av = a[key] as unknown;
      const bv = b[key] as unknown;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av ?? "").localeCompare(String(bv ?? "")) * dir;
    });
    return arr;
  }, [filtered, search.sortKey, search.sortDir]);

  const paged = React.useMemo(() => {
    const start = (search.page - 1) * search.pageSize;
    return sorted.slice(start, start + search.pageSize);
  }, [sorted, search.page, search.pageSize]);

  /* --- Stats --- */
  const stats = React.useMemo(() => {
    const total = leads.length;
    const unassigned = leads.filter((l) => !l.assignedTo).length;
    const hot = leads.filter((l) => l.priority === "high").length;
    const won = leads.filter((l) => l.status === "won").length;
    return { total, unassigned, hot, won };
  }, [leads]);

  /* --- Filters config --- */
  const filters: FilterDefinition[] = [
    {
      key: "city",
      label: "City",
      type: "select",
      options: CITIES.map((c) => ({ label: c, value: c })),
    },
    {
      key: "source",
      label: "Source",
      type: "multi",
      options: (Object.keys(SOURCE_LABELS) as (keyof typeof SOURCE_LABELS)[]).map((s) => ({
        label: SOURCE_LABELS[s],
        value: s,
        count: leads.filter((l) => l.source === s).length,
      })),
    },
    {
      key: "status",
      label: "Status",
      type: "multi",
      options: (Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => ({
        label: STATUS_LABELS[s],
        value: s,
        count: leads.filter((l) => l.status === s).length,
      })),
    },
    {
      key: "assigned",
      label: "Owner",
      type: "select",
      options: [
        { label: "Unassigned", value: "unassigned" },
        ...AGENTS.map((a) => ({ label: a.name, value: a.id })),
      ],
    },
  ];

  const values: FilterValues = {
    city: search.city || undefined,
    source: search.source.length ? search.source : undefined,
    status: search.status.length ? search.status : undefined,
    assigned: search.assigned || undefined,
  };

  const setSearch = (patch: Record<string, unknown>) =>
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) });

  const onValuesChange = (v: FilterValues) => {
    setSearch({
      city: (v.city as string | undefined) ?? "",
      source: (v.source as string[] | undefined) ?? [],
      status: (v.status as string[] | undefined) ?? [],
      assigned: (v.assigned as string | undefined) ?? "",
      page: 1,
    });
  };

  const resetFilters = () =>
    setSearch({ city: "", source: [], status: [], assigned: "", q: "", page: 1 });

  /* --- Columns --- */
  const columns: DataTableColumn<Lead>[] = [
    {
      key: "name",
      header: "Lead",
      sortable: true,
      cell: (l) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {l.name
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {l.name}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-mono">{l.id}</span>
              <span>·</span>
              <span>{l.phone}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "interestedIn",
      header: "Interested in",
      hideBelow: "md",
      cell: (l) => (
        <div className="min-w-0">
          <div className="truncate text-sm text-foreground">{l.interestedIn}</div>
          <div className="text-xs text-muted-foreground">
            {l.locality ? `${l.locality}, ` : ""}
            {l.city}
          </div>
        </div>
      ),
    },
    {
      key: "budgetMax",
      header: "Budget",
      sortable: true,
      hideBelow: "lg",
      cell: (l) => (
        <span className="whitespace-nowrap text-sm">
          {formatINR(l.budgetMin)}
          <span className="text-muted-foreground"> – </span>
          {formatINR(l.budgetMax)}
        </span>
      ),
    },
    {
      key: "source",
      header: "Source",
      hideBelow: "md",
      cell: (l) => (
        <span className="text-xs text-muted-foreground">{SOURCE_LABELS[l.source]}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (l) => (
        <StatusBadgePreset preset={STATUS_PRESET[l.status]} label={STATUS_LABELS[l.status]} />
      ),
    },
    {
      key: "assignedTo",
      header: "Owner",
      hideBelow: "sm",
      cell: (l) =>
        l.assignedTo ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">
                {agentName(l.assignedTo)
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">{agentName(l.assignedTo)}</span>
          </div>
        ) : (
          <span className="text-xs italic text-muted-foreground">Unassigned</span>
        ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      align: "right",
      hideBelow: "lg",
      cell: (l) => (
        <span className="text-xs text-muted-foreground">{relativeTime(l.createdAt)}</span>
      ),
    },
  ];

  /* --- Row actions --- */
  const rowActions = [
    {
      id: "call",
      label: "Call",
      icon: Phone,
      onSelect: (l: Lead) => window.open(`tel:${l.phone}`),
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      onSelect: (l: Lead) =>
        window.open(`https://wa.me/${l.phone.replace(/\D/g, "")}`, "_blank"),
    },
    {
      id: "assign",
      label: "Assign to…",
      icon: UserCheck,
      onSelect: (l: Lead) => {
        setSelectedIds([l.id]);
        setAssignOpen(true);
      },
    },
    {
      id: "delete",
      label: "Delete",
      icon: Trash2,
      destructive: true,
      onSelect: (l: Lead) => {
        if (!confirm(`Delete lead ${l.name}?`)) return;
        setLeads((prev) => prev.filter((x) => x.id !== l.id));
        toast.success("Lead deleted");
      },
    },
  ];

  /* --- Bulk actions --- */
  const bulkActions: BulkAction<Lead>[] = [
    {
      id: "assign",
      label: "Assign",
      icon: UserCheck,
      onRun: () => setAssignOpen(true),
    },
    {
      id: "status",
      label: "Mark Qualified",
      icon: Tag,
      onRun: (ids) => {
        setLeads((prev) =>
          prev.map((l) => (ids.includes(l.id) ? { ...l, status: "qualified" } : l))
        );
        toast.success(`Marked ${ids.length} lead(s) as Qualified`);
        setSelectedIds([]);
      },
    },
    {
      id: "export",
      label: "Export CSV",
      icon: Download,
      onRun: (ids) => {
        toast.info(`Exporting ${ids.length} lead(s)…`);
      },
    },
    {
      id: "delete",
      label: "Delete",
      icon: Trash2,
      destructive: true,
      confirm: "Delete the selected leads? This cannot be undone.",
      onRun: (ids) => {
        setLeads((prev) => prev.filter((l) => !ids.includes(l.id)));
        toast.success(`Deleted ${ids.length} lead(s)`);
        setSelectedIds([]);
      },
    },
  ];

  /* --- Handlers --- */
  const currentLead = drawerId ? leads.find((l) => l.id === drawerId) ?? null : null;

  const patchLead = (id: string, patch: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const next = { ...l, ...patch };
        // Log activity for meaningful field changes
        const events: Lead["activity"] = [];
        if (patch.status && patch.status !== l.status) {
          events.push({
            id: `${Date.now()}-s`,
            at: new Date().toISOString(),
            type: "status_change",
            by: "You",
            message: `Status changed from ${STATUS_LABELS[l.status]} to ${STATUS_LABELS[patch.status]}.`,
          });
        }
        if ("assignedTo" in patch && patch.assignedTo !== l.assignedTo) {
          events.push({
            id: `${Date.now()}-a`,
            at: new Date().toISOString(),
            type: "assignment",
            by: "You",
            message: `Assigned to ${agentName(patch.assignedTo ?? undefined)}.`,
          });
        }
        next.activity = [...events, ...l.activity];
        return next;
      })
    );
  };

  const doBulkAssign = () => {
    if (!assignTarget || selectedIds.length === 0) return;
    const assignedTo = assignTarget === "__unassigned__" ? undefined : assignTarget;
    selectedIds.forEach((id) => patchLead(id, { assignedTo }));
    toast.success(
      `${selectedIds.length} lead(s) assigned to ${agentName(assignedTo)}`
    );
    setAssignOpen(false);
    setAssignTarget("");
    setSelectedIds([]);
  };

  const sort: SortState = { key: search.sortKey, direction: search.sortDir as "asc" | "desc" };

  return (
    <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
            Admin · CRM
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
            Lead Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Filter, assign, and progress leads across the sales pipeline.
          </p>
        </div>
      </header>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total leads" value={stats.total} />
        <StatCard label="Unassigned" value={stats.unassigned} tone="warning" />
        <StatCard label="High priority" value={stats.hot} tone="danger" />
        <StatCard label="Won this cycle" value={stats.won} tone="success" />
      </div>

      {/* Filters */}
      <FilterBar
        search={search.q}
        onSearchChange={(v) => setSearch({ q: v, page: 1 })}
        searchPlaceholder="Search by name, phone, email, ID…"
        filters={filters}
        values={values}
        onValuesChange={onValuesChange}
        onReset={resetFilters}
        onExport={() => toast.info("Exporting current view…")}
        onCreate={() => toast.info("New lead form (wire once Cloud is enabled).")}
        createLabel="New lead"
      />

      {/* Bulk actions */}
      <BulkActionsBar
        selectedIds={selectedIds}
        totalCount={sorted.length}
        actions={bulkActions}
        onClear={() => setSelectedIds([])}
        onSelectAll={() => setSelectedIds(sorted.map((l) => l.id))}
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={paged}
        rowKey={(l) => l.id}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        sort={sort}
        onSortChange={(s) =>
          setSearch({
            sortKey: s?.key ?? "createdAt",
            sortDir: s?.direction ?? "desc",
          })
        }
        rowActions={rowActions}
        onRowClick={(l) => setDrawerId(l.id)}
        emptyTitle="No leads match these filters"
        emptyDescription="Adjust filters or reset to see all leads."
        emptyAction={
          <Button size="sm" variant="outline" onClick={resetFilters}>
            Reset filters
          </Button>
        }
        pagination={{
          page: search.page,
          pageSize: search.pageSize,
          total: sorted.length,
          onPageChange: (page) => setSearch({ page }),
          onPageSizeChange: (pageSize) => setSearch({ pageSize, page: 1 }),
        }}
      />

      {/* Detail drawer */}
      <LeadDetailDrawer
        lead={currentLead}
        open={!!drawerId}
        onOpenChange={(o) => !o && setDrawerId(null)}
        onUpdate={(patch) => drawerId && patchLead(drawerId, patch)}
        onAddNote={(message) => {
          if (!drawerId) return;
          setLeads((prev) =>
            prev.map((l) =>
              l.id === drawerId
                ? {
                    ...l,
                    lastContactAt: new Date().toISOString(),
                    activity: [
                      {
                        id: `${Date.now()}-n`,
                        at: new Date().toISOString(),
                        type: "note",
                        by: "You",
                        message,
                      },
                      ...l.activity,
                    ],
                  }
                : l
            )
          );
          toast.success("Note added");
        }}
      />

      {/* Bulk assignment dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign leads</DialogTitle>
            <DialogDescription>
              Choose an owner for {selectedIds.length} selected lead
              {selectedIds.length === 1 ? "" : "s"}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Assign to
            </label>
            <Select value={assignTarget} onValueChange={setAssignTarget}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__unassigned__">Unassigned</SelectItem>
                {AGENTS.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={doBulkAssign} disabled={!assignTarget}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* -------- Small stat card -------- */

function StatCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const toneCls = {
    neutral: "text-foreground",
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
  }[tone];
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold tabular-nums ${toneCls}`}>
        {value.toLocaleString("en-IN")}
      </div>
    </div>
  );
}
