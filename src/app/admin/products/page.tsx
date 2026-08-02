"use client";

import { useState, useMemo, useEffect } from "react";
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
import { getCategories, getProducts } from "@/lib/api/products";
import { CategoryOption } from "@/lib/api/products";
import { getSinglePrice } from "@/lib/productHelpers";
import { toLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

// ⚠️ Threshold ধরে নেওয়া হলো — stockLevel <= 10 হলে "Low Stock" দেখাবে।
const LOW_STOCK_THRESHOLD = 10;

function getStockStatus(stockLevel: number): StockStatus {
  if (stockLevel <= 0) return "Out of Stock";
  if (stockLevel <= LOW_STOCK_THRESHOLD) return "Low Stock";
  return "In Stock";
}

const STATUSES: StockStatus[] = ["In Stock", "Low Stock", "Out of Stock"];

export default function ProductInventoryPage() {
  const { isDark } = useMountedTheme();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  console.log("fetched categories:", categories);
  const [isLoading, setIsLoading] = useState(true);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ getProducts()/getCategories() সরাসরি array রিটার্ন করে (backend GET
  // রুট দুটোও plain array পাঠায়) — তাই `.data` না লিখে সরাসরি সেট করা হচ্ছে
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        console.log("getCategories() returned:", await getCategories());
        setProducts(productsData.data);
        setCategories(categoriesData.data);
      } catch (err) {
        console.error("Failed to load inventory:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

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

  const statusStyles: Record<StockStatus, { bg: string; text: string }> = {
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

  // ✅ Client-side filtering — আসল Product ফিল্ড (category, stockLevel) ব্যবহার করে
  const filteredRows = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== "All Categories" && p.category !== categoryFilter)
        return false;
      if (
        statusFilter !== "All Statuses" &&
        getStockStatus(p.stockLevel) !== statusFilter
      )
        return false;
      return true;
    });
  }, [products, categoryFilter, statusFilter]);

  // ✅ Stat card গুলো এখন আসল fetched products থেকে calculate হচ্ছে
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const lowStockAlerts = products.filter(
      (p) => getStockStatus(p.stockLevel) === "Low Stock",
    ).length;
    const outOfStock = products.filter((p) => p.stockLevel <= 0).length;
    const totalInventoryValue = products.reduce(
      (sum, p) => sum + getSinglePrice(p) * p.stockLevel,
      0,
    );
    return { totalProducts, lowStockAlerts, outOfStock, totalInventoryValue };
  }, [products]);

  const formatInventoryValue = (value: number) => {
    if (value >= 1_000_000) return `৳${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `৳${(value / 1_000).toFixed(1)}K`;
    return `৳${value.toFixed(0)}`;
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredRows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredRows.map((p) => p._id)));
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
            <span
              className="text-2xl font-bold block mt-1.5"
              style={{ color: textPrimary }}
            >
              {stats.totalProducts.toLocaleString()}
            </span>
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
                {formatInventoryValue(stats.totalInventoryValue)}
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
            {/* ✅ fetched categories দিয়ে dynamic dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm outline-none"
              style={inputStyle}
            >
              <option value="All Categories">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {toLabel(category)}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm outline-none"
              style={inputStyle}
            >
              <option value="All Statuses">All Statuses</option>
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center"
                      style={{ color: textMuted }}
                    >
                      Loading inventory...
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
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
                  filteredRows.map((product) => {
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
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selected.has(product._id)}
                            onChange={() => toggleRow(product._id)}
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
                        <td
                          className="px-4 py-3"
                          style={{ color: textSecondary }}
                        >
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
                        <td
                          className="px-4 py-3"
                          style={{ color: textSecondary }}
                        >
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
                              onClick={() => handleView(product._id)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: textSecondary }}
                              aria-label="View product"
                              title="View"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: primary }}
                              aria-label="Edit product"
                              title="Edit"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t"
            style={{ borderColor: cardBorder }}
          >
            <p className="text-xs" style={{ color: textMuted }}>
              Showing{" "}
              <span className="font-semibold" style={{ color: textPrimary }}>
                {filteredRows.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold" style={{ color: textPrimary }}>
                {stats.totalProducts}
              </span>{" "}
              products
            </p>
            {/* ⚠️ এখানে সব প্রোডাক্ট একবারে fetch হচ্ছে (client-side filtering, আগের
                "সহজ পদ্ধতি" সিদ্ধান্ত অনুযায়ী), তাই pagination আপাতত সরানো হলো।
                প্রোডাক্ট সংখ্যা অনেক বাড়লে backend pagination যোগ করে আবার বসাতে হবে। */}
          </div>
        </div>
      </div>
    </div>
  );
}
