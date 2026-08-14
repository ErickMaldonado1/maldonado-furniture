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
      <Search
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused || query ? "" : currentPlaceholder}
        aria-label="Buscar productos"
        className={`w-full border-b py-2.5 pl-12 pr-4 focus:outline-none transition-all -wide text-lg font-light ${
          !showSolidNavbar
            ? "bg-transparent border-white/20 text-white placeholder:text-white/90 focus:border-white/80"
            : "bg-transparent border-zinc-400 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-[#4A3728] placeholder:text-zinc-400"
        }`}
      />
    </form>
  );
};

export default SearchBar;
