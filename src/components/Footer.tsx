"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaHeartbeat,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import { useMountedTheme } from "@/hooks/useMountedTheme";

const Footer = () => {
  const { isDark } = useMountedTheme();
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show button when scrolled past 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productLinks = [
    { label: "General Surgery", href: "#" },
    { label: "Neurosurgery", href: "#" },
    { label: "Orthopedics", href: "#" },
    { label: "Sterilization Trays", href: "#" },
  ];

  const companyLinks = [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Regulatory Compliance", href: "#" },
    { label: "Support", href: "#" },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://facebook.com/rahasurgical",
      label: "Facebook",
      color: "#1877F2",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/rahasurgical",
      label: "Instagram",
      color: "#E4405F",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/rahasurgical",
      label: "Twitter",
      color: "#000000",
    },
    {
      icon: FaTiktok,
      href: "https://tiktok.com/@rahasurgical",
      label: "TikTok",
      color: "#000000",
    },
  ];

  // Theme-aware colors
  const bgColor = isDark ? "#0F172A" : "#d8e2fb";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#1E293B";
  const textMuted = isDark ? "#64748B" : "#475569";
  const accentColor = isDark ? "#60A5FA" : "#025395";
  const borderColor = isDark ? "#334155" : "#B8C9E8";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const iconBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(2,83,149,0.08)";
  const iconHoverBg = isDark ? "rgba(255,255,255,0.15)" : "rgba(2,83,149,0.15)";
  const socialIconBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(2,83,149,0.08)";

  return (
    <>
      <footer
        className="transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {/* Brand Column */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4 group">
                  <FaHeartbeat
                    className="w-6 h-6 transition-transform group-hover:scale-105"
                    style={{ color: accentColor }}
                  />
                  <span
                    className="text-xl font-bold tracking-tight"
                    style={{ color: textPrimary }}
                  >
                    RAHA <span style={{ color: accentColor }}>Surgical</span>
                  </span>
                </Link>
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: textSecondary }}
                >
                  Global leaders in high-precision surgical instrument
                  procurement and hospital supply chain optimization since 1998.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mt-5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: socialIconBg,
                          color: social.color,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark
                            ? "rgba(255,255,255,0.15)"
                            : "rgba(2,83,149,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = socialIconBg;
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Product Catalog Column */}
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: accentColor }}
                >
                  Product Catalog
                </h3>
                <ul className="space-y-2.5">
                  {productLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: textSecondary }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = accentColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textSecondary;
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: accentColor }}
                >
                  Company
                </h3>
                <ul className="space-y-2.5">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: textSecondary }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = accentColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textSecondary;
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: accentColor }}
                >
                  Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: accentColor }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: textSecondary }}
                    >
                      1200 Innovation Drive
                      <br />
                      Nzipur, Naogaon, Bangladesh
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: accentColor }}
                    />
                    <a
                      href="tel:+1800555SURG"
                      className="text-sm transition-colors duration-200"
                      style={{ color: textSecondary }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textSecondary;
                      }}
                    >
                      +1 (800) 555-SURG
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: accentColor }}
                    />
                    <a
                      href="mailto:info@rahasurgical.com"
                      className="text-sm transition-colors duration-200"
                      style={{ color: textSecondary }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textSecondary;
                      }}
                    >
                      info@rahasurgical.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: borderColor }}
          >
            <p
              className="text-sm text-center sm:text-left"
              style={{ color: textMuted }}
            >
              &copy; {currentYear} RAHA Surgical Equipment. Clinical Excellence.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm transition-colors duration-200"
                style={{ color: textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textMuted;
                }}
              >
                Privacy
              </a>
              <span style={{ color: borderColor }}>|</span>
              <a
                href="#"
                className="text-sm transition-colors duration-200"
                style={{ color: textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textMuted;
                }}
              >
                Terms
              </a>
              <span style={{ color: borderColor }}>|</span>
              <a
                href="#"
                className="text-sm transition-colors duration-200"
                style={{ color: textMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textMuted;
                }}
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            color: isDark ? "#60A5FA" : "#025395",
            boxShadow: isDark
              ? "0 4px 15px rgba(0,0,0,0.3)"
              : "0 4px 15px rgba(2,83,149,0.2)",
            border: isDark ? "1px solid #334155" : "1px solid #E8EEF5",
          }}
          aria-label="Back to top"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.backgroundColor = isDark
              ? "#2D3748"
              : "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = isDark
              ? "#1E293B"
              : "#FFFFFF";
          }}
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
