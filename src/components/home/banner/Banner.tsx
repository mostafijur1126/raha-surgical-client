"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const Banner = () => {
  const { isDark } = useMountedTheme();

  // Light and dark mode images
  const lightImage = "/images/banner-light.png";
  const darkImage = "/images/banner-dark.png";

  const currentImage = isDark ? darkImage : lightImage;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full min-h-[300px] h-[30vh] md:h-[500px] lg:h-[80vh] font-sans">
        {/* Background Image – Full width & height */}
        <Image
          src={currentImage}
          alt="RAHA Surgical Banner"
          fill
          className="object-cover transition-opacity duration-500"
          priority
          sizes="100vw"
        />

        {/* Dark overlay for dark mode */}
        {isDark && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        )}

        {/* Subtle gradient overlay (always visible) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />

        {/* Content - centered vertically */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-center md:text-left">
              {/* Badge - slightly smaller on mobile */}
              <span
                className="inline-block px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-3 sm:mb-4"
                style={{
                  backgroundColor: isDark
                    ? "rgba(96,165,250,0.2)"
                    : "rgba(2,83,149,0.1)",
                  color: isDark ? "#60A5FA" : "#025395",
                }}
              >
                Trusted Surgical Equipment
              </span>

              {/* Heading – responsive sizes */}
              <h1
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 sm:mb-4"
                style={{
                  color: isDark ? "#F1F5F9" : "#0F172A",
                  textShadow: isDark
                    ? "0 2px 20px rgba(0,0,0,0.5)"
                    : "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                Precision Instruments for{" "}
                <span
                  className="relative"
                  style={{ color: isDark ? "#60A5FA" : "#025395" }}
                >
                  Life-Saving Care
                </span>
              </h1>

              {/* Description – shorter text on mobile */}
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg max-w-lg mb-4 sm:mb-6"
                style={{
                  color: isDark ? "#E2E8F0" : "#334155",
                  textShadow: isDark
                    ? "0 1px 10px rgba(0,0,0,0.5)"
                    : "0 1px 10px rgba(0,0,0,0.05)",
                }}
              >
                Discover our premium range of surgical equipment designed with
                clinical precision and unwavering reliability.
              </p>

              {/* CTA Buttons – stack on very small screens */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4">
                {isDark ? (
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border-2 hover:scale-105"
                    style={{
                      borderColor: isDark ? "#60A5FA" : "#025395",
                      color: isDark ? "#60A5FA" : "#025395",
                      backgroundColor: isDark
                        ? "rgba(96,165,250,0.1)"
                        : "rgba(2,83,149,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "rgba(96,165,250,0.2)"
                        : "rgba(2,83,149,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "rgba(96,165,250,0.1)"
                        : "rgba(2,83,149,0.05)";
                    }}
                  >
                    Explore Products
                  </Link>
                ) : (
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: isDark ? "#60A5FA" : "#025395",
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "#3B82F6"
                        : "#01447A";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "#60A5FA"
                        : "#025395";
                    }}
                  >
                    Shop Now
                    <MdKeyboardArrowRight className="text-xl sm:text-2xl" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
