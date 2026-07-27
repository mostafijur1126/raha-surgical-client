"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  FaHeartbeat,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", { email, password, rememberDevice });
    // TODO: Implement sign in logic
    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      rememberMe: true,
      callbackURL: "/",
    });
    console.log(data, error);
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
              Welcome Back
            </h2>
            <p className="text-sm mt-0.5" style={{ color: textSecondary }}>
              Access your clinical dashboard and orders
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: textSecondary }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.smith@hospital.org"
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
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: textSecondary }}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium hover:underline transition-colors"
                  style={{ color: primaryColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = primaryColor;
                  }}
                >
                  Forgot Password?
                </button>
              </div>
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

            {/* Remember Device */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded border-2 focus:ring-2 focus:ring-offset-0 transition-colors"
                style={{
                  accentColor: primaryColor,
                  borderColor: inputBorder,
                }}
              />
              <label
                htmlFor="remember"
                className="text-sm"
                style={{ color: textSecondary }}
              >
                Remember device for 30 days
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
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
              Sign In
              <FaArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: textSecondary }}>
              New to RAHA Surgical?{" "}
              <Link
                href="/auth/signup"
                className="font-medium hover:underline transition-colors"
                style={{ color: primaryColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = primaryColor;
                }}
              >
                Create Professional Account
              </Link>
            </p>
          </div>

          {/* Encryption Badge */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <FaLock className="w-4 h-4" style={{ color: textMuted }} />
            <span className="text-xs font-medium" style={{ color: textMuted }}>
              SECURE 256-BIT AES ENCRYPTION
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
