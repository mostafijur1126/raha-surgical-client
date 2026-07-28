"use client";

import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const Logo = () => {
  const { isDark } = useMountedTheme();

  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const textColor = isDark ? "#F1F5F9" : "#0F172A";

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <FaHeartbeat
        className="w-7 h-7 transition-transform group-hover:scale-105"
        style={{ color: primaryColor }}
      />
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color: textColor }}
      >
        RAHA <span style={{ color: primaryColor }}>Surgical</span>
      </span>
    </Link>
  );
};

export default Logo;
