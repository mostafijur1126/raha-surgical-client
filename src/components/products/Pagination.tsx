"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { isDark } = useMountedTheme();

  // Theme-aware colors
  const primaryColor = isDark ? "#60A5FA" : "#025395";
  const primaryHover = isDark ? "#3B82F6" : "#01447A";
  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const hoverBg = isDark ? "#2D3748" : "#F1F5F9";
  const disabledOpacity = "0.5";

  const pages = Array.from(
    { length: Math.min(totalPages, 12) },
    (_, i) => i + 1,
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="px-3 py-2 rounded-xl border transition-colors disabled:cursor-not-allowed"
        style={{
          backgroundColor: cardBg,
          borderColor: cardBorder,
          color: isFirstPage ? textMuted : textSecondary,
          opacity: isFirstPage ? disabledOpacity : 1,
        }}
        onMouseEnter={(e) => {
          if (!isFirstPage) {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.color = textPrimary;
          }
        }}
        onMouseLeave={(e) => {
          if (!isFirstPage) {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.color = textSecondary;
          }
        }}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className="w-10 h-10 rounded-xl transition-colors"
            style={{
              backgroundColor: isActive ? primaryColor : cardBg,
              color: isActive ? "#FFFFFF" : textSecondary,
              border: isActive ? "none" : `1px solid ${cardBorder}`,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = hoverBg;
                e.currentTarget.style.color = textPrimary;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = cardBg;
                e.currentTarget.style.color = textSecondary;
              }
            }}
          >
            {page}
          </button>
        );
      })}

      {/* Ellipsis */}
      {totalPages > 12 && (
        <span
          className="w-10 h-10 flex items-center justify-center text-sm"
          style={{ color: textMuted }}
        >
          …
        </span>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="px-3 py-2 rounded-xl border transition-colors disabled:cursor-not-allowed"
        style={{
          backgroundColor: cardBg,
          borderColor: cardBorder,
          color: isLastPage ? textMuted : textSecondary,
          opacity: isLastPage ? disabledOpacity : 1,
        }}
        onMouseEnter={(e) => {
          if (!isLastPage) {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.color = textPrimary;
          }
        }}
        onMouseLeave={(e) => {
          if (!isLastPage) {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.color = textSecondary;
          }
        }}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
