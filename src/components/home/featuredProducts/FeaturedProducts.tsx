"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/lib/api/products";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/lib/types";

const FeaturedProducts = () => {
  const { isDark } = useMountedTheme();
  const [product, setproduct] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeaturedProducts();
      setproduct(data.data);
    };
    fetchData();
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {product.map((product) => (
            <motion.div key={product._id} variants={childVariants}>
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
