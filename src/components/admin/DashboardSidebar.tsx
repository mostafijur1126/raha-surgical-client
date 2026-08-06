"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaShoppingCart,
  FaBoxes,
  FaUsers,
  FaSignOutAlt,
  FaHeartbeat,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const DashboardSidebar = ({
  isMobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) => {
  const { isDark } = useMountedTheme();
  const pathname = usePathname();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const activeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const activeColor = isDark ? "#60A5FA" : "#025395";
  const hoverBg = isDark ? "#1E293B" : "#F8FAFC";

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: FaHome },
    { label: "Orders", href: "/admin/orders", icon: FaShoppingCart },
    { label: "Inventory", href: "/admin/inventory", icon: FaBoxes },
    {
      label: "Add Products",
      href: "/admin/add-products",
      icon: MdOutlineInventory2,
    },
    // { label: "Users", href: "/admin/users", icon: FaUsers },
  ];

  // Sidebar content shared between desktop and mobile
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div
        className="p-6 border-b flex-shrink-0"
        style={{ borderColor: borderColor }}
      >
        <Link href="/" className="flex items-center gap-2">
          <FaHeartbeat className="w-6 h-6" style={{ color: activeColor }} />
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: textPrimary }}
          >
            RAHA <span style={{ color: activeColor }}>Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: isActive ? activeBg : "transparent",
                color: isActive ? activeColor : textSecondary,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = hoverBg;
                  e.currentTarget.style.color = textPrimary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = textSecondary;
                }
              }}
              onClick={onMobileClose}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div
        className="p-4 border-t flex-shrink-0"
        style={{ borderColor: borderColor }}
      >
        <button
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-all duration-200"
          style={{ color: textMuted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.color = textPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = textMuted;
          }}
          onClick={() => console.log("Logout")}
        >
          <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - visible on lg+ */}
      <aside
        className="hidden lg:flex lg:flex-col w-64 h-screen sticky top-0 border-r flex-shrink-0 transition-colors duration-300"
        style={{
          backgroundColor: bg,
          borderColor: borderColor,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - slide-in drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={onMobileClose}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 z-50 lg:hidden w-4/5 max-w-sm h-full flex flex-col shadow-xl"
              style={{ backgroundColor: bg }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onMobileClose}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label="Close sidebar"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
