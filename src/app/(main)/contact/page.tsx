"use client";

import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQSection from "@/components/contact/FAQSection";
import { useTheme } from "next-themes";

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Three background colors (light mode)
  const section1Bg = isDark ? "#0F172A" : "#d3e2ff";
  const section2Bg = isDark ? "#0F172A" : "#faf9ff";
  const section3Bg = isDark ? "#0F172A" : "#e7eeff";

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero + Contact Info */}
      <section
        className="py-12 md:py-16 transition-colors duration-300"
        style={{ backgroundColor: section1Bg }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ContactHero />
            <div className="mt-12">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form */}
      <section
        className="py-12 md:py-16 transition-colors duration-300"
        style={{ backgroundColor: section2Bg }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section
        className="py-12 md:py-16 transition-colors duration-300"
        style={{ backgroundColor: section3Bg }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
    </main>
  );
}
