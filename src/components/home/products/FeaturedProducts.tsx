"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { featuredProducts } from "@/data/products";

const FeaturedProducts = () => {
  // Animation variants for staggered children
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

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Featured Instruments
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
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
          <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
