"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";

import { FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";

const FeaturesSection = () => {
  const { isDark } = useMountedTheme();

  const features = [
    {
      id: 1,
      icon: FaShieldAlt,
      title: "Genuine Equipment",
      description:
        "100% authentic instruments sourced directly from certified ISO-compliant manufacturers.",
    },
    {
      id: 2,
      icon: FaTruck,
      title: "Fast Delivery",
      description:
        "Strategic logistics ensuring critical surgical tools reach your clinic within 24-48 hours.",
    },
    {
      id: 3,
      icon: FaHeadset,
      title: "Clinical Support",
      description:
        "Dedicated product specialists available to assist with technical specifications and compatibility.",
    },
  ];

  // Theme-aware colors
  const bgColor = isDark ? "#0F172A" : "#f0f2ff";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const cardHoverBorder = isDark ? "#60A5FA" : "#025395";
  const headingColor = isDark ? "#F1F5F9" : "#065798";
  const textColor = isDark ? "#94A3B8" : "#475569";
  const iconBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const iconColor = isDark ? "#60A5FA" : "#025395";
  const iconHoverBg = isDark ? "rgba(96,165,250,0.25)" : "rgba(2,83,149,0.15)";
  const cardTitle = isDark ? "#F1F5F9" : "#0F172A";
  const cardDesc = isDark ? "#94A3B8" : "#475569";
  const decorativeLine = isDark ? "rgba(96,165,250,0.3)" : "rgba(2,83,149,0.3)";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const glowBg = isDark
    ? "from-blue-600/10 to-transparent"
    : "from-blue-600/5 to-transparent";

  return (
    <section
      className="py-16 md:py-24 transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-2xl md:text-3xl font-bold text-center"
            style={{ color: textPrimary }}
          >
            Why Surgical Professionals <br className="hidden sm:block" />
            Choose <span style={{ color: iconColor }}>RAHA Surgical</span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: textColor }}
          >
            We bridge the gap between manufacturing precision and clinical
            urgency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative rounded-2xl p-8 border transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cardHoverBorder;
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 10px 30px -10px rgba(0,0,0,0.4)"
                    : "0 10px 30px -10px rgba(2,83,149,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = cardBorder;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Subtle background glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-3 sm:mb-5 transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: iconBg,
                      color: iconColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = iconHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = iconBg;
                    }}
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm sm:text-xl font-bold mb-2 sm:mb-3 tracking-tight"
                    style={{ color: cardTitle }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xs sm:text-sm md:text-base leading-relaxed"
                    style={{ color: cardDesc }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 flex justify-center">
          <div
            className="w-24 h-1 rounded-full"
            style={{ backgroundColor: decorativeLine }}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
