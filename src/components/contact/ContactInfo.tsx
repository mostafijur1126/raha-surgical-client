"use client";

import { useTheme } from "next-themes";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";

const ContactInfo = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";

  const contactItems = [
    {
      icon: FaEnvelope,
      title: "Email Support",
      detail: "clinical@rahasurgical.com",
      subDetail: "Average response: 2 hours",
    },
    {
      icon: FaPhone,
      title: "Direct Line",
      detail: "+1 (800) 555-SURG",
      subDetail: "Mon–Fri: 7:00 AM – 8:00 PM EST",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Headquarters",
      detail: "8800 Surgical Parkway",
      subDetail: "Precision District, Boston, MA 02108",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                style={{
                  backgroundColor: isDark
                    ? "rgba(96,165,250,0.15)"
                    : "rgba(2,83,149,0.08)",
                  color: primaryColor,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: textSecondary }}
              >
                {item.title}
              </h3>
              <p className="font-medium" style={{ color: textPrimary }}>
                {item.detail}
              </p>
              <p className="text-xs mt-1" style={{ color: textMuted }}>
                {item.subDetail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Map + Social Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div
          className="rounded-2xl shadow-sm border overflow-hidden"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
          }}
        >
          <div className="h-64 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23531.682520645517!2d-71.073496929434!3d42.34935058600899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a3a1b2f2b47%3A0x6f3c99f8b2f5e1c9!2sBoston%2C%20MA!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RAHA Surgical Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div
            className="p-4 text-center border-t"
            style={{ borderColor: cardBorder }}
          >
            <p className="text-sm" style={{ color: textSecondary }}>
              <span className="font-semibold" style={{ color: textPrimary }}>
                RAHA Surgical Headquarters
              </span>{" "}
              — 8800 Surgical Parkway, Precision District, Boston, MA 02108
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div
          className="rounded-2xl shadow-sm border p-6 text-center flex flex-col items-center justify-center"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
          }}
        >
          <h3
            className="text-sm font-semibold mb-4"
            style={{ color: textSecondary }}
          >
            Connect With Us
          </h3>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="p-2.5 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-full bg-[#E4405F] text-white hover:scale-110 transition-transform duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-full bg-[#000000] text-white hover:scale-110 transition-transform duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-full bg-[#000000] text-white hover:scale-110 transition-transform duration-300"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
