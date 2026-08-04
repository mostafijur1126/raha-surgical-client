"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { authClient } from "@/lib/auth-client";
import { SessionUser } from "@/lib/types";
import { CategoryOption } from "@/lib/api/products";
import { toLabel } from "@/lib/format";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

const MobileMenu = ({ isOpen, onClose, categories }: MobileMenuProps) => {
  const { isDark } = useMountedTheme();
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;

  const isAdmin = user?.role === "admin";

  const baseLink = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  const links = isAdmin
    ? [...baseLink, { label: "Dashboard", href: "/admin/dashboard" }]
    : baseLink;

  const bg = isDark ? "#1E293B" : "#FFFFFF";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const hoverBg = isDark ? "#2D3748" : "#EFF6FF";
  const hoverText = isDark ? "#60A5FA" : "#025395";
  const borderColor = isDark ? "#334155" : "#E2E8F0";
  const overlayBg = isDark ? "rgba(15,23,42,0.8)" : "rgba(0,0,0,0.5)";

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
            className="fixed inset-0 z-40"
            style={{ backgroundColor: overlayBg }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full max-w-sm h-full z-50 shadow-xl p-6 overflow-y-auto"
            style={{ backgroundColor: bg }}
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full transition-colors"
                style={{ color: textSecondary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-base font-medium rounded-lg transition-colors"
                  style={{
                    color: textSecondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverText;
                    e.currentTarget.style.backgroundColor = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = textSecondary;
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
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
                      <div
                        className="py-2 space-y-1 pl-3"
                        style={{
                          borderLeft: `2px solid ${isDark ? "#3B82F6" : "#025395"}20`,
                        }}
                      >
                        {categories.map((category) => (
                          <Link
                            key={category}
                            href={{
                              pathname: "/products",
                              query: {
                                category: category,
                              },
                            }}
                            className="block px-3 py-2 text-sm rounded-md transition-colors"
                            style={{ color: textSecondary }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = hoverText;
                              e.currentTarget.style.backgroundColor = hoverBg;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = textSecondary;
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                            onClick={onClose}
                          >
                            {toLabel(category)}{" "}
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
                    className="block px-4 py-3 text-base font-medium rounded-lg transition-colors"
                    style={{
                      color: isActive ? hoverText : textSecondary,
                      backgroundColor: isActive ? hoverBg : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = hoverText;
                        e.currentTarget.style.backgroundColor = hoverBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = textSecondary;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
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
