"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

interface Category {
  name: string;
  slug: string;
}

const demoCategories: Category[] = [
  {
    name: "General Surgical Instruments",
    slug: "general-surgical-instruments",
  },
  { name: "Medical Disposables", slug: "medical-disposables" },
  { name: "Orthopedic Implants", slug: "orthopedic-implants" },
  { name: "Hospital Furniture", slug: "hospital-furniture" },
  { name: "ICU Equipment", slug: "icu-equipment" },
  { name: "Diagnostic Equipment", slug: "diagnostic-equipment" },
  { name: "Dental Equipment", slug: "dental-equipment" },
  { name: "Laboratory Products", slug: "laboratory-products" },
  { name: "Emergency Products", slug: "emergency-products" },
  { name: "Rehabilitation Products", slug: "rehabilitation-products" },
  { name: "OT Equipment", slug: "ot-equipment" },
  { name: "Patient Monitor", slug: "patient-monitor" },
  { name: "Radiology Equipment", slug: "radiology-equipment" },
  { name: "Sterilization Products", slug: "sterilization-products" },
  { name: "Blood Collection", slug: "blood-collection" },
  { name: "Physiotherapy Equipment", slug: "physiotherapy-equipment" },
];

interface MegaMenuProps {
  isOpen: boolean;
  categories?: Category[];
  onClose: () => void;
}

const MegaMenu = ({
  isOpen,
  categories = demoCategories,
  onClose,
}: MegaMenuProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#1E293B" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E2E8F0";
  const textColor = isDark ? "#E2E8F0" : "#334155";
  const hoverBg = isDark ? "#2D3748" : "#EFF6FF";
  const hoverText = isDark ? "#60A5FA" : "#025395";

  const columns = 4;
  const chunkSize = Math.ceil(categories.length / columns);
  const columnData = Array.from({ length: columns }, (_, i) =>
    categories.slice(i * chunkSize, (i + 1) * chunkSize),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full mt-0 rounded-xl shadow-xl border p-6"
          style={{
            width: "100vw",
            maxWidth: "100%",
            transform: "translateX(-50%)",
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {columnData.map((column, colIdx) => (
                <div key={colIdx} className="space-y-1.5">
                  {column.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products/category/${category.slug}`}
                      onClick={onClose}
                      className="block px-2 py-1.5 text-sm rounded-md transition-colors duration-150"
                      style={{ color: textColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = hoverText;
                        e.currentTarget.style.backgroundColor = hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textColor;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
