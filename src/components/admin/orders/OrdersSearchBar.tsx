"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiSearch } from "react-icons/fi";

interface OrdersSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const OrdersSearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search by Order ID, Customer, or Facility...",
}: OrdersSearchBarProps) => {
  const { isDark } = useMountedTheme();

  const primary = isDark ? "#60A5FA" : "#025395";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#FFFFFF";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div
      className="relative flex-1 max-w-md rounded-lg border overflow-hidden flex items-center"
      style={{
        backgroundColor: inputBg,
        borderColor: inputBorder,
      }}
    >
      <FiSearch
        className="absolute left-3 w-4 h-4"
        style={{ color: textSecondary }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 bg-transparent outline-none text-sm placeholder:text-slate-400"
        style={{ color: textPrimary }}
      />
    </div>
  );
};

export default OrdersSearchBar;
