"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import Link from "next/link";
import { FiDownload, FiPlus } from "react-icons/fi";

interface InventoryHeaderProps {
  onExport: () => void;
}

const InventoryHeader = ({ onExport }: InventoryHeaderProps) => {
  const { isDark } = useMountedTheme();

  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{ color: textPrimary }}
        >
          Product Inventory
        </h1>
        <p className="text-sm mt-1" style={{ color: textSecondary }}>
          Manage and track your premium surgical equipment stock levels.
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors"
          style={{
            borderColor: inputBorder,
            color: textPrimary,
            backgroundColor: cardBg,
          }}
        >
          <FiDownload className="w-4 h-4" />
          Export
        </button>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: primary }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = primaryHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = primary)
          }
        >
          <FiPlus className="w-4 h-4" />
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default InventoryHeader;
