"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { featuredProducts } from "@/data/products";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const FeaturedProducts = () => {
  const { isDark } = useMountedTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Theme-aware colors
  const sectionBg = isDark ? "#0F172A" : "#faf9ff";
  const headingColor = isDark ? "#F1F5F9" : "#0F172A";
  const subTextColor = isDark ? "#94A3B8" : "#475569";
  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const buttonText = "#FFFFFF";

  return (
    <section
      className="py-16 md:py-20 transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: headingColor }}
          >
            Featured Instruments
          </h2>
          <p className="text-base sm:text-lg" style={{ color: subTextColor }}>
            Top-rated surgical equipment for diverse clinical applications.
          </p>
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={childVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products">
            <button
              className="px-8 py-3 rounded-full text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              style={{
                backgroundColor: primaryColor,
                color: buttonText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
              }}
            >
              View All Products →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
