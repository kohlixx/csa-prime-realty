import * as React from "react";
import { Search, X, SlidersHorizontal, Download, Plus, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* --------------------------- Types --------------------------- */

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterDefinition {
  /** Stable key used in the value map. */
  key: string;
  label: string;
  /** `select` = single value, `multi` = checkbox list, `toggle` = on/off. */
  type: "select" | "multi" | "toggle";
  options?: FilterOption[];
  placeholder?: string;
}

export type FilterValues = Record<string, string | string[] | boolean | undefined>;

/* --------------------------- Root --------------------------- */

export interface FilterBarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  filters?: FilterDefinition[];
  values?: FilterValues;
  onValuesChange?: (next: FilterValues) => void;

  onReset?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onCreate?: () => void;
  createLabel?: string;

  /** Right-side custom controls (extra buttons, view switchers, etc.). */
  trailing?: React.ReactNode;
  /** Optional slot rendered below the row (bulk actions, tabs, etc.). */
  footer?: React.ReactNode;

  className?: string;
}

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  filters = [],
  values = {},
  onValuesChange,
  onReset,
  onRefresh,
  onExport,
  onCreate,
  createLabel = "New",
  trailing,
  footer,
  className,
}: FilterBarProps) {
  const activeChips = React.useMemo(() => buildChips(filters, values), [filters, values]);
  const hasActive = activeChips.length > 0 || (search && search.length > 0);

  const setValue = (key: string, value: FilterValues[string]) => {
    if (!onValuesChange) return;
    const next = { ...values, [key]: value };
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      delete next[key];
    }
    onValuesChange(next);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {onSearchChange ? (
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 pl-9 pr-9"
            />
            {search ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        ) : null}

        {filters.map((f) => (
          <FilterControl
            key={f.key}
            def={f}
            value={values[f.key]}
            onChange={(v) => setValue(f.key, v)}
          />
        ))}

        <div className="ml-auto flex items-center gap-1.5">
          {trailing}
          {onRefresh ? (
            <Button variant="ghost" size="icon" onClick={onRefresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          ) : null}
          {onExport ? (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
          ) : null}
          {onCreate ? (
            <Button size="sm" onClick={onCreate}>
              <Plus className="mr-1.5 h-4 w-4" />
              {createLabel}
            </Button>
          ) : null}
        </div>
      </div>

      {hasActive ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeChips.map((chip) => (
            <Badge
              key={chip.id}
              variant="outline"
              className="gap-1 rounded-full pl-2.5 pr-1 font-normal"
            >
              <span className="text-muted-foreground">{chip.label}:</span>
              <span className="text-foreground">{chip.value}</span>
              <button
                type="button"
                aria-label={`Remove ${chip.label} filter`}
                onClick={() => chip.clear(setValue)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-background/70"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {onReset ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Reset all
            </Button>
          ) : null}
        </div>
      ) : null}

      {footer}
    </div>
  );
}

/* --------------------------- Individual filter control --------------------------- */

function FilterControl({
  def,
  value,
  onChange,
}: {
  def: FilterDefinition;
  value: FilterValues[string];
  onChange: (v: FilterValues[string]) => void;
}) {
  if (def.type === "select") {
    const current = (value as string | undefined) ?? "";
    return (
      <Select
        value={current || undefined}
        onValueChange={(v) => onChange(v === "__all__" ? undefined : v)}
      >
        <SelectTrigger className="h-10 w-auto min-w-[140px] gap-1">
          <SelectValue placeholder={def.placeholder ?? def.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All {def.label}</SelectItem>
          {def.options?.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
              {typeof o.count === "number" ? (
                <span className="ml-2 text-xs text-muted-foreground">{o.count}</span>
              ) : null}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (def.type === "toggle") {
    const on = Boolean(value);
    return (
      <Button
        type="button"
        variant={on ? "default" : "outline"}
        size="sm"
        className="h-10"
        onClick={() => onChange(on ? undefined : true)}
      >
        {def.label}
      </Button>
    );
  }

  // multi
  const selected = (value as string[] | undefined) ?? [];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 gap-1.5">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {def.label}
          {selected.length > 0 ? (
            <>
              <Separator orientation="vertical" className="mx-1 h-4" />
              <Badge variant="outline" className="rounded-sm px-1 font-normal">
                {selected.length}
              </Badge>
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-2">
        <div className="max-h-64 space-y-0.5 overflow-auto">
          {def.options?.map((o) => {
            const checked = selected.includes(o.value);
            return (
              <label
                key={o.value}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                  checked && "bg-muted/60"
                )}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-primary"
                    checked={checked}
                    onChange={() =>
                      onChange(
                        checked
                          ? selected.filter((s) => s !== o.value)
                          : [...selected, o.value]
                      )
                    }
                  />
                  {o.label}
                </span>
                {typeof o.count === "number" ? (
                  <span className="text-xs text-muted-foreground">{o.count}</span>
                ) : null}
              </label>
            );
          })}
        </div>
        {selected.length > 0 ? (
          <>
            <Separator className="my-1.5" />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-xs"
              onClick={() => onChange(undefined)}
            >
              Clear
            </Button>
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

/* --------------------------- Chip helpers --------------------------- */

interface Chip {
  id: string;
  label: string;
  value: string;
  clear: (setValue: (key: string, v: FilterValues[string]) => void) => void;
}

function buildChips(defs: FilterDefinition[], values: FilterValues): Chip[] {
  const chips: Chip[] = [];
  for (const def of defs) {
    const v = values[def.key];
    if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) continue;
    if (def.type === "multi" && Array.isArray(v)) {
      for (const item of v) {
        const opt = def.options?.find((o) => o.value === item);
        chips.push({
          id: `${def.key}:${item}`,
          label: def.label,
          value: opt?.label ?? item,
          clear: (setValue) =>
            setValue(
              def.key,
              (v as string[]).filter((x) => x !== item)
            ),
        });
      }
    } else if (def.type === "toggle") {
      chips.push({
        id: def.key,
        label: def.label,
        value: "On",
        clear: (setValue) => setValue(def.key, undefined),
      });
    } else {
      const opt = def.options?.find((o) => o.value === v);
      chips.push({
        id: def.key,
        label: def.label,
        value: opt?.label ?? String(v),
        clear: (setValue) => setValue(def.key, undefined),
      });
    }
  }
  return chips;
}
