"use client";

import { useState, useEffect, FormEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const bgColor = isDark ? "#1E293B" : "#F1F5F9";
  const textColor = isDark ? "#F1F5F9" : "#0F172A";
  const placeholderColor = isDark ? "#94A3B8" : "#64748B";
  const borderColor = isDark ? "#334155" : "#E2E8F0";
  const focusBorder = isDark ? "#60A5FA" : "#025395";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative flex-1 max-w-2xl mx-4"
    >
      <div className="relative">
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <FiSearch className="w-5 h-5" style={{ color: "#94A3B8" }} />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search surgical instruments, medical equipment..."
          aria-label="Search surgical instruments, medical equipment"
          className="w-full pl-10 pr-4 py-2.5 rounded-full border outline-none transition-all duration-200 search-input"
          style={
            {
              backgroundColor: bgColor,
              color: textColor,
              borderColor: borderColor,
              "--placeholder-color": placeholderColor,
            } as React.CSSProperties
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor = focusBorder;
            e.currentTarget.style.boxShadow = `0 0 0 2px ${
              isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.2)"
            }`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = borderColor;
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
