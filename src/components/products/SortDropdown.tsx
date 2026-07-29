"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiChevronDown } from "react-icons/fi";

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

const options = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme-aware colors
  const bgColor = isDark ? "#1E293B" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const hoverBg = isDark ? "#2D3748" : "#F1F5F9";
  const activeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const shadow = isDark
    ? "0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -4px rgba(0,0,0,0.2)"
    : "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)";

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between sm:justify-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 text-sm w-full sm:w-auto"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          color: textPrimary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = primaryColor;
          e.currentTarget.style.boxShadow = isDark
            ? "0 2px 8px rgba(0,0,0,0.2)"
            : "0 2px 8px rgba(2,83,149,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = borderColor;
          e.currentTarget.style.boxShadow = "none";
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>
          Sort by: <span className="font-medium">{selected.label}</span>
        </span>
        <FiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: textMuted }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-full sm:w-48 rounded-xl border shadow-lg overflow-hidden z-50"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            boxShadow: shadow,
          }}
          role="listbox"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
                style={{
                  color: isSelected ? primaryColor : textSecondary,
                  backgroundColor: isSelected ? activeBg : "transparent",
                  fontWeight: isSelected ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = hoverBg;
                    e.currentTarget.style.color = textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = textSecondary;
                  }
                }}
                role="option"
                aria-selected={isSelected}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
