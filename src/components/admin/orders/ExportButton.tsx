"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiDownload } from "react-icons/fi";

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton = ({ onClick }: ExportButtonProps) => {
  const { isDark } = useMountedTheme();

  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        backgroundColor: primary,
        color: "#FFFFFF",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = primaryHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = primary;
      }}
    >
      <FiDownload className="w-4 h-4" />
      Export Orders
    </button>
  );
};

export default ExportButton;
