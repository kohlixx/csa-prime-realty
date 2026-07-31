import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadgePreset } from "@/components/admin";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  IndianRupee,
  Building2,
  Sparkles,
  UserCheck,
  Clock,
  StickyNote,
  Send,
} from "lucide-react";
import {
  AGENTS,
  agentName,
  formatINR,
  relativeTime,
  SOURCE_LABELS,
  STATUS_LABELS,
  STATUS_PRESET,
  type Lead,
  type LeadStatus,
} from "@/lib/leads-mock";
import { cn } from "@/lib/utils";

export interface LeadDetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (patch: Partial<Lead>) => void;
  onAddNote: (message: string) => void;
}

export function LeadDetailDrawer({
  lead,
  open,
  onOpenChange,
  onUpdate,
  onAddNote,
}: LeadDetailDrawerProps) {
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    if (!open) setNote("");
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-xl"
      >
        {lead ? (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 to-transparent px-6 pb-5 pt-6">
              <SheetHeader className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <Avatar className="h-11 w-11 border">
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                      {lead.name
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <SheetTitle className="truncate text-lg">
                      {lead.name}
                    </SheetTitle>
                    <SheetDescription className="flex items-center gap-1.5 text-xs">
                      <span className="font-mono">{lead.id}</span>
                      <span>·</span>
                      <span>Created {relativeTime(lead.createdAt)}</span>
                    </SheetDescription>
                  </div>
                  <StatusBadgePreset preset={STATUS_PRESET[lead.status]} label={STATUS_LABELS[lead.status]} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    asChild
                  >
                    <a href={`tel:${lead.phone}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      Call
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="h-8" asChild>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="h-8" asChild>
                    <a href={`mailto:${lead.email}`}>
                      <Mail className="mr-1.5 h-3.5 w-3.5" />
                      Email
                    </a>
                  </Button>
                </div>
              </SheetHeader>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              {/* Score + priority */}
              <div className="grid grid-cols-3 gap-3">
                <StatTile
                  label="Lead Score"
                  value={`${lead.score}`}
                  icon={Sparkles}
                  tone={lead.score >= 75 ? "success" : lead.score >= 50 ? "warning" : "neutral"}
                />
                <StatTile
                  label="Priority"
                  value={lead.priority.toUpperCase()}
                  icon={Clock}
                  tone={lead.priority === "high" ? "danger" : lead.priority === "medium" ? "warning" : "neutral"}
                />
                <StatTile
                  label="Last Contact"
                  value={relativeTime(lead.lastContactAt)}
                  icon={UserCheck}
                  tone="neutral"
                />
              </div>

              {/* Details */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Requirement
                </h3>
                <div className="rounded-xl border border-border/60 bg-card p-4 text-sm">
                  <DetailRow icon={Building2} label="Interested in" value={lead.interestedIn} />
                  <DetailRow
                    icon={MapPin}
                    label="Location"
                    value={`${lead.locality ? lead.locality + ", " : ""}${lead.city}`}
                  />
                  <DetailRow
                    icon={IndianRupee}
                    label="Budget"
                    value={`${formatINR(lead.budgetMin)} – ${formatINR(lead.budgetMax)}`}
                  />
                  <DetailRow
                    icon={Sparkles}
                    label="Source"
                    value={SOURCE_LABELS[lead.source]}
                    last
                  />
                </div>
              </section>

              {/* Assignment & status controls */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Ownership
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">
                      Assigned to
                    </label>
                    <Select
                      value={lead.assignedTo ?? "__unassigned__"}
                      onValueChange={(v) =>
                        onUpdate({ assignedTo: v === "__unassigned__" ? undefined : v })
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
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
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">
                      Status
                    </label>
                    <Select
                      value={lead.status}
                      onValueChange={(v) => onUpdate({ status: v as LeadStatus })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
                          <SelectItem key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              {/* Add note */}
              <section className="space-y-2">
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <StickyNote className="h-3.5 w-3.5" />
                  Add note
                </h3>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Log a call summary, follow-up, or internal note…"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    disabled={!note.trim()}
                    onClick={() => {
                      onAddNote(note.trim());
                      setNote("");
                    }}
                  >
                    <Send className="mr-1.5 h-3.5 w-3.5" />
                    Post note
                  </Button>
                </div>
              </section>

              <Separator />

              {/* Activity timeline */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Activity
                </h3>
                <ol className="relative space-y-4 border-l border-border/60 pl-4">
                  {[...lead.activity]
                    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
                    .map((a) => (
                      <li key={a.id} className="relative">
                        <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {a.by}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {relativeTime(a.at)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {a.message}
                        </p>
                      </li>
                    ))}
                </ol>
              </section>
            </div>

            {/* Footer summary */}
            <div className="border-t border-border/60 bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
              Owned by{" "}
              <span className="font-medium text-foreground">
                {agentName(lead.assignedTo)}
              </span>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  last,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 py-2",
        !last && "border-b border-border/50"
      )}
    >
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "success" | "warning" | "danger" | "neutral";
}) {
  const toneCls = {
    success: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
    warning: "text-amber-700 bg-amber-50 dark:bg-amber-500/10",
    danger: "text-rose-600 bg-rose-50 dark:bg-rose-500/10",
    neutral: "text-muted-foreground bg-muted",
  }[tone];
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3">
      <div className={cn("mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-lg", toneCls)}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
