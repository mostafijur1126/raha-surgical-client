"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

const options = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border dark:border-dark-lighter bg-card dark:bg-dark-lighter hover:shadow-sm transition-all text-sm"
      >
        Sort by: {selected.label}
        <FiChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-card dark:bg-dark-lighter border border-border dark:border-dark-lighter rounded-xl shadow-lg overflow-hidden z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-background dark:hover:bg-dark transition-colors ${opt.value === value ? "text-primary font-medium" : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
