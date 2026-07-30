"use client";

import { useState, useMemo, useEffect } from "react";

import { FilterState, Product } from "@/lib/types";
import { getSinglePrice } from "@/lib/productHelpers";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import SortDropdown from "@/components/products/SortDropdown";
import Pagination from "@/components/products/Pagination";
import { getProducts } from "@/lib/api/products";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const { isDark } = useMountedTheme();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 5000],
    inStockOnly: false,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await getProducts(category);
      setProducts(data.data);
      setCurrentPage(1);
      setIsLoading(false);
    };
    fetchProducts();
  }, [filters, sortBy, category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    result = result.filter((p) => {
      const price = getSinglePrice(p);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    if (filters.inStockOnly) {
      result = result.filter((p) => p.stockLevel > 0);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => getSinglePrice(a) - getSinglePrice(b));
        break;
      case "price-desc":
        result.sort((a, b) => getSinglePrice(b) - getSinglePrice(a));
        break;
      default:
        break;
    }
    return result;
  }, [filters, sortBy, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Theme colors
  const bg = isDark ? "#0F172A" : "#faf9ff";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            products={products}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>
              Surgical Equipment &amp; Instruments
            </h1>
            <p className="text-sm" style={{ color: textSecondary }}>
              Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
              results
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <span className="text-sm" style={{ color: textMuted }}>
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>

          {isLoading ? (
            <p
              className="text-sm py-12 text-center"
              style={{ color: textMuted }}
            >
              Loading products...
            </p>
          ) : (
            <ProductGrid products={paginatedProducts} />
          )}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
