"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import { authClient } from "@/lib/auth-client";
import { useMountedTheme } from "@/hooks/useMountedTheme";

import { SessionUser } from "@/lib/types";

interface NavLinksProps {
  categories: string[];
}

const NavLinks = ({ categories }: NavLinksProps) => {
  const { isDark } = useMountedTheme();

  const pathname = usePathname();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;

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

  const isAdmin = user?.role === "admin";

  const baseLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", hasMega: true },
    { label: "Contact", href: "/contact" },
  ];

  const links = isAdmin
    ? [...baseLinks, { label: "Dashboard", href: "/admin/dashboard" }]
    : baseLinks;

  const primary = isDark ? "#60A5FA" : "#025395";
  const primaryLight = isDark ? "#1E3A5F" : "#EFF6FF";
  const textDefault = isDark ? "#E2E8F0" : "#334155";
  const textHover = isDark ? "#60A5FA" : "#025395";

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
              <Link
                href={link.href}
                className="flex items-center gap-0.5 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
                style={{
                  color: isActive ? primary : textDefault,
                  backgroundColor: isActive ? primaryLight : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = textHover;
                    e.currentTarget.style.backgroundColor = primaryLight;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = textDefault;
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: isActive ? primary : textDefault }}
                />
              </Link>
              <MegaMenu
                categories={categories}
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
            className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
            style={{
              color: isActive ? primary : textDefault,
              backgroundColor: isActive ? primaryLight : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = textHover;
                e.currentTarget.style.backgroundColor = primaryLight;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = textDefault;
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
