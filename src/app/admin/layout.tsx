"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminNavbar from "@/components/admin/AdminNavbar";
import DashboardSidebar from "@/components/admin/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auth pages (login, signup) should not have sidebar
  const isAuthPage =
    pathname === "/admin/login" || pathname === "/admin/signup";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <section className="flex min-h-screen">
      {/* Sidebar - desktop always visible, mobile as drawer */}
      <DashboardSidebar
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <AdminNavbar onMenuClick={toggleMobileSidebar} />
        <main className="flex-1 overflow-y-auto ">{children}</main>
        <AdminFooter />
      </div>
    </section>
  );
}
