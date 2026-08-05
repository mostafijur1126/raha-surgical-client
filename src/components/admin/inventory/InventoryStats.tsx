"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiAlertTriangle, FiPackage, FiDollarSign } from "react-icons/fi";

interface InventoryStatsProps {
  totalProducts: number;
  lowStockAlerts: number;
  outOfStock: number;
  totalInventoryValue: number;
}

const InventoryStats = ({
  totalProducts,
  lowStockAlerts,
  outOfStock,
  totalInventoryValue,
}: InventoryStatsProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const primary = isDark ? "#60A5FA" : "#025395";
  const lowStockColor = isDark ? "#FBBF24" : "#B45309";

  const formatInventoryValue = (value: number) => {
    if (value >= 1_000_000) return `৳${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `৳${(value / 1_000).toFixed(1)}K`;
    return `৳${value.toFixed(0)}`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Products */}
      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: textMuted }}
        >
          Total Products
        </p>
        <span
          className="text-2xl font-bold block mt-1.5"
          style={{ color: textPrimary }}
        >
          {totalProducts.toLocaleString()}
        </span>
      </div>

      {/* Low Stock Alerts */}
      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: textMuted }}
        >
          Low Stock Alerts
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-2xl font-bold" style={{ color: lowStockColor }}>
            {lowStockAlerts}
          </span>
          <FiAlertTriangle
            className="w-5 h-5"
            style={{ color: lowStockColor }}
          />
        </div>
      </div>

      {/* Out of Stock */}
      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: textMuted }}
        >
          Out of Stock
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-2xl font-bold" style={{ color: textPrimary }}>
            {String(outOfStock).padStart(2, "0")}
          </span>
          <FiPackage className="w-5 h-5" style={{ color: textMuted }} />
        </div>
      </div>

      {/* Total Inventory Value */}
      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: textMuted }}
        >
          Total Inventory Value
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-2xl font-bold" style={{ color: primary }}>
            {formatInventoryValue(totalInventoryValue)}
          </span>
          <FiDollarSign className="w-5 h-5" style={{ color: primary }} />
        </div>
      </div>
    </div>
  );
};

export default InventoryStats;
