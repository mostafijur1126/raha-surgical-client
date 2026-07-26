"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  badge?: string;
}

const defaultFaqs: FAQ[] = [
  {
    id: 1,
    question: "What are your regulatory standards?",
    answer:
      "All RAHA Surgical equipment meets FDA Class II and Class III standards, and we maintain full ISO 13485 certification across our logistics chain.",
  },
  {
    id: 2,
    question: "Is 24/7 technical support available?",
    answer:
      "Emergency surgical support is available 24/7 for advice and support. Please use the priority hotline provided in your partnership agreement.",
  },
  {
    id: 3,
    question: "How do you handle bulk facility orders?",
    answer:
      "We offer dedicated procurement agents for health systems. Please select 'Clinical Facility' in the contact form to be routed to a specialist.",
  },
  {
    id: 4,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we serve clinics in 45 countries. International documentation and customs clearance are handled by our global logistics team.",
  },
];

const FAQSection = ({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
  badge = "Support Center",
}: FAQSectionProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span
          className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full"
          style={{
            backgroundColor: isDark
              ? "rgba(96,165,250,0.15)"
              : "rgba(2,83,149,0.08)",
            color: primaryColor,
          }}
        >
          {badge}
        </span>
        <h2
          className="text-2xl md:text-3xl font-bold mt-3"
          style={{ color: textPrimary }}
        >
          {title}
        </h2>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-xl border overflow-hidden transition-all duration-200"
            style={{
              backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
              borderColor: cardBorder,
            }}
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors duration-200"
              style={{
                backgroundColor: isDark ? "#0F172A" : "#F8FAFC",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? "#1E293B"
                  : "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? "#0F172A"
                  : "#F8FAFC";
              }}
            >
              <span
                className="text-sm font-medium pr-4"
                style={{ color: textPrimary }}
              >
                {faq.question}
              </span>
              <FaChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                  openId === faq.id ? "rotate-180" : ""
                }`}
                style={{ color: textMuted }}
              />
            </button>
            <AnimatePresence>
              {openId === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 pb-4 text-sm leading-relaxed"
                    style={{ color: textSecondary }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
