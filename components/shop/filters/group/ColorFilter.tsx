"use client";

import { useState, useMemo } from "react";
import { COLOR_MAP, COLOR_TEXTURES } from "@/utils/filter-textures";
import { ChevronDown, ChevronUp } from "@/utils/icons/navigation";

interface ColorFilterProps {
  colors: string[];
  selectedColors: string[];
  onToggle: (color: string) => void;
}

export const ColorFilter = ({
  colors,
  selectedColors,
  onToggle,
}: ColorFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (colors.length === 0) return null;

  const INITIAL_COUNT = 9;
  const displayedColors = isExpanded ? colors : colors.slice(0, INITIAL_COUNT);
  const hasMore = colors.length > INITIAL_COUNT;

  const textureMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const brand in COLOR_TEXTURES) {
      Object.entries(COLOR_TEXTURES[brand]).forEach(([key, value]) => {
        map[key.toLowerCase()] = value;
      });
    }
    return map;
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-y-5 gap-x-2 mt-3 justify-items-center">
        {displayedColors.map((color) => {
          const lowerColor = color.toLowerCase().trim();
          const isSelected = selectedColors.includes(color);

          const texture = textureMap[lowerColor] || null;

          const hexKey = Object.keys(COLOR_MAP).find(
            (k) => k.toLowerCase() === lowerColor,
          );
          const hexColor = hexKey ? COLOR_MAP[hexKey] : "#E4E4E7";

          return (
            <button
              key={color}
              onClick={() => onToggle(color)}
              className="group flex flex-col items-center w-full animate-in fade-in duration-500"
            >
              <div
                className={`
                  relative w-10 h-10 md:w-11 md:h-11 rounded-full border transition-all duration-300 
                  flex items-center justify-center overflow-hidden
                  ${
                    isSelected
                      ? "border-zinc-900 dark:border-white ring-2 ring-[#4A3728]/50 ring-offset-1"
                      : "border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-400"
                  }
                `}
                style={{
                  backgroundColor: hexColor,
                  backgroundImage: texture ? `url(${texture})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        ["blanco", "crema", "beige", "white"].includes(
                          lowerColor,
                        )
                          ? "bg-black"
                          : "bg-white"
                      }`}
                    />
                  </div>
                )}
              </div>

              <span
                className={`
                  mt-1.5 text-[10px] md:text-[9px] font-medium normal-case sm:uppercase sm:tracking-wider
                  whitespace-normal text-center
                  ${isSelected ? "text-zinc-900 dark:text-white font-bold" : "text-zinc-400"}
                `}
              >
                {color}
              </span>
            </button>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex items-center justify-center gap-1.5 py-4 mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
        >
          <span className="border-b border-transparent group-hover:border-zinc-900 dark:group-hover:border-zinc-100 transition-all">
            {isExpanded
              ? "Reducir"
              : `Ver más (${colors.length - INITIAL_COUNT})`}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
          )}
        </button>
      )}
    </div>
  );
};
