"use client";

import {
  statCardsData,
  recentOrdersData,
  topProductsData,
  chartData,
} from "@/data/adminDashboardData";
import AdminStats from "@/components/admin/dashboard/AdminStats";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import TopProducts from "@/components/admin/dashboard/TopProducts";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import { useMountedTheme } from "@/hooks/useMountedTheme";

export default function AdminDashboardPage() {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{ color: textPrimary }}
        >
          Dashboard Overview
        </h1>
        <p className="text-sm" style={{ color: textSecondary }}>
          Real-time performance of RAHA Surgical supplies.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <AdminStats stats={statCardsData} />
      </div>

      {/* Chart + Top Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>
        <div className="lg:col-span-1">
          <TopProducts products={topProductsData} />
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <RecentOrders orders={recentOrdersData} />
      </div>
    </div>
  );
}
