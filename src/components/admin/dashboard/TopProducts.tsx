"use client";

import { ProductData } from "@/data/adminDashboardData";
import { useMountedTheme } from "@/hooks/useMountedTheme";

interface TopProductsProps {
  products: ProductData[];
}

const TopProducts = ({ products }: TopProductsProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getMaxUnits = () => {
    return Math.max(...products.map((p) => p.unitsSold));
  };

  const maxUnits = getMaxUnits();

  return (
    <div
      className="rounded-xl border p-6 shadow-sm"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: textPrimary }}>
        Top Selling Products
      </h3>

      <div className="space-y-4">
        {products.map((product, index) => {
          const percentage = (product.unitsSold / maxUnits) * 100;

          return (
            <div key={product.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div>
                  <span className="font-medium" style={{ color: textPrimary }}>
                    {product.name}
                  </span>
                  <span className="text-xs ml-2" style={{ color: textMuted }}>
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <span style={{ color: textSecondary }}>
                  {product.unitsSold.toLocaleString()} units sold
                </span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{
                  backgroundColor: isDark ? "#2D3748" : "#F1F5F9",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(percentage, 5)}%`,
                    backgroundColor: isDark
                      ? `rgba(96,165,250,0.6)`
                      : `rgba(2,83,149,0.7)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProducts;
