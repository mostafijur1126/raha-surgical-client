"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiShield,
  FiFileText,
  FiTruck,
  FiPlay,
} from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { toLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import OrderModal from "./OrderModal";

type PurchaseMode = "single" | "box";
type Tab = "description" | "specifications" | "reviews" | "shipping";

export default function ProductDetails({ product }: { product: Product }) {
  const { isDark } = useMountedTheme();
  // ---- Gallery state ----
  const [activeImage, setActiveImage] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // ---- Purchase state ----
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>("single");
  const [quantity, setQuantity] = useState(1);

  // ---- Tabs ----
  const [activeTab, setActiveTab] = useState<Tab>("description");

  // ---- Checkout modal ----
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const singleTier =
    product.pricingTiers.find((t) => t.unitsPerPackage === 1) ??
    product.pricingTiers[0];
  const boxTier =
    product.pricingTiers.find((t) => t.unitsPerPackage > 1) ??
    product.pricingTiers[1];

  const activeTier = purchaseMode === "single" ? singleTier : boxTier;
  const unitPrice = Number(activeTier?.price ?? 0);
  const totalPrice = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  // ---- Theme tokens (RAHA brand) ----
  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const pageBg = isDark ? "#0F172A" : "#F8FAFC";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";
  const badgeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const thumbActiveBorder = primary;
  const successColor = isDark ? "#4ADE80" : "#16A34A";

  const goToImage = (index: number) => {
    const total = product.imageUrls.length;
    setActiveImage(((index % total) + total) % total);
  };

  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incrementQty = () => setQuantity((q) => q + 1);

  const tabs: { key: Tab; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "specifications", label: "Specifications" },
    { key: "reviews", label: "Reviews" },
    { key: "shipping", label: "Shipping" },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: pageBg }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm mb-6"
          style={{ color: textMuted }}
        >
          <Link
            href="/products"
            className="hover:underline"
            style={{ color: textMuted }}
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/products?categories=${product.category}`}
            className="hover:underline"
            style={{ color: textMuted }}
          >
            {toLabel(product.category)}
          </Link>
          <span>/</span>
          <span style={{ color: textPrimary }}>{product.productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ================= GALLERY ================= */}
          <div>
            {product.rxRequired && (
              <span
                className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full"
                style={{ backgroundColor: badgeBg, color: primary }}
              >
                Rx Required
              </span>
            )}

            {/* Main image with zoom-on-hover + arrows */}
            <div
              className="relative rounded-2xl border overflow-hidden group"
              style={{ backgroundColor: cardBg, borderColor: cardBorder }}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
            >
              <div className="aspect-square overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.imageUrls[activeImage]}
                    alt={product.productName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out"
                    style={{
                      transform: isHoveringImage ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                </AnimatePresence>
              </div>

              {product.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={() => goToImage(activeImage - 1)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: cardBg, color: textPrimary }}
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => goToImage(activeImage + 1)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: cardBg, color: textPrimary }}
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.imageUrls.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.imageUrls.map((url, idx) => (
                  <button
                    key={`${url}-${idx}`}
                    onClick={() => goToImage(idx)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0"
                    style={{
                      borderColor:
                        idx === activeImage ? thumbActiveBorder : "transparent",
                    }}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {/* video thumbnail */}
              </div>
            )}
          </div>

          {/* ================= DETAILS ================= */}
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: textPrimary }}
            >
              {product.productName}
            </h1>
            <p className="text-sm mt-2" style={{ color: textSecondary }}>
              Brand:{" "}
              <span className="font-semibold" style={{ color: primary }}>
                {product.brand}
              </span>
              <span className="mx-2">·</span>
              SKU:{" "}
              <span className="font-mono">
                {activeTier?.sku ?? product.baseSku}
              </span>
            </p>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${purchaseMode}-${quantity}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="text-3xl font-bold"
                  style={{ color: textPrimary }}
                >
                  ৳{totalPrice.toFixed(2)}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm" style={{ color: textMuted }}>
                (৳{unitPrice.toFixed(2)} /{" "}
                {purchaseMode === "single" ? "unit" : "box"} × {quantity})
              </span>
            </div>

            <p
              className="text-sm mt-1.5 flex items-center gap-1.5"
              style={{ color: successColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: successColor }}
              />
              In Stock: {product.stockLevel} units available for immediate
              dispatch
            </p>

            <p
              className="text-sm mt-4 leading-relaxed"
              style={{ color: textSecondary }}
            >
              {product.description}
            </p>

            {/* Quantity selector */}
            <div className="mt-6">
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: textMuted }}
              >
                Quantity
              </label>
              <div
                className="inline-flex items-center rounded-lg border overflow-hidden"
                style={{ borderColor: inputBorder }}
              >
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ color: textPrimary }}
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span
                  className="w-12 text-center text-sm font-semibold"
                  style={{ color: textPrimary }}
                >
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="w-10 h-10 flex items-center justify-center transition-colors"
                  style={{ color: textPrimary }}
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buy Now / Buy a Full Box */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setPurchaseMode("single");
                  setIsOrderModalOpen(true);
                }}
                className="py-3 rounded-lg text-sm font-semibold transition-colors duration-200 border-2"
                style={{
                  backgroundColor:
                    purchaseMode === "single" ? primary : "transparent",
                  color: purchaseMode === "single" ? "#FFFFFF" : textPrimary,
                  borderColor:
                    purchaseMode === "single" ? primary : inputBorder,
                }}
              >
                Buy Now
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setPurchaseMode("box");
                  setIsOrderModalOpen(true);
                }}
                disabled={!boxTier}
                className="py-3 rounded-lg text-sm font-semibold transition-colors duration-200 border-2 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    purchaseMode === "box" ? primary : "transparent",
                  color: purchaseMode === "box" ? "#FFFFFF" : textPrimary,
                  borderColor: purchaseMode === "box" ? primary : inputBorder,
                }}
              >
                Buy a {boxTier?.unitType ?? "Full Box"}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t"
              style={{ borderColor: cardBorder }}
            >
              <div className="flex flex-col items-center text-center gap-1.5">
                <FiShield className="w-5 h-5" style={{ color: primary }} />
                <span className="text-[11px]" style={{ color: textMuted }}>
                  2-Year Warranty
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <FiFileText className="w-5 h-5" style={{ color: primary }} />
                <span className="text-[11px]" style={{ color: textMuted }}>
                  FDA Cleared
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <FiTruck className="w-5 h-5" style={{ color: primary }} />
                <span className="text-[11px]" style={{ color: textMuted }}>
                  Priority Courier
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-12">
          <div
            className="flex gap-6 border-b overflow-x-auto"
            style={{ borderColor: cardBorder }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative pb-3 text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  color: activeTab === tab.key ? primary : textSecondary,
                }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: primary }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "description" && (
                  <div className="max-w-2xl">
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: textPrimary }}
                    >
                      Clinical Excellence Reimagined
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: textSecondary }}
                    >
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="max-w-2xl overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {[
                          {
                            label: "Category",
                            value: toLabel(product.category),
                          },
                          { label: "Brand", value: product.brand },
                          { label: "Base SKU", value: product.baseSku },
                          {
                            label: "Stock Level",
                            value: `${product.stockLevel} units`,
                          },
                          {
                            label: "Prescription",
                            value: product.rxRequired
                              ? "Required"
                              : "Not required",
                          },
                        ].map((row, i) => (
                          <tr
                            key={row.label}
                            style={{
                              backgroundColor:
                                i % 2 === 0 ? badgeBg : "transparent",
                            }}
                          >
                            <td
                              className="px-4 py-2.5 font-medium"
                              style={{ color: primary }}
                            >
                              {row.label}
                            </td>
                            <td
                              className="px-4 py-2.5"
                              style={{ color: textSecondary }}
                            >
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <p className="text-sm" style={{ color: textMuted }}>
                    No reviews yet — be the first to review this product.
                  </p>
                )}

                {activeTab === "shipping" && (
                  <div
                    className="max-w-2xl text-sm leading-relaxed space-y-2"
                    style={{ color: textSecondary }}
                  >
                    <p>
                      Orders ship within 1–2 business days via priority medical
                      courier.
                    </p>
                    <p>
                      Temperature-sensitive items are packed with cold-chain
                      protection where required.
                    </p>
                    <p>
                      Rx-required products need a valid clinical license on file
                      before dispatch.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
        activeTier={activeTier}
        purchaseMode={purchaseMode}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </div>
  );
}
