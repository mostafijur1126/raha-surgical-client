"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMountedTheme } from "@/hooks/useMountedTheme";

interface MegaMenuProps {
  categories: string[];
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu = ({ isOpen, categories, onClose }: MegaMenuProps) => {
  const { isDark } = useMountedTheme();

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
                      key={category}
                      href={{
                        pathname: "/products",
                        query: {
                          category,
                        },
                      }}
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
                      {category
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
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
