"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FiDownload,
  FiPlus,
  FiFilter,
  FiTrash2,
  FiSliders,
  FiEye,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight,
  FiAlertTriangle,
  FiPackage,
  FiDollarSign,
  FiChevronRight as FiBreadcrumbSep,
} from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";

// ✅ Static demo data — এখানে বসিয়ে আসল fetched inventory দিয়ে replace করুন
interface InventoryRow {
  id: string;
  name: string;
  subtitle: string;
  image: string | null;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const demoRows: InventoryRow[] = [
  {
    id: "1",
    name: "Titanium Micro-Scalpel X1",
    subtitle: "Precision Series",
    image: null,
    category: "Cardiovascular",
    sku: "MED-992-TX",
    price: 284.0,
    stock: 42,
    status: "In Stock",
  },
  {
    id: "2",
    name: "PulseStream HD Monitor",
    subtitle: "Diagnostics",
    image: null,
    category: "Critical Care",
    sku: "MON-840-HD",
    price: 1250.0,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "DuraShield Surgical Gown",
    subtitle: "PPE Essentials",
    image: null,
    category: "General Surgery",
    sku: "PPE-102-DG",
    price: 42.5,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Titanium Bone Screw 3.5mm",
    subtitle: "Implants",
    image: null,
    category: "Orthopedic",
    sku: "IMP-OS-35",
    price: 112.0,
    stock: 156,
    status: "In Stock",
  },
];

const CATEGORIES = [
  "All Categories",
  "Cardiovascular",
  "Critical Care",
  "General Surgery",
  "Orthopedic",
];
const STATUSES = ["All Statuses", "In Stock", "Low Stock", "Out of Stock"];

export default function ProductInventoryPage() {
  const { isDark } = useMountedTheme();

  const [rows] = useState<InventoryRow[]>(demoRows);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);

  // ---- Theme tokens (RAHA brand) ----
  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const pageBg = isDark ? "#0F172A" : "#F8FAFC";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#FFFFFF";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";
  const rowHoverBg = isDark ? "#243044" : "#F8FAFC";
  const badgeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";

