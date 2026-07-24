"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import MegaMenu from "./MegaMenu";

const NavLinks = () => {
  const pathname = usePathname();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "#", hasMega: true },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="hidden lg:flex items-center gap-1 ml-6">
      {links.map((link) => {
        const isActive = pathname === link.href;
        if (link.hasMega) {
          return (
            <div
              key={link.label}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-0.5 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {link.label}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <MegaMenu
                isOpen={isMegaOpen}
                onClose={() => setIsMegaOpen(false)}
              />
            </div>
          );
        }
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              isActive
                ? "text-blue-700 bg-blue-50"
                : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
