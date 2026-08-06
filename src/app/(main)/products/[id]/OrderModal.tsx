"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiTruck, FiCheckCircle } from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import type { Product, PricingTier } from "@/lib/types";
import { orderProduct } from "@/lib/action/product";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  activeTier: PricingTier;
  purchaseMode: "single" | "box";
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  product,
  activeTier,
  quantity,
  onQuantityChange,
}: OrderModalProps) {
  const { isDark } = useMountedTheme();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsOrderPlaced(false);
    }
  }, [isOpen]);

  const unitPrice = Number(activeTier.price);
  const subtotal = unitPrice * quantity;
  const deliveryCharge = 0; // free delivery for now, can be customised later
  const total = subtotal + deliveryCharge;

  // ---- Theme tokens ----
  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const panelBg = isDark ? "#0F172A" : "#F8FAFC";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#FFFFFF";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";
  const badgeBgSoft = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";

  const inputStyle = {
    backgroundColor: inputBg,
    borderColor: inputBorder,
    color: textPrimary,
  };

  const focusHandlers = {
    onFocus: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      e.currentTarget.style.borderColor = primary;
      e.currentTarget.style.boxShadow = `0 0 0 2px ${
        isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"
      }`;
    },
    onBlur: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      e.currentTarget.style.borderColor = inputBorder;
      e.currentTarget.style.boxShadow = "none";
    },
  };

  const isFormValid =
    fullName.trim() && phone.trim() && streetAddress.trim() && agreedToTerms;

  const handlePlaceOrder = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);

    const order = {
      product: {
        id: product._id,
        name: product.productName,
        image: product.imageUrls[0],
        unitType: activeTier.unitType,
        sku: activeTier.sku,
      },
      quantity,
      unitPrice,
      subtotal,
      customer: {
        fullName,
        phone,
        streetAddress,
      },
      paymentMethod: "cod",
    };

    await orderProduct(order);
    const generatedOrderNumber = `RS-${Date.now().toString().slice(-8)}`;

    setOrderNumber(generatedOrderNumber);
    setIsSubmitting(false);
    setIsOrderPlaced(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`w-full ${
                isOrderPlaced ? "max-w-md" : "max-w-2xl"
              } max-h-[90vh] rounded-2xl overflow-hidden flex flex-col transition-[max-width] duration-200`}
              style={{ backgroundColor: cardBg }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
                style={{ borderColor: cardBorder }}
              >
                <h2
                  className="text-lg font-bold"
                  style={{ color: textPrimary }}
                >
                  {isOrderPlaced ? "Order Confirmed" : "Checkout"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: textSecondary }}
                  aria-label="Close checkout"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              {isOrderPlaced ? (
                /* ================= ORDER SUCCESS ================= */
                <div className="p-8 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                  >
                    <FiCheckCircle
                      className="w-16 h-16"
                      style={{ color: isDark ? "#4ADE80" : "#16A34A" }}
                    />
                  </motion.div>

                  <h3
                    className="text-xl font-bold mt-4"
                    style={{ color: textPrimary }}
                  >
                    Order Placed Successfully
                  </h3>
                  <p className="text-sm mt-2" style={{ color: textSecondary }}>
                    Thank you, {fullName.split(" ")[0]}. We&apos;ve received
                    your order. RAHA Surgical will contact you shortly to
                    confirm delivery.
                  </p>

                  <div
                    className="w-full rounded-xl border p-4 mt-6 space-y-2 text-left"
                    style={{
                      backgroundColor: panelBg,
                      borderColor: cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: textMuted }}>Order Number</span>
                      <span
                        className="font-semibold font-mono"
                        style={{ color: textPrimary }}
                      >
                        {orderNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: textMuted }}>Item</span>
                      <span
                        className="font-medium truncate max-w-[60%]"
                        style={{ color: textPrimary }}
                      >
                        {product.productName} ({activeTier.unitType}) ×{" "}
                        {quantity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t">
                      <span
                        style={{ color: textMuted, borderColor: cardBorder }}
                      >
                        Amount to pay on delivery
                      </span>
                      <span className="font-bold" style={{ color: primary }}>
                        ৳{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p
                    className="w-full text-xs rounded-lg p-3 mt-3"
                    style={{ backgroundColor: badgeBgSoft, color: primary }}
                  >
                    Cash on Delivery — you&apos;ll pay the full amount to the
                    courier when your order arrives.
                  </p>

                  <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 rounded-lg text-sm font-bold text-white transition-colors"
                    style={{ backgroundColor: primary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = primaryHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = primary)
                    }
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                /* ================= CHECKOUT FORM ================= */
                <div className="overflow-y-auto p-6 space-y-6">
                  {/* 1. Order Summary */}
                  <section>
                    <h3
                      className="text-sm font-bold uppercase tracking-wider mb-3"
                      style={{ color: textPrimary }}
                    >
                      Order Summary
                    </h3>
                    <div
                      className="flex items-start gap-4 p-3 rounded-xl border"
                      style={{
                        backgroundColor: panelBg,
                        borderColor: cardBorder,
                      }}
                    >
                      <img
                        src={product.imageUrls[0]}
                        alt={product.productName}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        style={{ border: `1px solid ${cardBorder}` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: textPrimary }}
                        >
                          {product.productName}
                        </p>
                        <p className="text-xs" style={{ color: textMuted }}>
                          {activeTier.unitType}
                        </p>
                        <div
                          className="inline-flex items-center gap-2 mt-1.5 rounded-lg border"
                          style={{ borderColor: inputBorder }}
                        >
                          <button
                            onClick={() =>
                              onQuantityChange(Math.max(1, quantity - 1))
                            }
                            disabled={quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center disabled:opacity-30"
                            style={{ color: textPrimary }}
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span
                            className="w-5 text-center text-xs font-semibold"
                            style={{ color: textPrimary }}
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => onQuantityChange(quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center"
                            style={{ color: textPrimary }}
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: textPrimary }}
                        >
                          ৳{subtotal.toFixed(2)}
                        </p>
                        <p className="text-xs" style={{ color: textMuted }}>
                          (unit: ৳{unitPrice.toFixed(2)})
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 2. Amount Summary */}
                  <section>
                    <h3
                      className="text-sm font-bold uppercase tracking-wider mb-3"
                      style={{ color: textPrimary }}
                    >
                      Amount Summary
                    </h3>
                    <div
                      className="rounded-xl border p-3 space-y-1.5"
                      style={{
                        backgroundColor: panelBg,
                        borderColor: cardBorder,
                      }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: textSecondary }}>Subtotal</span>
                        <span style={{ color: textPrimary }}>
                          ৳{subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: textSecondary }}>
                          Delivery Charge
                        </span>
                        <span style={{ color: textPrimary }}>
                          ৳{deliveryCharge.toFixed(2)}
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between text-base font-bold pt-1.5 border-t"
                        style={{ borderColor: cardBorder }}
                      >
                        <span style={{ color: textPrimary }}>Total</span>
                        <span style={{ color: primary }}>
                          ৳{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* 3. Billing Address */}
                  <section>
                    <h3
                      className="text-sm font-bold uppercase tracking-wider mb-3"
                      style={{ color: textPrimary }}
                    >
                      Billing Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: textSecondary }}
                        >
                          Full Name <span style={{ color: "#DC2626" }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: textSecondary }}
                        >
                          Phone Number{" "}
                          <span style={{ color: "#DC2626" }}>*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: textSecondary }}
                        >
                          Delivery Location{" "}
                          <span style={{ color: "#DC2626" }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder="House number, street, area"
                          className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                          required
                        />
                      </div>
                    </div>
                  </section>

                  {/* 4. Place Order */}
                  <section>
                    <h3
                      className="text-sm font-bold uppercase tracking-wider mb-3"
                      style={{ color: textPrimary }}
                    >
                      Payment &amp; Place Order
                    </h3>

                    <div
                      className="rounded-xl border p-4 mb-4 flex items-start gap-3"
                      style={{
                        backgroundColor: panelBg,
                        borderColor: cardBorder,
                      }}
                    >
                      <FiTruck
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: primary }}
                      />
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: textPrimary }}
                        >
                          Cash on Delivery
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: textSecondary }}
                        >
                          You only need to pay the delivery charge now. The
                          remaining product amount will be collected upon
                          delivery.
                        </p>
                      </div>
                    </div>

                    <label
                      className="flex items-start gap-2 text-xs cursor-pointer"
                      style={{ color: textSecondary }}
                    >
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5"
                        style={{ accentColor: primary }}
                      />
                      I have read and agree to the website{" "}
                      <span style={{ color: primary }}>
                        terms and conditions
                      </span>{" "}
                      <span style={{ color: "#DC2626" }}>*</span>
                    </label>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={!isFormValid || isSubmitting}
                      className="w-full mt-4 py-3.5 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: primary }}
                      onMouseEnter={(e) => {
                        if (isFormValid)
                          e.currentTarget.style.backgroundColor = primaryHover;
                      }}
                      onMouseLeave={(e) => {
                        if (isFormValid)
                          e.currentTarget.style.backgroundColor = primary;
                      }}
                    >
                      {isSubmitting ? "Placing order..." : "PLACE ORDER"}
                    </button>
                  </section>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
