"use client";

import { useTheme } from "next-themes";

const ContactHero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";

  return (
    <section className="text-center max-w-3xl mx-auto">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        style={{ color: textPrimary }}
      >
        Connect with <span style={{ color: primaryColor }}>Excellence</span>
      </h1>
      <p
        className="text-base sm:text-lg leading-relaxed"
        style={{ color: textSecondary }}
      >
        Our clinical support specialists are available to assist with surgical
        inventory, regulatory compliance, and customized equipment procurement.
      </p>
    </section>
  );
};

export default ContactHero;
