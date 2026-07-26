"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut, FiUserCheck, FiChevronDown } from "react-icons/fi";
import { useTheme } from "next-themes";

const ProfileDropdown = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const bg = isDark ? "#1E293B" : "#FFFFFF";
  const text = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const border = isDark ? "#334155" : "#E2E8F0";
  const hoverBg = isDark ? "#2D3748" : "#F1F5F9";
  const destructive = isDark ? "#F87171" : "#DC2626";

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => console.log("Navigate to login")}
        className="text-white rounded-full px-6 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
        style={{ backgroundColor: primary }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = primaryHover)
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = primary)}
      >
        Login / Register
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded-full transition-colors duration-200"
        style={{ color: textSecondary }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
        aria-label="Profile menu"
      >
        <FiUser className="w-5 h-5" />
        <FiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-1 z-50"
            style={{
              backgroundColor: bg,
              borderColor: border,
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                console.log("Navigate to profile");
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors"
              style={{ color: text }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FiUserCheck className="w-4 h-4" />
              My Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLoggedIn(false);
                console.log("Logout");
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors border-t"
              style={{
                color: destructive,
                borderColor: border,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = isDark
                  ? "#3B1E1E"
                  : "#FEE2E2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