  const statusStyles: Record<
    InventoryRow["status"],
    { bg: string; text: string }
  > = {
    "In Stock": {
      bg: isDark ? "rgba(74,222,128,0.15)" : "#DCFCE7",
      text: isDark ? "#4ADE80" : "#16A34A",
    },
    "Low Stock": {
      bg: isDark ? "rgba(251,191,36,0.15)" : "#FEF3C7",
      text: isDark ? "#FBBF24" : "#B45309",
    },
    "Out of Stock": {
      bg: isDark ? "rgba(248,113,113,0.15)" : "#FEE2E2",
      text: isDark ? "#F87171" : "#DC2626",
    },
  };

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (categoryFilter !== "All Categories" && r.category !== categoryFilter)
        return false;
      if (statusFilter !== "All Statuses" && r.status !== statusFilter)
        return false;
      return true;
    });
  }, [rows, categoryFilter, statusFilter]);

  // ---- Summary stats (static demo numbers — এগুলোও পরে real aggregate দিয়ে replace করুন) ----
  const stats = {
    totalProducts: 1429,
    totalProductsChange: "+12%",
    lowStockAlerts: 24,
    outOfStock: 8,
    totalInventoryValue: "৳4.2M",
  };

  const totalPages = 143; // static — real pagination backend থেকে আসবে

  const toggleSelectAll = () => {
    if (selected.size === filteredRows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredRows.map((r) => r.id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleView = (id: string) => console.log("View product:", id);
  const handleEdit = (id: string) => console.log("Edit product:", id);
  const handleDelete = (id: string) => console.log("Delete product:", id);
  const handleBulkDelete = () =>
    console.log("Bulk delete:", Array.from(selected));

  const inputStyle = {
    backgroundColor: inputBg,
    borderColor: inputBorder,
    color: textPrimary,
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: pageBg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm mb-3"
          style={{ color: textMuted }}
        >
          <Link href="/admin/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <FiBreadcrumbSep className="w-3.5 h-3.5" />
          <span className="font-medium" style={{ color: primary }}>
            Product Management
          </span>
        </nav>

        {/* Header */}
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

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="text-2xl font-bold"
                style={{ color: textPrimary }}
              >
                {stats.totalProducts.toLocaleString()}
              </span>
              <span
                className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: statusStyles["In Stock"].bg,
                  color: statusStyles["In Stock"].text,
                }}
              >
                ↑ {stats.totalProductsChange}
              </span>
            </div>
          </div>

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
              <span
                className="text-2xl font-bold"
                style={{ color: statusStyles["Low Stock"].text }}
              >
                {stats.lowStockAlerts}
              </span>
              <FiAlertTriangle
                className="w-5 h-5"
                style={{ color: statusStyles["Low Stock"].text }}
              />
            </div>
          </div>

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
              <span
                className="text-2xl font-bold"
                style={{ color: textPrimary }}
              >
                {String(stats.outOfStock).padStart(2, "0")}
              </span>
              <FiPackage className="w-5 h-5" style={{ color: textMuted }} />
            </div>
          </div>

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
                {stats.totalInventoryValue}
              </span>
              <FiDollarSign className="w-5 h-5" style={{ color: primary }} />
            </div>
          </div>
        </div>

        {/* Filters + bulk actions */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 mb-0"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex items-center gap-1.5 text-sm"
              style={{ color: textSecondary }}
            >
              <FiFilter className="w-4 h-4" />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm outline-none"
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm outline-none"
              style={inputStyle}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {(categoryFilter !== "All Categories" ||
              statusFilter !== "All Statuses") && (
              <button
                onClick={() => {
                  setCategoryFilter("All Categories");
                  setStatusFilter("All Statuses");
                }}
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
              onClick={handleBulkDelete}
              disabled={selected.size === 0}
              className="p-2 rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                borderColor: inputBorder,
                color: isDark ? "#F87171" : "#DC2626",
              }}
              aria-label="Bulk delete"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-lg border transition-colors"
              style={{ borderColor: inputBorder, color: textSecondary }}
              aria-label="More bulk actions"
            >
              <FiSliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-b-xl border border-t-0 overflow-hidden"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: cardBorder }}>
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={
                        filteredRows.length > 0 &&
                        selected.size === filteredRows.length
                      }
                      onChange={toggleSelectAll}
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
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center"
                      style={{ color: textMuted }}
                    >
                      No products match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr
                      key={row.id}
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
                          checked={selected.has(row.id)}
                          onChange={() => toggleRow(row.id)}
                          style={{ accentColor: primary }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
                            style={{ backgroundColor: badgeBg }}
                          >
                            {row.image ? (
                              <img
                                src={row.image}
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
                              {row.name}
                            </p>
                            <p
                              className="text-xs truncate"
                              style={{ color: textMuted }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: textSecondary }}
                      >
                        {row.category}
                      </td>
                      <td
                        className="px-4 py-3 font-mono text-xs"
                        style={{ color: textSecondary }}
                      >
                        {row.sku}
                      </td>
                      <td
                        className="px-4 py-3 font-semibold"
                        style={{ color: primary }}
                      >
                        ৳{row.price.toFixed(2)}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: textSecondary }}
                      >
                        {row.stock} Units
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wide"
                          style={{
                            backgroundColor: statusStyles[row.status].bg,
                            color: statusStyles[row.status].text,
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleView(row.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: textSecondary }}
                            aria-label="View product"
                            title="View"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: primary }}
                            aria-label="Edit product"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: isDark ? "#F87171" : "#DC2626" }}
                            aria-label="Delete product"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t"
            style={{ borderColor: cardBorder }}
          >
            <p className="text-xs" style={{ color: textMuted }}>
              Showing{" "}
              <span className="font-semibold" style={{ color: textPrimary }}>
                1 - {filteredRows.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold" style={{ color: textPrimary }}>
                {stats.totalProducts.toLocaleString()}
              </span>{" "}
              products
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderColor: inputBorder, color: textSecondary }}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor:
                      currentPage === p ? primary : "transparent",
                    color: currentPage === p ? "#FFFFFF" : textSecondary,
                    border:
                      currentPage === p ? "none" : `1px solid ${inputBorder}`,
                  }}
                >
                  {p}
                </button>
              ))}
              <span className="px-1 text-xs" style={{ color: textMuted }}>
                …
              </span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-2.5 h-8 flex items-center justify-center rounded-lg border text-xs font-semibold"
                style={{ borderColor: inputBorder, color: textSecondary }}
              >
                {totalPages}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderColor: inputBorder, color: textSecondary }}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
