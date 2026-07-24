"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiEye, FiShoppingCart, FiHeart } from "react-icons/fi";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
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
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold tracking-wide text-green-700 bg-green-50 border border-green-200 rounded-full">
            IN STOCK
          </span>
        )}

        {/* Quick Action Buttons (on hover) */}
        <div
          className={`absolute inset-0 bg-slate-900/20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors">
            <FiEye className="w-4 h-4" />
          </button>
          <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors">
            <FiShoppingCart className="w-4 h-4" />
          </button>
          <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors">
            <FiHeart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* View Button */}
          <button className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline transition-colors">
            View →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
