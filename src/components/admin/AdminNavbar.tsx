"use client";

import { useTheme } from "next-themes";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const AdminNavbar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#1E293B" : "#F8FAFC";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";

  return (
    <header
      className="border-b px-6 py-3 flex items-center justify-between transition-colors duration-300"
      style={{
        backgroundColor: bg,
        borderColor: borderColor,
      }}
    >
      {/* Left: Page Title (could be dynamic) */}
      <div>
        <h2 className="text-lg font-semibold" style={{ color: textPrimary }}>
          Dashboard
        </h2>
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: textSecondary }}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 rounded-lg border text-sm outline-none transition-all duration-200"
            style={{
              backgroundColor: inputBg,
              borderColor: inputBorder,
              color: textPrimary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = isDark
                ? "#60A5FA"
                : "#025395";
              e.currentTarget.style.boxShadow = `0 0 0 2px ${
                isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"
              }`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Notifications */}
        <button
          className="p-2 rounded-full relative transition-colors duration-200"
          style={{ color: textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "#1E293B"
              : "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Notifications"
        >
          <FaBell className="w-5 h-5" />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: isDark ? "#60A5FA" : "#025395" }}
          />
        </button>

        {/* Profile */}
        <button
          className="flex items-center gap-2 p-1.5 rounded-full transition-colors duration-200"
          style={{ color: textPrimary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "#1E293B"
              : "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Profile"
        >
          <FaUserCircle className="w-8 h-8" style={{ color: textSecondary }} />
          <span className="text-sm font-medium hidden md:inline">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
