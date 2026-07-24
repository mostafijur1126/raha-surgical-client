"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex-1 max-w-2xl mx-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search surgical instruments, medical equipment..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 transition-all duration-200 text-slate-800 placeholder:text-slate-400 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
