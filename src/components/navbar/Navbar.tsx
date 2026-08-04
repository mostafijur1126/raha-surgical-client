"use client";

import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import { getCategories } from "@/lib/api/products";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const { isDark } = useMountedTheme();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY < lastScrollY || currentScrollY < 30) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBgColor = () => {
    if (isScrolled) {
      return isDark ? "#0F172A" : "#FFFFFF";
    }
    return isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)";
  };

  const borderColor = isDark ? "#334155" : "#E2E8F0";
  const shadow = isDark
    ? "0 4px 6px -1px rgba(0,0,0,0.3)"
    : "0 4px 6px -1px rgba(0,0,0,0.1)";

  const bgColor = getBgColor();

  return (
    <>
      <header
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
          <div className="flex relative w-full ">
            {/* mobile */}
            <div className="flex lg:hidden w-full items-center justify-between h-16">
              {/* Left */}
              <button onClick={() => setMobileMenuOpen(true)} className="p-2">
                <FiMenu className="w-6 h-6" />
              </button>

              {/* Center */}
              <Logo />

              {/* Right */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <ProfileDropdown />
              </div>
            </div>
            {/* daxtop */}
            <div className="hidden lg:flex w-full items-center justify-between h-20">
              <Logo />

              <div className="flex-1 flex justify-center">
                <SearchBar />
              </div>

              <div className="flex items-center gap-4">
                <NavLinks categories={categories} />
                <ThemeToggle />
                <ProfileDropdown />
              </div>
            </div>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              showSearch
                ? "max-h-20 opacity-100 py-2 pb-3"
                : "max-h-0 opacity-0 py-0"
            }`}
          >
            <SearchBar />
          </div>
        </div>
      </header>

      <MobileMenu
        categories={categories}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="h-[calc(4rem+48px)] md:h-[calc(5rem)]" />
    </>
  );
};

export default Navbar;
