"use client";

import { Product } from "@/lib/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, brand, price, rating, image, inStock } = product;

  const renderStars = () => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return (
      <>
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {half === 1 && <FaStar key="half" className="text-yellow-400" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar
            key={`empty-${i}`}
            className="text-gray-300 dark:text-gray-600"
          />
        ))}
      </>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-card dark:bg-dark-lighter rounded-2xl shadow-sm hover:shadow-md border border-border dark:border-dark-lighter overflow-hidden transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 bg-gray-100 dark:bg-dark">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!inStock && (
          <span className="absolute top-2 right-2 bg-error text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-sm mb-1">
          {renderStars()}
          <span className="text-muted dark:text-gray-400 ml-1">({rating})</span>
        </div>
        <h3 className="font-semibold text-heading dark:text-white text-base leading-tight">
          {name}
        </h3>
        <p className="text-sm text-muted dark:text-gray-400 mb-2">{brand}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-primary dark:text-accent font-bold text-lg">
            ${price.toFixed(2)}
          </span>
          <button
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              inStock
                ? "bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow"
                : "bg-gray-200 dark:bg-dark-lighter text-gray-400 cursor-not-allowed"
            }`}
            disabled={!inStock}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
