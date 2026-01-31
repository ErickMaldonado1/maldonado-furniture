"use client";

import { ChevronLeft, ChevronRight } from "@/utils/icons/index";

interface SliderButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export const SliderButton = ({ direction, onClick }: SliderButtonProps) => {
  const isLeft = direction === "left";

  const baseClasses = `
    absolute top-1/2 -translate-y-1/2 z-40 h-28 w-10 bg-white/80 dark:bg-black/40 backdrop-blur-md border-zinc-200/50 dark:border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#4A3728] dark:hover:bg-[#4A3728] hover:w-12 hover:shadow-2xl active:scale-95 flex items-center justify-center group/btn hidden md:flex
  `;

  const directionClasses = isLeft
    ? "left-0 border-y border-r rounded-r-3xl -translate-x-full group-hover/left:translate-x-0 group-hover/left:opacity-100 opacity-0"
    : "right-0 border-y border-l rounded-l-3xl translate-x-full group-hover/right:translate-x-0 group-hover/right:opacity-100 opacity-0";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${directionClasses}`}
      aria-label={isLeft ? "Anterior" : "Siguiente"}
    >
      <div className="relative overflow-hidden flex items-center justify-center">
        {isLeft ? (
          <ChevronLeft className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover/btn:text-white transition-all duration-300" />
        ) : (
          <ChevronRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover/btn:text-white transition-all duration-300" />
        )}
      </div>
    </button>
  );
};
