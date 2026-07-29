"use client";

import {
  FaDollarSign,
  FaShoppingCart,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { StatCardData } from "@/data/adminDashboardData";
import { useMountedTheme } from "@/hooks/useMountedTheme";

interface AdminStatsProps {
  stats: StatCardData[];
}

const iconMap: Record<string, React.ReactNode> = {
  FaDollarSign: <FaDollarSign className="w-5 h-5" />,
  FaShoppingCart: <FaShoppingCart className="w-5 h-5" />,
  FaClock: <FaClock className="w-5 h-5" />,
  FaExclamationTriangle: <FaExclamationTriangle className="w-5 h-5" />,
};

const AdminStats = ({ stats }: AdminStatsProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const increaseColor = isDark ? "#4ADE80" : "#16A34A";
  const decreaseColor = isDark ? "#F87171" : "#DC2626";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const isIncrease = stat.changeType === "increase";
        const changeColor = isIncrease ? increaseColor : decreaseColor;
        const icon = iconMap[stat.icon];

        return (
          <div
            key={stat.id}
            className="rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className="p-2.5 rounded-lg"
                style={{
                  backgroundColor: isDark
                    ? "rgba(96,165,250,0.15)"
                    : "rgba(2,83,149,0.08)",
                  color: isDark ? "#60A5FA" : "#025395",
                }}
              >
                {icon}
              </div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: changeColor,
                  backgroundColor: isIncrease
                    ? isDark
                      ? "rgba(74,222,128,0.15)"
                      : "rgba(22,163,74,0.08)"
                    : isDark
                      ? "rgba(248,113,113,0.15)"
                      : "rgba(220,38,38,0.08)",
                }}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium" style={{ color: textSecondary }}>
              {stat.title}
            </p>
            <p
              className="text-2xl font-bold mt-0.5"
              style={{ color: textPrimary }}
            >
              {stat.value}
            </p>
            <p className="text-xs mt-1" style={{ color: textMuted }}>
              {stat.comparison}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;
