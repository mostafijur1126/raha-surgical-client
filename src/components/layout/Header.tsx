"use client";

import Link from "next/link";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import ThemeToggle from "../theme-toggle/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-dark/80 border-b border-border dark:border-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Surgi<span className="text-secondary">Store</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search instruments..."
              className="w-full px-4 py-2 rounded-xl border border-border bg-background dark:bg-dark-lighter dark:border-dark-lighter focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="p-2 rounded-full hover:bg-background dark:hover:bg-dark-lighter transition-colors">
            <FiUser className="w-5 h-5 text-heading dark:text-white" />
          </button>
          <button className="p-2 rounded-full hover:bg-background dark:hover:bg-dark-lighter transition-colors relative">
            <FiShoppingCart className="w-5 h-5 text-heading dark:text-white" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
