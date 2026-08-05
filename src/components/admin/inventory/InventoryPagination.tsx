"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface InventoryPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const InventoryPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  totalPages,
}: InventoryPaginationProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";
  const hoverBg = isDark ? "#2D3748" : "#F1F5F9";
  const primary = isDark ? "#60A5FA" : "#025395";

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t"
      style={{ borderColor: cardBorder }}
    >
      <p className="text-xs" style={{ color: textMuted }}>
        Showing{" "}
        <span className="font-semibold" style={{ color: textPrimary }}>
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold" style={{ color: textPrimary }}>
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold" style={{ color: textPrimary }}>
          {totalItems}
        </span>{" "}
        products
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
            color: textSecondary,
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1) {
              e.currentTarget.style.backgroundColor = hoverBg;
              e.currentTarget.style.color = textPrimary;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.color = textSecondary;
          }}
          aria-label="Previous page"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor:
                  currentPage === pageNum ? primary : "transparent",
                color: currentPage === pageNum ? "#FFFFFF" : textSecondary,
              }}
              onMouseEnter={(e) => {
                if (currentPage !== pageNum) {
                  e.currentTarget.style.backgroundColor = hoverBg;
                  e.currentTarget.style.color = textPrimary;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== pageNum) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = textSecondary;
                }
              }}
            >
              {pageNum}
            </button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span style={{ color: textMuted }}>…</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
              style={{ color: textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBg;
                e.currentTarget.style.color = textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = textSecondary;
              }}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorder,
            color: textSecondary,
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages) {
              e.currentTarget.style.backgroundColor = hoverBg;
              e.currentTarget.style.color = textPrimary;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = cardBg;
            e.currentTarget.style.color = textSecondary;
          }}
          aria-label="Next page"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InventoryPagination;
