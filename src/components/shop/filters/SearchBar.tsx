"use client";

import React, { useState, useEffect } from "react";
import { Search } from "@/utils/icons/ui";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  showSolidNavbar: boolean;
  onSearchResolved?: () => void;
}

const placeholders = [
  "Encuentra tu mueble ideal...",
  "Busca camas, muebles de tv, escritorios...",
  "Renueva tu estudio...",
];

const SearchBar: React.FC<SearchBarProps> = ({
  showSolidNavbar,
  onSearchResolved,
}) => {
  const [query, setQuery] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFocused || query) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const fullText = placeholders[phraseIndex];

      if (isDeleting) {
        setCurrentPlaceholder(fullText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentPlaceholder(fullText.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === fullText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % placeholders.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 100);

    return () => clearTimeout(timeoutId);
  }, [isFocused, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/productos?q=${encodeURIComponent(query.trim())}`);
      if (onSearchResolved) onSearchResolved();
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-xl relative group">
      <label htmlFor="header-search-input" className="sr-only">
        Buscar productos
      </label>
      <Search
        aria-hidden="true"
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
          !showSolidNavbar
            ? "text-white/70 group-focus-within:text-white"
            : "text-zinc-600 dark:text-zinc-400 group-focus-within:text-[#4A3728]"
        }`}
      />
      <input
        id="header-search-input"
        name="busqueda"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused || query ? "" : currentPlaceholder}
        aria-label="Buscar productos"
        className={`w-full py-2 pl-11 pr-4 text-xs sm:text-sm font-normal rounded-full border transition-all duration-200 focus:outline-none ${
          !showSolidNavbar
            ? "bg-white/10 border-white/25 text-white placeholder:text-white/80 focus:border-white focus:bg-white/15 focus:ring-2 focus:ring-white/20"
            : "bg-zinc-100/90 dark:bg-zinc-900/90 border-zinc-200/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:bg-white dark:focus:bg-[#141414] focus:ring-2 focus:ring-[#4A3728]/15 dark:focus:ring-[#D4B896]/20"
        }`}
      />
    </form>
  );
};

export default SearchBar;
