"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut, FiUserCheck, FiChevronDown } from "react-icons/fi";

const ProfileDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Login/Register button (when not logged in)
  if (!isLoggedIn) {
    return (
      <button
        onClick={() => console.log("Navigate to login")}
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
      >
        Login / Register
      </button>
    );
  }

  // Logged-in profile icon with dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
        aria-label="Profile menu"
      >
        <FiUser className="w-5 h-5 text-slate-700" />
        <FiChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50"
          >
            <button
              onClick={() => {
                setIsOpen(false);
                console.log("Navigate to profile");
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <FiUserCheck className="w-4 h-4" />
              My Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLoggedIn(false);
                console.log("Logout");
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
