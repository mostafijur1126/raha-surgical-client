"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUploadCloud,
  FiTrash2,
  FiPlus,
  FiInfo,
  FiFileText,
  FiCheckCircle,
  FiX,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string; // local blob preview, upload complete howar age ei ta dekhabe
  cloudinaryUrl: string | null; // upload complete hole eikhane secure_url store hobe
  status: "uploading" | "done" | "error";
  errorMessage?: string;
}

interface PricingTier {
  id: string;
  unitType: string;
  unitsPerPackage: number;
  price: string;
  sku: string;
}

const createTier = (
  unitType: string,
  unitsPerPackage: number,
  skuBase: string,
): PricingTier => ({
  id: crypto.randomUUID(),
  unitType,
  unitsPerPackage,
  price: "",
  sku: unitsPerPackage === 1 ? skuBase : `${skuBase}-BX${unitsPerPackage}`,
});

const UNIT_PRESETS = ["Single Piece", "Box of 10", "Box of 25", "Case of 50"];

export default function InventoryPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

  // Form state
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [baseSku, setBaseSku] = useState("MPS-00492");
  const [stockLevel, setStockLevel] = useState(0);
  const [rxRequired, setRxRequired] = useState(true);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [tiers, setTiers] = useState<PricingTier[]>([
    createTier("Single Piece", 1, "MPS-00492"),
  ]);

  // ---- Theme tokens (matches the rest of the RAHA admin UI) ----
  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const pageBg = isDark ? "#0F172A" : "#F5F7FB";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#FFFFFF";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";
  const badgeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const dropZoneBg = isDark ? "#0F172A" : "#F8FAFC";
  const dropZoneActiveBg = isDark
    ? "rgba(96,165,250,0.08)"
    : "rgba(2,83,149,0.05)";

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

  const addTier = () => {
    setTiers((prev) => [...prev, createTier("Box of 10", 10, baseSku)]);
  };

  const removeTier = (id: string) => {
    setTiers((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTier = (id: string, patch: Partial<PricingTier>) => {
    setTiers((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  // ekta file select/drop hoyar sathe sathe Cloudinary te upload shuru hoye jay
  const handleNewFiles = (newFiles: File[]) => {
    const entries: UploadedImage[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      cloudinaryUrl: null,
      status: "uploading",
    }));

    setImages((prev) => [...prev, ...entries]);

    entries.forEach((entry) => {
      uploadImageToCloudinary(entry.file)
        .then((result) => {
          setImages((prev) =>
            prev.map((img) =>
              img.id === entry.id
                ? { ...img, status: "done", cloudinaryUrl: result.url }
                : img,
            ),
          );
        })
        .catch((err: Error) => {
          setImages((prev) =>
            prev.map((img) =>
              img.id === entry.id
                ? { ...img, status: "error", errorMessage: err.message }
                : img,
            ),
          );
        });
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleNewFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleNewFiles(Array.from(e.target.files));
      e.target.value = ""; // same file abar select korle change event fire howar jonno
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  // Publish/Save korar age check kora hocche shob image upload complete hoyeche kina
  const isAnyImageUploading = images.some((img) => img.status === "uploading");

  const buildPayload = () => ({
    productName,
    category,
    brand,
    baseSku,
    stockLevel,
    rxRequired,
    description,
    pricingTiers: tiers.map(({ id, ...rest }) => rest),
    // ✅ raw File na, Cloudinary theke pawa secure_url gulo pathano hocche —
    // backend e eigulo directly database e save kora jabe
    imageUrls: images
      .filter((img) => img.status === "done" && img.cloudinaryUrl)
      .map((img) => img.cloudinaryUrl as string),
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnyImageUploading) {
      console.log("Please wait — images are still uploading to Cloudinary.");
      return;
    }
    console.log("Publish product:", buildPayload());
    // TODO: POST to /api/admin/products
  };

  const handleSaveTemplate = () => {
    console.log("Save as template:", buildPayload());
    // TODO: POST to /api/admin/products/templates
  };

  const handleDiscard = () => {
    console.log("Discard draft");
    // TODO: clear/reset or navigate away
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: pageBg }}
    >
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: textPrimary }}
          >
            Inventory Management
          </h1>
          <p className="text-sm mt-1" style={{ color: textSecondary }}>
            Create a new product listing with full technical specifications for
            clinical procurement.
          </p>
        </div>

        <form onSubmit={handlePublish}>
          {/* Main card */}
          <div
            className="rounded-2xl border shadow-sm p-6 md:p-8 transition-colors duration-300"
            style={{ backgroundColor: cardBg, borderColor: cardBorder }}
          >
            {/* Product Name + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: textSecondary }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. PrecisionScalpel Series-X"
                  className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 text-sm"
                  style={inputStyle}
                  {...focusHandlers}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: textSecondary }}
                >
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 text-sm"
                  style={inputStyle}
                  {...focusHandlers}
                  required
                >
                  <option value="">Select surgical specialty</option>
                  <option value="cutting-instruments">
                    Cutting Instruments
                  </option>
                  <option value="sutures">Sutures &amp; Closure</option>
                  <option value="orthopedic">Orthopedic</option>
                  <option value="cardiovascular">Cardiovascular</option>
                  <option value="general">General Surgery</option>
                </select>
              </div>
            </div>

            {/* Brand + Base SKU + Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: textSecondary }}
                >
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="MedPro / OEM"
                  className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 text-sm"
                  style={inputStyle}
                  {...focusHandlers}
                />
              </div>
              <div>
                <label
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: textSecondary }}
                >
                  SKU / Catalog #
                  <span
                    className="normal-case font-normal text-[10px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: badgeBg, color: primary }}
                  >
                    auto, editable
                  </span>
                </label>
                <input
                  type="text"
                  value={baseSku}
                  onChange={(e) => setBaseSku(e.target.value)}
                  placeholder="MPS-00492"
                  className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 text-sm font-mono"
                  style={inputStyle}
                  {...focusHandlers}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: textSecondary }}
                >
                  Stock Level (units)
                </label>
                <input
                  type="number"
                  min={0}
                  value={stockLevel}
                  onChange={(e) => setStockLevel(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 text-sm"
                  style={inputStyle}
                  {...focusHandlers}
                />
              </div>
            </div>

            {/* Divider */}
            <div
              className="my-7 pt-0.5 border-t"
              style={{ borderColor: cardBorder }}
            />

            {/* Pricing tiers */}
            <div className="flex items-center justify-between mb-3">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: textSecondary }}
              >
                Pricing by Unit
              </label>
              <button
                type="button"
                onClick={addTier}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                style={{ color: primary, backgroundColor: badgeBg }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = primaryHover)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = primary)}
              >
                <FiPlus className="w-3.5 h-3.5" />
                Add Tier
              </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {tiers.map((tier, idx) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="grid grid-cols-1 sm:grid-cols-[1.2fr_0.8fr_1fr_1fr_auto] gap-3 items-end p-4 rounded-xl border"
                      style={{
                        borderColor: cardBorder,
                        backgroundColor: dropZoneBg,
                      }}
                    >
                      <div>
                        <label
                          className="block text-[10px] font-semibold uppercase tracking-wider mb-1"
                          style={{ color: textMuted }}
                        >
                          Unit Type
                        </label>
                        <input
                          list={`unit-presets-${tier.id}`}
                          value={tier.unitType}
                          onChange={(e) =>
                            updateTier(tier.id, { unitType: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border outline-none text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                        />
                        <datalist id={`unit-presets-${tier.id}`}>
                          {UNIT_PRESETS.map((preset) => (
                            <option key={preset} value={preset} />
                          ))}
                        </datalist>
                      </div>

                      <div>
                        <label
                          className="block text-[10px] font-semibold uppercase tracking-wider mb-1"
                          style={{ color: textMuted }}
                        >
                          Units / Package
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={tier.unitsPerPackage}
                          onChange={(e) =>
                            updateTier(tier.id, {
                              unitsPerPackage: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border outline-none text-sm"
                          style={inputStyle}
                          {...focusHandlers}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-[10px] font-semibold uppercase tracking-wider mb-1"
                          style={{ color: textMuted }}
                        >
                          Price (USD)
                        </label>
                        <div className="relative">
                          <span
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                            style={{ color: textMuted }}
                          >
                            $
                          </span>
                          <input
                            type="number"
                            min={0}
                            step="0.01"
                            value={tier.price}
                            onChange={(e) =>
                              updateTier(tier.id, { price: e.target.value })
                            }
                            placeholder="0.00"
                            className="w-full pl-6 pr-3 py-2 rounded-lg border outline-none text-sm"
                            style={inputStyle}
                            {...focusHandlers}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-[10px] font-semibold uppercase tracking-wider mb-1"
                          style={{ color: textMuted }}
                        >
                          Tier SKU
                        </label>
                        <input
                          type="text"
                          value={tier.sku}
                          onChange={(e) =>
                            updateTier(tier.id, { sku: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border outline-none text-sm font-mono"
                          style={inputStyle}
                          {...focusHandlers}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeTier(tier.id)}
                        disabled={tiers.length === 1}
                        className="flex items-center justify-center h-[38px] w-[38px] rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                          borderColor: cardBorder,
                          color: isDark ? "#F87171" : "#DC2626",
                        }}
                        aria-label="Remove tier"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Rx toggle */}
            <button
              type="button"
              onClick={() => setRxRequired((v) => !v)}
              className="w-full flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: rxRequired ? badgeBg : "transparent",
                color: rxRequired ? primary : textMuted,
                border: `1px solid ${rxRequired ? "transparent" : inputBorder}`,
              }}
            >
              <FiInfo className="w-4 h-4 flex-shrink-0" />
              Rx Prescription Required for purchase
            </button>

            {/* Divider */}
            <div
              className="my-7 border-t"
              style={{ borderColor: cardBorder }}
            />

            {/* Product Imagery */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: textSecondary }}
              >
                Product Imagery
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className="relative rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center px-6 py-10 transition-colors duration-150"
                style={{
                  borderColor: isDragging ? primary : inputBorder,
                  backgroundColor: isDragging ? dropZoneActiveBg : dropZoneBg,
                }}
              >
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileInput}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: badgeBg }}
                >
                  <FiUploadCloud
                    className="w-5 h-5"
                    style={{ color: primary }}
                  />
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: textPrimary }}
                >
                  Drag and drop clinical photos
                </p>
                <p
                  className="text-xs mt-1 max-w-xs"
                  style={{ color: textMuted }}
                >
                  Support for high-resolution PNG, JPG, or PDF specification
                  sheets. Max size 20MB per file.
                </p>
              </div>

              {images.length > 0 && (
                <ul className="mt-3 space-y-2">
                  <AnimatePresence initial={false}>
                    {images.map((img) => (
                      <motion.li
                        key={img.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg border text-sm"
                        style={{
                          borderColor: cardBorder,
                          color: textSecondary,
                        }}
                      >
                        {/* eta local blob preview - Cloudinary theke asa URL na, dekhanor jonno matro */}
                        <img
                          src={img.previewUrl}
                          alt={img.file.name}
                          className="w-9 h-9 rounded object-cover flex-shrink-0"
                        />
                        <span className="truncate flex-1">{img.file.name}</span>

                        {img.status === "uploading" && (
                          <span
                            className="flex items-center gap-1.5 text-xs flex-shrink-0"
                            style={{ color: primary }}
                          >
                            <FiLoader className="w-3.5 h-3.5 animate-spin" />
                            Uploading...
                          </span>
                        )}
                        {img.status === "done" && (
                          <span
                            className="flex items-center gap-1.5 text-xs flex-shrink-0"
                            style={{ color: isDark ? "#4ADE80" : "#16A34A" }}
                          >
                            <FiCheckCircle className="w-3.5 h-3.5" />
                            Uploaded
                          </span>
                        )}
                        {img.status === "error" && (
                          <span
                            className="flex items-center gap-1.5 text-xs flex-shrink-0"
                            style={{ color: isDark ? "#F87171" : "#DC2626" }}
                            title={img.errorMessage}
                          >
                            <FiAlertCircle className="w-3.5 h-3.5" />
                            Failed
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          style={{ color: textMuted }}
                          aria-label="Remove file"
                          className="flex-shrink-0"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Description */}
            <div className="mt-7">
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: textSecondary }}
              >
                Clinical Description &amp; Specifications
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Provide detailed material information, sterilization requirements, and anatomical compatibility..."
                className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm resize-y"
                style={inputStyle}
                {...focusHandlers}
              />
            </div>

            {/* Divider */}
            <div
              className="my-7 border-t"
              style={{ borderColor: cardBorder }}
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: textMuted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = isDark ? "#F87171" : "#DC2626")
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
              >
                <FiTrash2 className="w-4 h-4" />
                Discard Draft
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveTemplate}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border text-sm font-semibold transition-colors"
                  style={{ borderColor: inputBorder, color: textPrimary }}
                >
                  Save as Template
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isAnyImageUploading}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: primary }}
                  onMouseEnter={(e) => {
                    if (!isAnyImageUploading)
                      e.currentTarget.style.backgroundColor = primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnyImageUploading)
                      e.currentTarget.style.backgroundColor = primary;
                  }}
                >
                  {isAnyImageUploading
                    ? "Uploading images..."
                    : "Publish Product"}
                </motion.button>
              </div>
            </div>
          </div>
        </form>

        {/* Clinical accuracy note */}
        <div
          className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        >
          <FiCheckCircle
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: primary }}
          />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: primary }}>
              Clinical Accuracy Guarantee
            </h3>
            <p className="text-xs mt-1" style={{ color: textSecondary }}>
              All newly published products undergo a secondary regulatory review
              before appearing in the public catalog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
