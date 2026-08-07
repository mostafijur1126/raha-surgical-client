"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPopularCategories, PopularCategory } from "@/lib/api/products";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const CategorySection = () => {
  const { isDark } = useMountedTheme();
  const [categories, setCategories] = useState<PopularCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getPopularCategories();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Error fetching popular categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const sectionBg = isDark ? "#0F172A" : "#faf9ff";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const primary = isDark ? "#60A5FA" : "#025395";

  if (loading) {
    return (
      <div className="py-10 text-center" style={{ color: textSecondary }}>
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-10 text-center" style={{ color: textSecondary }}>
        No categories found.
      </div>
    );
  }

  return (
    <section
      className="py-16 md:py-20 transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          style={{ color: textPrimary }}
        >
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={`/products?category=${encodeURIComponent(cat.category)}`}
              className="group block rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
              }}
            >
              <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                {cat.imageUrl ? (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-sm"
                    style={{ color: textSecondary }}
                  >
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3 text-center">
                <p
                  className="text-sm font-medium truncate capitalize"
                  style={{ color: textPrimary }}
                >
                  {cat.category.replace(/-/g, " ")}
                </p>
                <p className="text-xs" style={{ color: textSecondary }}>
                  {cat.productCount} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
