"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaShoppingCart,
  FaBoxes,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaHeartbeat,
} from "react-icons/fa";

const DashboardSidebar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
    { label: "Products", href: "/admin/products", icon: FaBoxes },
    { label: "Users", href: "/admin/users", icon: FaUsers },
    { label: "Settings", href: "/admin/settings", icon: FaCog },
  ];

  return (
    <aside
      className="w-64 h-screen sticky top-0 border-r flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: bg,
        borderColor: borderColor,
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: borderColor }}>
        <Link href="/admin/dashboard" className="flex items-center gap-2">
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
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t" style={{ borderColor: borderColor }}>
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
    </aside>
  );
};

export default DashboardSidebar;
