"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#F8FAFC";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
      // TODO: Send to backend API
    }
  };

  return (
    <div
      className="rounded-2xl shadow-sm border p-6 md:p-8"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>
        Send us a Message
      </h2>
      <p className="text-sm mb-6" style={{ color: textSecondary }}>
        Fill in the form below and our team will get back to you promptly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1.5"
            style={{ color: textSecondary }}
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dr. Sarah Mitchell"
            className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200"
            style={{
              backgroundColor: inputBg,
              borderColor: inputBorder,
              color: textPrimary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = primaryColor;
              e.currentTarget.style.boxShadow = `0 0 0 2px ${
                isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"
              }`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: textSecondary }}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="s.mitchell@hospital.org"
            className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200"
            style={{
              backgroundColor: inputBg,
              borderColor: inputBorder,
              color: textPrimary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = primaryColor;
              e.currentTarget.style.boxShadow = `0 0 0 2px ${
                isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"
              }`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-1.5"
            style={{ color: textSecondary }}
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Equipment inquiry / Regulatory question"
            className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200"
            style={{
              backgroundColor: inputBg,
              borderColor: inputBorder,
              color: textPrimary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = primaryColor;
              e.currentTarget.style.boxShadow = `0 0 0 2px ${
                isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"
              }`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-1.5"
            style={{ color: textSecondary }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Describe your surgical equipment requirements or questions..."
            className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 resize-none"
            style={{
              backgroundColor: inputBg,
              borderColor: inputBorder,
              color: textPrimary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = primaryColor;
              e.currentTarget.style.boxShadow = `0 0 0 2px ${
                isDark ? "rgba(96,165,250,0.2)" : "rgba(2,83,149,0.15)"
              }`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          style={{
            backgroundColor: primaryColor,
            color: "#FFFFFF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = primaryColor;
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
