/**
 * Admin UI kit — tables, filters, status badges, bulk actions.
 * Import from "@/components/admin" across the admin area.
 */

export {
  StatusBadge,
  StatusBadgePreset,
  VisibilityBadge,
  type StatusBadgeProps,
  type StatusBadgePresetProps,
  type StatusPreset,
  type StatusTone,
} from "./status-badge";

export {
  FilterBar,
  type FilterBarProps,
  type FilterDefinition,
  type FilterOption,
  type FilterValues,
} from "./filter-bar";

export {
  BulkActionsBar,
  type BulkAction,
  type BulkActionsBarProps,
} from "./bulk-actions";

export {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
  type RowAction,
  type SortState,
  type SortDirection,
} from "./data-table";
