"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

// TODO: Replace with backend API response.
// Expected API shape: { name: string, slug: string }[]
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: Category[];
}

const MobileMenu = ({
  isOpen,
  onClose,
  categories = demoCategories,
}: MobileMenuProps) => {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Reset the Products submenu and unlock body scroll whenever the drawer closes.
  useEffect(() => {
    if (!isOpen) {
      setProductsOpen(false);
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-xl p-6 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-expanded={productsOpen}
                >
                  <span>Products</span>
                  <FiChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      productsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pl-4"
                    >
                      <div className="py-2 space-y-1 border-l-2 border-blue-700/20 pl-3">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products/category/${cat.slug}`}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                            onClick={onClose}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-blue-700 bg-blue-50"
                        : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
