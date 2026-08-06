"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiFilter, FiTrash2 } from "react-icons/fi";
import { toLabel } from "@/lib/format";

interface InventoryFiltersProps {
  categories: string[];
  categoryFilter: string;
  statusFilter: string;
  statusOptions: string[];
  selectedCount: number;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  onBulkDelete: () => void;
}

const InventoryFilters = ({
  categories,
  categoryFilter,
  statusFilter,
  statusOptions,
  selectedCount,
  onCategoryChange,
  onStatusChange,
  onClearFilters,
  onBulkDelete,
}: InventoryFiltersProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#FFFFFF";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";
  const primary = isDark ? "#60A5FA" : "#025395";
  const danger = isDark ? "#F87171" : "#DC2626";

  const inputStyle = {
    backgroundColor: inputBg,
    borderColor: inputBorder,
    color: textPrimary,
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4"
      style={{ backgroundColor: cardBg, borderColor: cardBorder }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-1.5 text-sm"
          style={{ color: textSecondary }}
        >
          <FiFilter className="w-4 h-4" />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm outline-none"
          style={inputStyle}
        >
          <option value="All Categories">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {toLabel(cat)}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm outline-none"
          style={inputStyle}
        >
          <option value="All Statuses">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {(categoryFilter !== "All Categories" ||
          statusFilter !== "All Statuses") && (
          <button
            onClick={onClearFilters}
            className="text-sm font-semibold"
            style={{ color: primary }}
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: textMuted }}
        >
          Bulk Actions:
        </span>
        <button
          onClick={onBulkDelete}
          disabled={selectedCount === 0}
          className="p-2 rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderColor: inputBorder,
            color: danger,
          }}
          aria-label="Bulk delete"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InventoryFilters;
