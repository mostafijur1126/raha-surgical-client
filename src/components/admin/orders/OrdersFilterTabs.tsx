"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";

interface OrdersFilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts?: {
    all: number;
    pending: number;
    shipped: number;
  };
}

const OrdersFilterTabs = ({
  activeTab,
  onTabChange,
  counts,
}: OrdersFilterTabsProps) => {
  const { isDark } = useMountedTheme();

  const primary = isDark ? "#60A5FA" : "#025395";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const activeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";

  const tabs = [
    { key: "all", label: "All", count: counts?.all },
    { key: "pending", label: "Pending", count: counts?.pending },
    { key: "shipped", label: "Shipped", count: counts?.shipped },
    { key: "delivered", label: "Delivered", count: counts?.delivered },
    { key: "cancelled", label: "Cancelled", count: counts?.cancelled },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: activeTab === tab.key ? activeBg : "transparent",
            color: activeTab === tab.key ? primary : textSecondary,
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.key) {
              e.currentTarget.style.color = textPrimary;
              e.currentTarget.style.backgroundColor = isDark
                ? "#2D3748"
                : "#F1F5F9";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.key) {
              e.currentTarget.style.color = textSecondary;
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 text-xs" style={{ color: textMuted }}>
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default OrdersFilterTabs;
