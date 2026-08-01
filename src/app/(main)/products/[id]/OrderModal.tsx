"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiMinus,
  FiPlus,
  FiShield,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import type { Product, PricingTier } from "@/lib/types";
import { orderProduct } from "@/lib/action/product";

//District dropdown
const BD_DISTRICTS = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  activeTier: PricingTier;
  purchaseMode: "single" | "box";
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

type PaymentMethod = "online" | "cod";

export default function OrderModal({
  isOpen,
  onClose,
  product,
  activeTier,
  purchaseMode,
  quantity,
  onQuantityChange,
}: OrderModalProps) {
  const { isDark } = useMountedTheme();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
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

  // ---- Theme tokens (RAHA brand) ----
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
      e.currentTarget.style.boxShadow = `0 0 0 2px ${isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"}`;
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
    fullName.trim() &&
    phone.trim() &&
    streetAddress.trim() &&
    district &&
    agreedToTerms;

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
        email: email || null,
        streetAddress,
        district,
        postcode: postcode || null,
      },
      orderNotes: orderNotes || null,
      paymentMethod,
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
              className={`w-full ${isOrderPlaced ? "max-w-md" : "max-w-4xl"} max-h-[90vh] rounded-2xl overflow-hidden flex flex-col transition-[max-width] duration-200`}
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
                    {paymentMethod === "cod" ? (
                      <>
                        Thank you, {fullName.split(" ")[0]}. Your order has been
                        received. Please wait — RAHA Surgical will contact you
                        shortly to confirm delivery.
                      </>
                    ) : (
                      <>
                        Thank you, {fullName.split(" ")[0]}. We&apos;ve received
                        your order and will contact you shortly to confirm
                        delivery.
                      </>
                    )}
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
                    <div
                      className="flex items-center justify-between text-sm pt-2 border-t"
                      style={{ borderColor: cardBorder }}
                    >
                      <span
                        className="font-semibold"
                        style={{ color: textPrimary }}
                      >
                        {paymentMethod === "cod" ? "Amount Due" : "Total Paid"}
                      </span>
                      <span className="font-bold" style={{ color: primary }}>
                        ৳{subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {paymentMethod === "cod" && (
                    <p
                      className="w-full text-xs rounded-lg p-3 mt-3"
                      style={{ backgroundColor: badgeBgSoft, color: primary }}
                    >
                      Cash on Delivery — you&apos;ll pay this amount to the
                      courier when the product reaches your hands.
                    </p>
                  )}

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
                <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2">
                  {/* ================= LEFT (desktop) / BOTTOM (mobile): Billing & Shipping ================= */}
                  <div className="order-2 md:order-1 p-6 space-y-4">
                    <h3
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: textPrimary }}
                    >
                      Billing &amp; Shipping
                    </h3>

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
                        Phone Number <span style={{ color: "#DC2626" }}>*</span>
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
                        Email{" "}
                        <span
                          className="font-normal"
                          style={{ color: textMuted }}
                        >
                          (optional)
                        </span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: textSecondary }}
                      >
                        Street Address{" "}
                        <span style={{ color: "#DC2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="House number and street name"
                        className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                        style={inputStyle}
                        {...focusHandlers}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: textSecondary }}
                        >
                          District <span style={{ color: "#DC2626" }}>*</span>
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                          required
                        >
                          <option value="">Select an option...</option>
                          {BD_DISTRICTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{ color: textSecondary }}
                        >
                          Postcode / ZIP{" "}
                          <span
                            className="font-normal"
                            style={{ color: textMuted }}
                          >
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: textSecondary }}
                      >
                        Order Notes{" "}
                        <span
                          className="font-normal"
                          style={{ color: textMuted }}
                        >
                          (optional)
                        </span>
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        className="w-full px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm resize-none"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                  </div>

                  {/* ================= RIGHT (desktop) / TOP (mobile): Order Summary ================= */}
                  <div
                    className="order-1 md:order-2 p-6 space-y-4"
                    style={{ backgroundColor: panelBg }}
                  >
                    <h3
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: textPrimary }}
                    >
                      Your Order
                    </h3>

                    {/* Product row */}
                    <div
                      className="flex items-center gap-3 pb-4 border-b"
                      style={{ borderColor: cardBorder }}
                    >
                      <img
                        src={product.imageUrls[0]}
                        alt={product.productName}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
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
                      <p
                        className="text-sm font-semibold flex-shrink-0"
                        style={{ color: textPrimary }}
                      >
                        ৳{subtotal.toFixed(2)}
                      </p>
                    </div>

                    {/* Totals */}
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: textSecondary }}>Subtotal</span>
                      <span
                        className="font-semibold"
                        style={{ color: textPrimary }}
                      >
                        ৳{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between text-sm pb-4 border-b"
                      style={{ borderColor: cardBorder }}
                    >
                      <span style={{ color: textSecondary }}>Shipment</span>
                      <span className="text-xs" style={{ color: textMuted }}>
                        Enter your address to view shipping options.
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold"
                        style={{ color: textPrimary }}
                      >
                        Total
                      </span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: primary }}
                      >
                        ৳{subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Payment method */}
                    <div className="pt-4 space-y-3">
                      <label
                        className="flex items-center gap-2 text-sm cursor-pointer"
                        style={{ color: textPrimary }}
                      >
                        <input
                          type="radio"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          style={{ accentColor: primary }}
                        />
                        <FiShield
                          className="w-4 h-4"
                          style={{ color: primary }}
                        />
                        Secured Online Payment
                      </label>
                      {paymentMethod === "online" && (
                        <p
                          className="text-xs rounded-lg p-3"
                          style={{
                            backgroundColor: cardBg,
                            color: textMuted,
                            border: `1px solid ${cardBorder}`,
                          }}
                        >
                          Pay securely by Credit or Debit card, or mobile
                          banking, through our secure payment gateway.
                        </p>
                      )}

                      <label
                        className="flex items-center gap-2 text-sm cursor-pointer"
                        style={{ color: textPrimary }}
                      >
                        <input
                          type="radio"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          style={{ accentColor: primary }}
                        />
                        <FiTruck
                          className="w-4 h-4"
                          style={{ color: primary }}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    {/* Terms */}
                    <label
                      className="flex items-start gap-2 text-xs pt-2 cursor-pointer"
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

                    {/* Place order */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={!isFormValid || isSubmitting}
                      className="w-full py-3.5 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
