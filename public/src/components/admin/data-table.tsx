import * as React from "react";
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  MoreHorizontal,
  Inbox,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* --------------------------- Types --------------------------- */

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  /** Cell renderer; return a ReactNode. */
  cell: (row: T, index: number) => React.ReactNode;
  /** Enables sort UI in the header; parent controls actual ordering. */
  sortable?: boolean;
  width?: number | string;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
  /** Hide column at breakpoints below md/lg. */
  hideBelow?: "sm" | "md" | "lg" | "xl";
}

export interface RowAction<T> {
  id: string;
  label: string;
  icon?: LucideIcon;
  destructive?: boolean;
  disabled?: (row: T) => boolean;
  onSelect: (row: T) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;

  /** Loading skeleton rows. */
  loading?: boolean;
  loadingRows?: number;

  /** Empty state overrides. */
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
  emptyAction?: React.ReactNode;

  /** Selection. */
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;

  /** Sorting (controlled). */
  sort?: SortState | null;
  onSortChange?: (sort: SortState | null) => void;

  /** Row actions rendered in a trailing kebab menu. */
  rowActions?: RowAction<T>[];
  onRowClick?: (row: T) => void;

  /** Pagination (controlled). Omit to hide. */
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };

  className?: string;
  /** Sticky header when scrolling. */
  stickyHeader?: boolean;
  /** Optional caption for screen readers. */
  caption?: string;
}

/* --------------------------- Component --------------------------- */

