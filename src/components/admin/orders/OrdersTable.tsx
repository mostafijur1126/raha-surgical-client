"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { Order } from "@/lib/api/orders";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrdersTable = ({ orders, onStatusChange }: OrdersTableProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const rowHover = isDark ? "#2D3748" : "#F8FAFC";
  const primary = isDark ? "#60A5FA" : "#025395";

  const [actionDropdownOpen, setActionDropdownOpen] = useState<string | null>(
    null,
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      pending: {
        bg: isDark ? "rgba(251,191,36,0.15)" : "#FEF3C7",
        text: isDark ? "#FBBF24" : "#92400E",
      },
      shipped: {
        bg: isDark ? "rgba(96,165,250,0.15)" : "#DBEAFE",
        text: isDark ? "#60A5FA" : "#1E40AF",
      },
      delivered: {
        bg: isDark ? "rgba(52,211,153,0.15)" : "#D1FAE5",
        text: isDark ? "#34D399" : "#065F46",
      },
      cancelled: {
        bg: isDark ? "rgba(248,113,113,0.15)" : "#FEE2E2",
        text: isDark ? "#F87171" : "#991B1B",
      },
    };
    return colors[status.toLowerCase()] || colors.pending;
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    onStatusChange(orderId, newStatus);
    setActionDropdownOpen(null);
  };

  const getProductSummary = (order: Order) => {
    const name = order.product.name;
    const qty = order.quantity;
    const more =
      order.quantity > 1 ? ` + ${order.quantity - 1} more items` : "";
    return `${name} (${qty}x)${more}`;
  };

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        backgroundColor: cardBg,
        borderColor: borderColor,
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b text-left"
              style={{ borderColor: borderColor }}
            >
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                ORDER ID
              </th>
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                CUSTOMER & FACILITY
              </th>
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                PRODUCTS
              </th>
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                ORDER DATE
              </th>
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: textMuted }}
              >
                STATUS
              </th>
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-right"
                style={{ color: textMuted }}
              >
                TOTAL
              </th>
              <th
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-center"
                style={{ color: textMuted }}
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm"
                  style={{ color: textSecondary }}
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const statusColors = getStatusColor(order.status);
                const isOpen = actionDropdownOpen === order._id;

                return (
                  <tr
                    key={order._id}
                    className="border-b transition-colors duration-200"
                    style={{ borderColor: borderColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = rowHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: textPrimary }}
                    >
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-3">
                      <div style={{ color: textPrimary }}>
                        {order.customer.fullName}
                      </div>
                      <div className="text-xs" style={{ color: textMuted }}>
                        {order.customer.streetAddress}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="truncate max-w-[200px]"
                        style={{ color: textSecondary }}
                      >
                        {getProductSummary(order)}
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: textSecondary }}>
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                        }}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-right font-medium"
                      style={{ color: textPrimary }}
                    >
                      {formatCurrency(order.subtotal)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setActionDropdownOpen(isOpen ? null : order._id)
                          }
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ color: textSecondary }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDark
                              ? "#2D3748"
                              : "#F1F5F9";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                          aria-label="Actions"
                        >
                          <FiMoreHorizontal className="w-5 h-5" />
                        </button>

                        {isOpen && (
                          <div
                            className="absolute right-0 mt-1 w-40 rounded-lg border shadow-lg z-10 py-1"
                            style={{
                              backgroundColor: cardBg,
                              borderColor: borderColor,
                            }}
                          >
                            {[
                              "pending",
                              "shipped",
                              "delivered",
                              "cancelled",
                            ].map((status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  handleStatusChange(order._id, status)
                                }
                                className="w-full text-left px-4 py-2 text-sm transition-colors"
                                style={{ color: textSecondary }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    rowHover;
                                  e.currentTarget.style.color = textPrimary;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.color = textSecondary;
                                }}
                              >
                                Set as{" "}
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
