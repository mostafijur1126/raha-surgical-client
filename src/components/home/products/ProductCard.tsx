"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiEye, FiShoppingCart, FiHeart } from "react-icons/fi";
import { useTheme } from "next-themes";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Theme-aware colors
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E2E8F0";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const brandColor = isDark ? "#60A5FA" : "#025395";
  const stockBg = isDark ? "rgba(34,197,94,0.15)" : "#F0FDF4";
  const stockBorder = isDark ? "rgba(34,197,94,0.3)" : "#BBF7D0";
  const stockText = isDark ? "#4ADE80" : "#166534";
  const overlayBg = isDark ? "rgba(15,23,42,0.5)" : "rgba(15,23,42,0.2)";
  const iconBg = isDark ? "#1E293B" : "#FFFFFF";
  const iconColor = isDark ? "#E2E8F0" : "#334155";
  const iconHoverBg = isDark ? "#2D3748" : "#EFF6FF";
  const iconHoverColor = isDark ? "#60A5FA" : "#025395";

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* In Stock Badge */}
        {product.inStock && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold tracking-wide rounded-full border"
            style={{
              backgroundColor: stockBg,
              borderColor: stockBorder,
              color: stockText,
            }}
          >
            IN STOCK
          </span>
        )}

        {/* Quick Action Buttons (on hover) */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: overlayBg }}
        >
          {[
            { icon: FiEye, label: "Quick View" },
            { icon: FiShoppingCart, label: "Add to Cart" },
            { icon: FiHeart, label: "Wishlist" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="p-2.5 rounded-full shadow-lg transition-colors duration-200"
              style={{
                backgroundColor: iconBg,
                color: iconColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = iconHoverBg;
                e.currentTarget.style.color = iconHoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = iconBg;
                e.currentTarget.style.color = iconColor;
              }}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        <p
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: brandColor }}
        >
          {product.brand}
        </p>

        {/* Product Name */}
        <h3
          className="text-sm font-semibold leading-tight line-clamp-2 min-h-[2.5rem]"
          style={{ color: textPrimary }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-lg font-bold" style={{ color: textPrimary }}>
              {formatPrice(product.price)}
            </span>
          </div>

          {/* View Button */}
          <button
            className="text-sm font-medium transition-colors hover:underline"
            style={{ color: brandColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isDark ? "#93C5FD" : "#01447A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = brandColor;
            }}
          >
            View →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
