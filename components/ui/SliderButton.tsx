"use client";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

interface SliderButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export const SliderButton = ({ direction, onClick }: SliderButtonProps) => {
  const isLeft = direction === "left";

  const baseClasses = `
    absolute top-1/2 -translate-y-1/2 z-40 
    h-24 w-11 
    /* Colores base y Glassmorphism */
    bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl
    border-zinc-200 dark:border-zinc-800
    shadow-sm transition-all duration-300 ease-out
    
    /* Estado Hover: Fondo más sólido y sombra */
    hover:bg-white/90 dark:hover:bg-zinc-800/90
    hover:shadow-xl hover:w-12
    
    /* Estado Active: Efecto de pulsación al hacer clic */
    active:scale-90 active:bg-zinc-100 dark:active:bg-zinc-700
    
    flex items-center justify-center group/btn
    hidden md:flex
  `;

  const directionClasses = isLeft
    ? "left-0 border-y border-r rounded-r-2xl -translate-x-full group-hover/container:translate-x-0 group-hover/container:opacity-100 opacity-0"
    : "right-0 border-y border-l rounded-l-2xl translate-x-full group-hover/container:translate-x-0 group-hover/container:opacity-100 opacity-0";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${directionClasses}`}
      aria-label={isLeft ? "Anterior" : "Siguiente"}
    >
      {isLeft ? (
        <HiOutlineChevronLeft className="size-7 text-zinc-400 group-hover/btn:text-[#4A3728] dark:group-hover/btn:text-zinc-100 transition-colors" />
      ) : (
        <HiOutlineChevronRight className="size-7 text-zinc-400 group-hover/btn:text-[#4A3728] dark:group-hover/btn:text-zinc-100 transition-colors" />
      )}
    </button>
  );
};
