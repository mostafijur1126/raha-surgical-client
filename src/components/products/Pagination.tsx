"use client";

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
  const pages = Array.from(
    { length: Math.min(totalPages, 12) },
    (_, i) => i + 1,
  );

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl border border-border dark:border-dark-lighter bg-card dark:bg-dark-lighter hover:bg-background dark:hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "bg-card dark:bg-dark-lighter border border-border dark:border-dark-lighter hover:bg-background dark:hover:bg-dark"
          }`}
        >
          {page}
        </button>
      ))}
      {totalPages > 12 && <span className="text-muted">…</span>}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl border border-border dark:border-dark-lighter bg-card dark:bg-dark-lighter hover:bg-background dark:hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
