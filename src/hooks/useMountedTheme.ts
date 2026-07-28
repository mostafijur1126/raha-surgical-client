"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * next-themes ব্যবহার করা প্রতিটা "use client" কম্পোনেন্টে বারবার
 * mounted-guard boilerplate লেখার বদলে এই hook টা ব্যবহার করুন।
 *
 * ব্যবহার:
 *   const { isDark, mounted } = useMountedTheme();
 *   const bg = isDark ? "#0F172A" : "#FFFFFF";
 *
 * mounted === false থাকা অবস্থায় isDark সবসময় false থাকবে,
 * তাই সার্ভার আর ক্লায়েন্টের প্রথম রেন্ডার সবসময় মিলে যাবে —
 * hydration mismatch হওয়ার সুযোগই থাকবে না।
 */
export function useMountedTheme() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return { isDark, mounted, theme, resolvedTheme };
}
