"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const demoCategories = [
  "General Surgical Instruments",
  "Medical Disposables",
  "Orthopedic Implants",
  "Hospital Furniture",
  "ICU Equipment",
  "Diagnostic Equipment",
  "Dental Equipment",
  "Laboratory Products",
  "Emergency Products",
  "Rehabilitation Products",
  "OT Equipment",
  "Patient Monitor",
  "Radiology Equipment",
  "Sterilization Products",
  "Blood Collection",
  "Physiotherapy Equipment",
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

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
              >
                <FiX className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
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
                        {demoCategories.map((cat) => (
                          <Link
                            key={cat}
                            href={`/products/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                            onClick={onClose}
                          >
                            {cat}
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
