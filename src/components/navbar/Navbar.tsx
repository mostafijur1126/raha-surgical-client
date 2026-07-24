"use client";

import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
          isScrolled
            ? "shadow-md border-b border-slate-200/50"
            : "border-b border-transparent"
        }`}
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

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6 text-slate-700" />
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

      <div className="h-[calc(4rem+48px)] md:h-[calc(5rem+48px)]" />
    </>
  );
};

export default Navbar;
