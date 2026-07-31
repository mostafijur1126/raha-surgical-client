"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeartbeat, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useMountedTheme } from "@/hooks/useMountedTheme";
import toast from "react-hot-toast";

export default function AdminSignupPage() {
  const [muted, setMuted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMuted(true);
  }, []);
  const isDark = useMountedTheme();

  if (!muted) {
    return (
      <main
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#d3e2ff" }}
      >
        <div className="w-full max-w-md">
          <div className=" flex flex-col items-center gap-4">
            <svg
              width="180"
              height="56"
              viewBox="0 0 180 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="0,28 40,28 52,10 64,46 76,4 88,28 180,28"
                fill="none"
                stroke="#025395"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "raha-ecg-draw 1.6s ease-in-out infinite",
                }}
              />
            </svg>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#64748B" }}
            >
              Verifying secure session
            </span>
          </div>
        </div>
        <style>{`
          @keyframes raha-ecg-draw {
            0% { stroke-dashoffset: 1; opacity: 0.3; }
            45% { stroke-dashoffset: 0; opacity: 1; }
            55% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: -1; opacity: 0.3; }
          }
        `}</style>
      </main>
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        image: profilePhoto,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Failed to create your account.");
        return;
      }

      if (data) {
        toast.success(
          "Account created successfully! Welcome to RAHA Surgical.",
        );
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Theme-aware colors
  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const inputBg = isDark ? "#0F172A" : "#F8FAFC";
  const inputBorder = isDark ? "#334155" : "#E2E8F0";
  const sectionBg = isDark ? "#0F172A" : "#d3e2ff";
  const badgeBg = isDark ? "rgba(96,165,250,0.15)" : "rgba(2,83,149,0.08)";
  const badgeText = isDark ? "#60A5FA" : "#025395";

  return (
    <main
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl shadow-xl border p-8 md:p-10 transition-colors duration-300"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
          }}
        >
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaHeartbeat
                className="w-8 h-8"
                style={{ color: primaryColor }}
              />
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ color: textPrimary }}
              >
                RAHA <span style={{ color: primaryColor }}>Surgical</span>
              </span>
            </div>
            <h2
              className="text-lg font-semibold mt-1"
              style={{ color: textPrimary }}
            >
              Join RAHA Surgical
            </h2>
            <p className="text-sm mt-0.5" style={{ color: textSecondary }}>
              Access professional surgical inventory and clinical resources.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: textSecondary }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Jane Doe"
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

            {/* Profile Photo URL */}
            <div>
              <label
                htmlFor="profilePhoto"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: textSecondary }}
              >
                Profile Photo URL
              </label>
              <input
                type="url"
                id="profilePhoto"
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                placeholder="https://image-placeholder.com/profile.jpg"
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
              />
            </div>

            {/* Clinical Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: textSecondary }}
              >
                Clinical Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@medical-center.org"
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: textSecondary }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-2.5 rounded-lg border outline-none transition-all duration-200 pr-10"
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: textMuted }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
              style={{
                backgroundColor: primaryColor,
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: textSecondary }}>
              Already have a clinical account?{" "}
              <Link
                href="/auth/signin"
                className="font-medium hover:underline transition-colors"
                style={{ color: primaryColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = primaryColor;
                }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
