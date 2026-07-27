"use client";

import { useTheme } from "next-themes";
import { OrderData } from "@/data/adminDashboardData";
import Link from "next/link";

interface RecentOrdersProps {
  orders: OrderData[];
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const rowHover = isDark ? "#2D3748" : "#F8FAFC";
  const primaryColor = isDark ? "#60A5FA" : "#025395";

  const getStatusColor = (status: OrderData["status"]) => {
    const colors: Record<OrderData["status"], string> = {
      SHIPPED: isDark ? "#4ADE80" : "#16A34A",
      PROCESSING: isDark ? "#60A5FA" : "#025395",
      "ON HOLD": isDark ? "#FBBF24" : "#CA8A04",
      DELIVERED: isDark ? "#34D399" : "#059669",
      PENDING: isDark ? "#F87171" : "#DC2626",
    };
    return colors[status] || colors.PENDING;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div
      className="rounded-xl border p-6 shadow-sm"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>
          Recent Orders
        </h3>
        <Link
          href="/admin/orders"
          className="text-xs font-medium hover:underline transition-colors"
          style={{ color: primaryColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = isDark ? "#3B82F6" : "#01447A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = primaryColor;
          }}
        >
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: cardBorder }}>
              <th
                className="text-left py-2.5 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                Order ID
              </th>
              <th
                className="text-left py-2.5 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                Institution
              </th>
              <th
                className="text-left py-2.5 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                Date
              </th>
              <th
                className="text-right py-2.5 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                Amount
              </th>
              <th
                className="text-right py-2.5 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b transition-colors duration-200"
                style={{ borderColor: cardBorder }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = rowHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <td className="py-3 font-medium" style={{ color: textPrimary }}>
                  {order.id}
                </td>
                <td style={{ color: textSecondary }}>{order.institution}</td>
                <td style={{ color: textSecondary }}>{order.date}</td>
                <td
                  className="text-right font-medium"
                  style={{ color: textPrimary }}
                >
                  {formatCurrency(order.amount)}
                </td>
                <td className="text-right">
                  <span
                    className="px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{
                      color: getStatusColor(order.status),
                      backgroundColor: isDark
                        ? `${getStatusColor(order.status)}15`
                        : `${getStatusColor(order.status)}10`,
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
