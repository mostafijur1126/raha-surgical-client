"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMountedTheme } from "@/hooks/useMountedTheme";

interface Product {
  _id: string;
  productName: string;
  brand: string;
  imageUrls: string[];
  stockLevel: number;
  pricingTiers: Array<{
    price?: number;
    unitPrice?: number;
    [key: string]: any;
  }>;
}

interface ProductCardProps {
  product: Product;
}

// Helper to extract price from pricingTiers
const getProductPrice = (product: Product): number => {
  if (!product.pricingTiers || product.pricingTiers.length === 0) {
    return 0;
  }
  const tier = product.pricingTiers[0];
  return tier?.price ?? tier?.unitPrice ?? 0;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { isDark } = useMountedTheme();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Extract data
  const productName = product.productName || "Unnamed Product";
  const brand = product.brand || "Unknown Brand";
  const image = product.imageUrls?.[0] || "";
  const inStock = product.stockLevel > 0;
  const price = getProductPrice(product);

  // Theme-aware colors
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const cardBorderHover = isDark ? "#60A5FA" : "#025395";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const brandColor = isDark ? "#60A5FA" : "#025395";
  const stockBg = isDark ? "rgba(34,197,94,0.15)" : "#F0FDF4";
  const stockBorder = isDark ? "rgba(34,197,94,0.3)" : "#BBF7D0";
  const stockText = isDark ? "#4ADE80" : "#166534";
  const placeholderBg = isDark ? "#1E293B" : "#F1F5F9";

  return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-sm transition-all duration-300 border h-full flex flex-col"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow:
          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
        transition: { duration: 0.2 },
      }}
      transition={{ duration: 0.4 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = cardBorderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = cardBorder;
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden flex-shrink-0"
        style={{ backgroundColor: placeholderBg }}
      >
        {image ? (
          <Image
            src={image}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm"
            style={{ color: textPrimary }}
          >
            No Image
          </div>
        )}

        {/* IN STOCK Badge */}
        {inStock && (
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
      </div>

      {/* Content - flex-1 pushes bottom content down */}
      <div className="p-4 space-y-1.5 flex flex-col flex-1">
        {/* Brand */}
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: brandColor }}
        >
          {brand}
        </p>

        {/* Product Name - takes available space */}
        <h3
          className="text-sm font-bold leading-tight line-clamp-2 flex-1"
          style={{ color: textPrimary }}
        >
          {productName}
        </h3>

        {/* Price & View Button - sticks to bottom */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <span className="text-lg font-bold" style={{ color: textPrimary }}>
            {formatPrice(price)}
          </span>

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
