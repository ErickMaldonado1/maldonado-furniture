"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icons } from "@/utils/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  showSolidNavbar: boolean;
  onSearchResolved?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showSolidNavbar,
  onSearchResolved,
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/productos?q=${encodeURIComponent(query.trim())}`);
      if (onSearchResolved) onSearchResolved();
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-xl relative group">
      <Icons.Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
          !showSolidNavbar
            ? "text-white/40 group-focus-within:text-white"
            : "text-zinc-400 dark:text-zinc-500 group-focus-within:text-[#4A3728]"
        }`}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Encuentra tu mueble ideal..."
        className={`w-full border-b py-2.5 pl-12 pr-4 focus:outline-none transition-all text-sm font-medium ${
          !showSolidNavbar
            ? "bg-transparent border-white/20 text-white placeholder:text-white/40 focus:border-white/60"
            : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[#4A3728] placeholder:text-zinc-400"
        }`}
      />
    </form>
  );
};

export default SearchBar;
