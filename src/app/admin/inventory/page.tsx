"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiChevronRight as FiBreadcrumbSep } from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { getCategories, getProducts } from "@/lib/api/products";
import { getSinglePrice } from "@/lib/productHelpers";
import type { Product } from "@/lib/types";
import InventoryStats from "@/components/admin/inventory/InventoryStats";
import InventoryHeader from "@/components/admin/inventory/InventoryHeader";
import InventoryFilters from "@/components/admin/inventory/InventoryFilters";
import InventoryTable from "@/components/admin/inventory/InventoryTable";
import InventoryPagination from "@/components/admin/inventory/InventoryPagination";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

const LOW_STOCK_THRESHOLD = 10;
const STATUSES: StockStatus[] = ["In Stock", "Low Stock", "Out of Stock"];
const ITEMS_PER_PAGE = 10;

function getStockStatus(stockLevel: number): StockStatus {
  if (stockLevel <= 0) return "Out of Stock";
  if (stockLevel <= LOW_STOCK_THRESHOLD) return "Low Stock";
  return "In Stock";
}

export default function ProductInventoryPage() {
  const { isDark } = useMountedTheme();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [currentPage, setCurrentPage] = useState(1);

  const primary = isDark ? "#60A5FA" : "#025395";
  const textMuted = isDark ? "#64748B" : "#64748B";

  // ---- Fetch data ----
  const normalizeToArray = <T,>(input: unknown): T[] => {
    if (Array.isArray(input)) return input as T[];
    if (input && typeof input === "object" && "data" in input) {
      const data = input.data;

      if (Array.isArray(data)) {
        return data as T[];
      }
    }
    return [];
  };

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(normalizeToArray<Product>(productsData));
      setCategories(normalizeToArray<string>(categoriesData));
    } catch (err) {
      console.error("Failed to load inventory:", err);
      setProducts([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Filtering
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

  // Pagination
  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Stats
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

  // Status styles for table
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

  // Handlers
  const toggleSelectAll = () => {
    if (selected.size === paginatedRows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginatedRows.map((p) => p._id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    try {
      // await deleteProduct(id);
      console.log("Delete:", id);

      // API call করার পর list refresh করো
      // fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkDelete = () => {
    console.log("Bulk delete:", Array.from(selected));
    // Implement actual delete logic
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, statusFilter]);

  return (
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
      <InventoryHeader />

      {/* Stats */}
      <InventoryStats
        totalProducts={stats.totalProducts}
        lowStockAlerts={stats.lowStockAlerts}
        outOfStock={stats.outOfStock}
        totalInventoryValue={stats.totalInventoryValue}
      />

      {/* Filters */}
      <InventoryFilters
        categories={categories}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        statusOptions={STATUSES}
        selectedCount={selected.size}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={() => {
          setCategoryFilter("All Categories");
          setStatusFilter("All Statuses");
        }}
        onBulkDelete={handleBulkDelete}
      />

      {/* Table Container */}
      <div
        className="rounded-b-xl border border-t-0 overflow-hidden"
        style={{
          backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
          borderColor: isDark ? "#334155" : "#E8EEF5",
        }}
      >
        <InventoryTable
          products={paginatedRows}
          selectedIds={selected}
          isLoading={isLoading}
          statusStyles={statusStyles}
          onToggleSelectAll={toggleSelectAll}
          onToggleRow={toggleRow}
          onDelete={handleDelete}
          onProductUpdated={fetchInventory}
        />

        {/* Pagination */}
        {!isLoading && filteredRows.length > 0 && (
          <InventoryPagination
            currentPage={currentPage}
            totalItems={filteredRows.length}
            itemsPerPage={ITEMS_PER_PAGE}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
