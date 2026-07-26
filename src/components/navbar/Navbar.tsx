"use client";

import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../theme-toggle/ThemeToggle";

const Navbar = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Determine dark mode using resolvedTheme (avoids hydration mismatch)
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute background color based on theme and scroll state
  const getBgColor = () => {
    if (!mounted) return isDark ? "#0F172A" : "#FFFFFF";

    if (isScrolled) {
      return isDark ? "#0F172A" : "#FFFFFF";
    } else {
      // Use valid rgba values – no invalid CSS like #0F172A/95
      return isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)";
    }
  };

  const borderColor = isDark ? "#334155" : "#E2E8F0";
  const shadow = isDark
    ? "0 4px 6px -1px rgba(0,0,0,0.3)"
    : "0 4px 6px -1px rgba(0,0,0,0.1)";

  // Force re-render when theme changes by using a key
  const bgColor = getBgColor();

  return (
    <>
      <header
        key={theme} // Forces re-render on theme change
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 border-b"
        style={{
          backgroundColor: bgColor,
          borderColor: isScrolled ? borderColor : "transparent",
          boxShadow: isScrolled ? shadow : "none",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex relative items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            <div className="hidden md:flex flex-1 justify-center">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <NavLinks />
              <ThemeToggle />

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full transition-colors"
                style={{
                  color: isDark ? "#E2E8F0" : "#334155",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "#1E293B"
                    : "#F1F5F9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6" />
              </button>

              <ProfileDropdown />
            </div>
          </div>

          <div className="md:hidden py-2 pb-3">
            <SearchBar />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="h-[calc(4rem+48px)] md:h-[calc(5rem)]" />
    </>
  );
};

export default Navbar;
