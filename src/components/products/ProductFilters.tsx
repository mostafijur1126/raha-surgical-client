"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterState, Product } from "@/lib/types";
import { FiFilter, FiX } from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  products: Product[];
}

function toLabel(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProductFilters({
  filters,
  onChange,
  products,
}: ProductFiltersProps) {
  const { isDark } = useMountedTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Theme colors
  const bgColor = isDark ? "#1E293B" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const inputBg = isDark ? "#0F172A" : "#F8FAFC";
  const hoverBg = isDark ? "#2D3748" : "#F1F5F9";

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const toggleCategory = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: updated });
  };

  const toggleBrand = (brand: string) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: updated });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange({ ...filters, priceRange: [filters.priceRange[0], value] });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange({ ...filters, priceRange: [value, filters.priceRange[1]] });
  };

  // Filter content (shared between desktop and mobile)
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4
          className="font-medium text-sm uppercase tracking-wider mb-2"
          style={{ color: textMuted }}
        >
          Category
        </h4>
        {categories.length === 0 ? (
          <p className="text-xs" style={{ color: textMuted }}>
            No categories yet
          </p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm cursor-pointer"
                style={{ color: textSecondary }}
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded border transition-colors"
                  style={{
                    accentColor: primaryColor,
                    borderColor: borderColor,
                    backgroundColor: inputBg,
                  }}
                />
                {toLabel(cat)}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div>
        <h4
          className="font-medium text-sm uppercase tracking-wider mb-2"
          style={{ color: textMuted }}
        >
          Brands
        </h4>
        {brands.length === 0 ? (
          <p className="text-xs" style={{ color: textMuted }}>
            No brands yet
          </p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 text-sm cursor-pointer"
                style={{ color: textSecondary }}
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded border transition-colors"
                  style={{
                    accentColor: primaryColor,
                    borderColor: borderColor,
                    backgroundColor: inputBg,
                  }}
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <h4
          className="font-medium text-sm uppercase tracking-wider mb-2"
          style={{ color: textMuted }}
        >
          Price Range
        </h4>
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: textSecondary }}
        >
          <span>${filters.priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            value={filters.priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-full"
            style={{ accentColor: primaryColor }}
          />
          <span>${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full mt-1"
          style={{ accentColor: primaryColor }}
        />
      </div>

      {/* Availability */}
      <div>
        <label
          className="flex items-center gap-2 text-sm cursor-pointer"
          style={{ color: textSecondary }}
        >
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() =>
              onChange({ ...filters, inStockOnly: !filters.inStockOnly })
            }
            className="rounded border transition-colors"
            style={{
              accentColor: primaryColor,
              borderColor: borderColor,
              backgroundColor: inputBg,
            }}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            color: textPrimary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = bgColor;
          }}
        >
          <FiFilter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {Object.values(filters).some((v) =>
            Array.isArray(v) ? v.length > 0 : v === true,
          ) && (
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
          )}
        </button>
      </div>

      {/* Desktop Filters (always visible) */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block w-64 rounded-2xl shadow-sm border p-6 sticky top-4 self-start transition-colors duration-300"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: textPrimary }}>
          Filters
        </h3>
        <FilterContent />
      </motion.aside>

      {/* Mobile Overlay (full screen) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setIsMobileOpen(false)}
          >
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-4/5 max-w-sm h-full overflow-y-auto p-6 shadow-xl"
              style={{
                backgroundColor: bgColor,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="font-bold text-lg"
                  style={{ color: textPrimary }}
                >
                  Filters
                </h3>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label="Close filters"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <FilterContent />

              {/* Apply button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="w-full mt-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                style={{
                  backgroundColor: primaryColor,
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "#3B82F6"
                    : "#01447A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                }}
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
