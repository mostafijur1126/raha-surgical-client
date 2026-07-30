"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import Link from "next/link";

const AdminFooter = () => {
  const { isDark } = useMountedTheme();

  const textMuted = isDark ? "#64748B" : "#64748B";
  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E8EEF5";
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="border-t px-4 sm:px-6 py-4 transition-colors duration-300"
      style={{
        backgroundColor: bg,
        borderColor: borderColor,
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <p style={{ color: textMuted }}>
          &copy; {currentYear} RAHA Surgical Equipment. Clinical Excellence.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hover:underline transition-colors"
            style={{ color: textMuted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textMuted;
            }}
          >
            Help Center
          </Link>
          <Link
            href="#"
            className="hover:underline transition-colors"
            style={{ color: textMuted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textMuted;
            }}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="hover:underline transition-colors"
            style={{ color: textMuted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textMuted;
            }}
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
