"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiEye, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";
import { toLabel } from "@/lib/format";
import { getSinglePrice } from "@/lib/productHelpers";
import type { Product } from "@/lib/types";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface InventoryTableProps {
  products: Product[];
  selectedIds: Set<string>;
  isLoading: boolean;
  statusStyles: Record<StockStatus, { bg: string; text: string }>;
  onToggleSelectAll: () => void;
  onToggleRow: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const InventoryTable = ({
  products,
  selectedIds,
  isLoading,
  statusStyles,
  onToggleSelectAll,
  onToggleRow,
  onView,
  onEdit,
  onDelete,
}: InventoryTableProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const rowHoverBg = isDark ? "#243044" : "#F8FAFC";
  const badgeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const primary = isDark ? "#60A5FA" : "#025395";
  const danger = isDark ? "#F87171" : "#DC2626";

  const getStockStatus = (stockLevel: number): StockStatus => {
    const LOW_STOCK_THRESHOLD = 10;
    if (stockLevel <= 0) return "Out of Stock";
    if (stockLevel <= LOW_STOCK_THRESHOLD) return "Low Stock";
    return "In Stock";
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center" style={{ color: textMuted }}>
        Loading inventory...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-10 text-center" style={{ color: textMuted }}>
        No products match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: cardBorder }}>
            <th className="px-4 py-3 text-left w-10">
              <input
                type="checkbox"
                checked={
                  products.length > 0 && selectedIds.size === products.length
                }
                onChange={onToggleSelectAll}
                style={{ accentColor: primary }}
              />
            </th>
            <th
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              Product
            </th>
            <th
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              Category
            </th>
            <th
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              SKU
            </th>
            <th
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              Price
            </th>
            <th
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              Stock
            </th>
            <th
              className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              Status
            </th>
            <th
              className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: textMuted }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const status = getStockStatus(product.stockLevel);
            const price = getSinglePrice(product);
            const image = product.imageUrls?.[0];

            return (
              <tr
                key={product._id}
                className="border-b last:border-b-0 transition-colors"
                style={{ borderColor: cardBorder }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = rowHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(product._id)}
                    onChange={() => onToggleRow(product._id)}
                    style={{ accentColor: primary }}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
                      style={{ backgroundColor: badgeBg }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiPackage
                          className="w-4 h-4"
                          style={{ color: primary }}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-semibold truncate"
                        style={{ color: textPrimary }}
                      >
                        {product.productName}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: textMuted }}
                      >
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: textSecondary }}>
                  {toLabel(product.category)}
                </td>
                <td
                  className="px-4 py-3 font-mono text-xs"
                  style={{ color: textSecondary }}
                >
                  {product.baseSku}
                </td>
                <td
                  className="px-4 py-3 font-semibold"
                  style={{ color: primary }}
                >
                  ৳{price.toFixed(2)}
                </td>
                <td className="px-4 py-3" style={{ color: textSecondary }}>
                  {product.stockLevel} Units
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wide"
                    style={{
                      backgroundColor: statusStyles[status].bg,
                      color: statusStyles[status].text,
                    }}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onView(product._id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: textSecondary }}
                      aria-label="View product"
                      title="View"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(product._id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: primary }}
                      aria-label="Edit product"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: danger }}
                      aria-label="Delete product"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