export function DataTable<T>({
  columns,
  data,
  rowKey,
  loading,
  loadingRows = 6,
  emptyTitle = "No results",
  emptyDescription = "Try adjusting your filters or search.",
  emptyIcon: EmptyIcon = Inbox,
  emptyAction,
  selectable,
  selectedIds = [],
  onSelectionChange,
  sort,
  onSortChange,
  rowActions,
  onRowClick,
  pagination,
  className,
  stickyHeader,
  caption,
}: DataTableProps<T>) {
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const allOnPageIds = data.map(rowKey);
  const allChecked =
    allOnPageIds.length > 0 && allOnPageIds.every((id) => selectedSet.has(id));
  const someChecked =
    !allChecked && allOnPageIds.some((id) => selectedSet.has(id));

  const toggleAll = () => {
    if (!onSelectionChange) return;
    if (allChecked) {
      onSelectionChange(selectedIds.filter((id) => !allOnPageIds.includes(id)));
    } else {
      const merged = new Set(selectedIds);
      allOnPageIds.forEach((id) => merged.add(id));
      onSelectionChange(Array.from(merged));
    }
  };

  const toggleRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedSet.has(id)) {
      onSelectionChange(selectedIds.filter((x) => x !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable || !onSortChange) return;
    if (!sort || sort.key !== col.key) {
      onSortChange({ key: col.key, direction: "asc" });
    } else if (sort.direction === "asc") {
      onSortChange({ key: col.key, direction: "desc" });
    } else {
      onSortChange(null);
    }
  };

  const totalCols =
    columns.length + (selectable ? 1 : 0) + (rowActions?.length ? 1 : 0);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/60 bg-card",
        className
      )}
    >
      <div className="relative overflow-x-auto">
        <Table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader
            className={cn(
              "bg-muted/40",
              stickyHeader && "sticky top-0 z-10 backdrop-blur-md"
            )}
          >
            <TableRow className="hover:bg-transparent">
              {selectable ? (
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="Select all rows on page"
                    checked={allChecked ? true : someChecked ? "indeterminate" : false}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
              ) : null}
              {columns.map((col) => {
                const active = sort?.key === col.key;
                return (
                  <TableHead
                    key={col.key}
                    style={{ width: col.width }}
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.hideBelow === "sm" && "hidden sm:table-cell",
                      col.hideBelow === "md" && "hidden md:table-cell",
                      col.hideBelow === "lg" && "hidden lg:table-cell",
                      col.hideBelow === "xl" && "hidden xl:table-cell",
                      col.headerClassName
                    )}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1 py-0.5 -mx-1 hover:bg-background/60",
                          active && "text-foreground"
                        )}
                      >
                        {col.header}
                        {active ? (
                          sort!.direction === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-3 w-3 opacity-50" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                );
              })}
              {rowActions?.length ? (
                <TableHead className="w-10 text-right" aria-label="Row actions" />
              ) : null}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <TableRow key={`sk-${i}`}>
                  {selectable ? (
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded" />
                    </TableCell>
                  ) : null}
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(
                        col.hideBelow === "sm" && "hidden sm:table-cell",
                        col.hideBelow === "md" && "hidden md:table-cell",
                        col.hideBelow === "lg" && "hidden lg:table-cell",
                        col.hideBelow === "xl" && "hidden xl:table-cell"
                      )}
                    >
                      <Skeleton className="h-4 w-[70%]" />
                    </TableCell>
                  ))}
                  {rowActions?.length ? (
                    <TableCell>
                      <Skeleton className="ml-auto h-6 w-6 rounded-md" />
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={totalCols} className="h-64">
                  <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2 text-center">
                    <div className="rounded-full bg-muted p-3 text-muted-foreground">
                      <EmptyIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {emptyTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {emptyDescription}
                    </p>
                    {emptyAction ? <div className="mt-2">{emptyAction}</div> : null}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => {
                const id = rowKey(row);
                const selected = selectedSet.has(id);
                return (
                  <TableRow
                    key={id}
                    data-state={selected ? "selected" : undefined}
                    className={cn(
                      "group",
                      onRowClick && "cursor-pointer",
                      selected && "bg-primary/5"
                    )}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {selectable ? (
                      <TableCell
                        onClick={(e) => e.stopPropagation()}
                        className="w-10"
                      >
                        <Checkbox
                          aria-label="Select row"
                          checked={selected}
                          onCheckedChange={() => toggleRow(id)}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className={cn(
                          "align-middle",
                          col.align === "right" && "text-right",
                          col.align === "center" && "text-center",
                          col.hideBelow === "sm" && "hidden sm:table-cell",
                          col.hideBelow === "md" && "hidden md:table-cell",
                          col.hideBelow === "lg" && "hidden lg:table-cell",
                          col.hideBelow === "xl" && "hidden xl:table-cell",
                          col.className
                        )}
                      >
                        {col.cell(row, i)}
                      </TableCell>
                    ))}
                    {rowActions?.length ? (
                      <TableCell
                        className="w-10 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <RowActionsMenu actions={rowActions} row={row} />
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && !loading && data.length > 0 ? (
        <TablePagination pagination={pagination} />
      ) : null}
    </div>
  );
}

/* --------------------------- Row actions --------------------------- */

function RowActionsMenu<T>({
  actions,
  row,
}: {
  actions: RowAction<T>[];
  row: T;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Row actions"
          className="h-8 w-8 opacity-60 group-hover:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {actions.map((a, i) => {
          const Icon = a.icon;
          const disabled = a.disabled?.(row) ?? false;
          const showSep =
            i > 0 && a.destructive && !actions[i - 1].destructive;
          return (
            <React.Fragment key={a.id}>
              {showSep ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem
                disabled={disabled}
                onSelect={() => a.onSelect(row)}
                className={cn(
                  a.destructive && "text-destructive focus:text-destructive"
                )}
              >
                {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                {a.label}
              </DropdownMenuItem>
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* --------------------------- Pagination --------------------------- */

function TablePagination({
  pagination,
}: {
  pagination: NonNullable<DataTableProps<unknown>["pagination"]>;
}) {
  const { page, pageSize, total, pageSizeOptions = [10, 25, 50, 100] } = pagination;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 bg-muted/20 px-3 py-2 text-sm sm:flex-row">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>
          {start.toLocaleString()}–{end.toLocaleString()} of{" "}
          {total.toLocaleString()}
        </span>
        {pagination.onPageSizeChange ? (
          <>
            <span className="mx-1 h-4 w-px bg-border" />
            <span>Rows</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => pagination.onPageSizeChange?.(Number(v))}
            >
              <SelectTrigger className="h-8 w-[72px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page <= 1}
          onClick={() => pagination.onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="px-2 text-xs text-muted-foreground">
          Page <span className="font-medium text-foreground">{page}</span> /{" "}
          {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page >= totalPages}
          onClick={() => pagination.onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
