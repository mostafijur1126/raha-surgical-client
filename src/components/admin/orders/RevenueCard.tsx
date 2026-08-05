"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiDollarSign } from "react-icons/fi";

interface RevenueCardProps {
  totalRevenue: number;
  monthToDate?: boolean;
}

const RevenueCard = ({
  totalRevenue,
  monthToDate = true,
}: RevenueCardProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const primary = isDark ? "#60A5FA" : "#025395";
  const badgeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";

  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalRevenue);

  return (
    <div
      className="rounded-xl border p-6 flex items-center gap-4"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <div
        className="p-3 rounded-xl"
        style={{ backgroundColor: badgeBg, color: primary }}
      >
        <FiDollarSign className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: textSecondary }}>
          TOTAL REVENUE {monthToDate ? "(MTD)" : ""}
        </p>
        <p className="text-2xl font-bold" style={{ color: textPrimary }}>
          {formattedRevenue}
        </p>
      </div>
    </div>
  );
};

export default RevenueCard;
