"use client";

import { FilterState } from "@/lib/types";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

const categories = [
  "Surgical Scissors",
  "Retractors",
  "Forceps & Clamps",
  "Suturing Tools",
];
const brands = ["Medline", "Aesculap", "Johnson & Johnson", "HealthSystems"];

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function ProductFilters({
  filters,
  onChange,
}: ProductFiltersProps) {
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

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-64 space-y-6 bg-card dark:bg-dark-lighter p-6 rounded-2xl shadow-sm border border-border dark:border-dark-lighter"
    >
      <h3 className="font-bold text-lg text-heading dark:text-white">
        Filters
      </h3>

      {/* Category */}
      <div>
        <h4 className="font-medium text-sm uppercase tracking-wider text-muted dark:text-gray-400 mb-2">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-medium text-sm uppercase tracking-wider text-muted dark:text-gray-400 mb-2">
          Brands
        </h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-sm uppercase tracking-wider text-muted dark:text-gray-400 mb-2">
          Price Range
        </h4>
        <div className="flex items-center gap-2 text-sm">
          <span>${filters.priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            value={filters.priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-full accent-primary"
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
          className="w-full accent-primary mt-1"
        />
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() =>
              onChange({ ...filters, inStockOnly: !filters.inStockOnly })
            }
            className="rounded border-border text-primary focus:ring-primary"
          />
          In Stock Only
        </label>
      </div>

      {/* Min Rating */}
      <div>
        <h4 className="font-medium text-sm uppercase tracking-wider text-muted dark:text-gray-400 mb-2">
          Min. Rating
        </h4>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onChange({ ...filters, minRating: star })}
              className="text-xl"
            >
              {star <= filters.minRating ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar className="text-gray-300 dark:text-gray-600" />
              )}
            </button>
          ))}
          <span className="text-sm ml-2 text-muted">& Up</span>
        </div>
      </div>
    </motion.aside>
  );
}
