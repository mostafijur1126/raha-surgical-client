"use client";

import { useState, useMemo, useEffect } from "react";
import { products as allProducts } from "@/lib/data";
import { FilterState } from "@/lib/types";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import SortDropdown from "@/components/products/SortDropdown";
import Pagination from "@/components/products/Pagination";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 5000],
    inStockOnly: false,
    minRating: 0,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    result = result.filter((p) => p.rating >= filters.minRating);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // relevance – keep original order
        break;
    }
    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <ProductFilters filters={filters} onChange={setFilters} />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-heading dark:text-white">
              Surgical Equipment & Instruments
            </h1>
            <p className="text-sm text-muted dark:text-gray-400">
              Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
              results
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <span className="text-sm text-muted dark:text-gray-400">
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>
          <ProductGrid products={paginatedProducts} />
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
