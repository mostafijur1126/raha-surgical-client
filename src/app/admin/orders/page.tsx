"use client";

import { useState, useEffect, useCallback } from "react";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { getOrders, Order } from "@/lib/api/orders";
import OrdersSearchBar from "@/components/admin/orders/OrdersSearchBar";
import OrdersFilterTabs from "@/components/admin/orders/OrdersFilterTabs";
import RevenueCard from "@/components/admin/orders/RevenueCard";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrdersPagination from "@/components/admin/orders/OrdersPagination";
import { updateOrderStatus } from "@/lib/action/product";

const ITEMS_PER_PAGE = 10;

export default function OrdersPage() {
  const { isDark } = useMountedTheme();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
    limit: ITEMS_PER_PAGE,
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrders({
        search: searchQuery,
        status: statusFilter === "all" ? "" : statusFilter,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      if (response.success) {
        setOrders(response.data);
        setPagination(response.pagination);

        // Calculate total revenue from all orders (not just current page)
        // For simplicity, we'll fetch all orders for revenue and counts
        // In a real app, you'd have an aggregate endpoint for this
        const allOrdersResponse = await getOrders({
          search: searchQuery,
          status: statusFilter === "all" ? "" : statusFilter,
          page: 1,
          limit: 1000, // Get all for stats
        });

        if (allOrdersResponse.success) {
          const allOrders = allOrdersResponse.data;
          const revenue = allOrders.reduce(
            (sum, o) => sum + (o.subtotal || 0),
            0,
          );
          setTotalRevenue(revenue);

          const counts = {
            all: allOrders.length,
            pending: allOrders.filter((o) => o.status === "pending").length,
            shipped: allOrders.filter((o) => o.status === "shipped").length,
            delivered: allOrders.filter((o) => o.status === "delivered").length,
            cancelled: allOrders.filter((o) => o.status === "cancelled").length,
          };
          setStatusCounts(counts);
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = () => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      if (response.success) {
        // Refresh the orders list
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // const handleExport = () => {
  //   // Simple CSV export
  //   const headers = [
  //     "Order ID",
  //     "Customer",
  //     "Facility",
  //     "Products",
  //     "Order Date",
  //     "Status",
  //     "Total",
  //   ];
  //   const rows = orders.map((order) => [
  //     order._id.slice(-6).toUpperCase(),
  //     order.customer.fullName,
  //     order.customer.streetAddress,
  //     order.product.name,
  //     new Date(order.createdAt).toLocaleDateString(),
  //     order.status,
  //     `$${order.subtotal.toFixed(2)}`,
  //   ]);

  //   const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
  //     "\n",
  //   );
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // };

  return (
    <div className="space-y-6 px-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>
          Order Management
        </h1>
        <p className="text-sm" style={{ color: textSecondary }}>
          Review and process surgical equipment orders across clinical
          facilities.
        </p>
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <OrdersSearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />
        <OrdersFilterTabs
          activeTab={statusFilter}
          onTabChange={(tab) => {
            setStatusFilter(tab);
            setCurrentPage(1);
          }}
          counts={statusCounts}
        />
        {/* <ExportButton onClick={handleExport} /> */}
      </div>

      {/* Revenue Card */}
      <RevenueCard totalRevenue={totalRevenue} monthToDate />

      {/* Orders Table */}
      {loading ? (
        <div className="py-12 text-center" style={{ color: textSecondary }}>
          Loading orders...
        </div>
      ) : (
        <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
      )}

      {/* Pagination */}
      {!loading && orders.length > 0 && (
        <OrdersPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          limit={pagination.limit}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
