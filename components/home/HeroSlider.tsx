"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { slides } from "@/utils/SlidesHero";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "@/utils/icons/navigation";
import { AnimatePresence, motion } from "framer-motion";

const getOptimizedHeroImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto:good,w_1200/");
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[80vh] md:h-[85vh] min-h-125 w-full overflow-hidden bg-black dark:bg-[#0a0a0a] transition-colors duration-700">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <Image
              src={getOptimizedHeroImage(slides[current].image)}
              alt={slides[current].title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="relative h-full w-full max-w-360 mx-auto px-6 lg:px-12 flex flex-col justify-center items-start text-white pt-20 md:pt-24">
            <div className="max-w-3xl overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="inline-flex mb-6 label-premium text-white! bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20"
              >
                {slides[current].tag}
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 md:mb-6 tracking-tight leading-tight uppercase text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              >
                {slides[current].title}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-sm md:text-base lg:text-[17px] opacity-100 max-w-xl font-normal leading-relaxed mb-10 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              >
                {slides[current].description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Link
                href={slides[current].link}
                aria-label={`Ver colección de ${slides[current].title}`}
                className="inline-flex items-center gap-4 px-8 py-4 text-[13px] font-medium tracking-[0.15em] uppercase text-white bg-transparent border border-white/30 hover:bg-white hover:text-black transition-all duration-500 group"
              >
                Ver colección
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-20 pointer-events-none">
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex items-end justify-between pointer-events-auto">
          <div className="flex items-center gap-6">
            <span className="text-white/60 text-sm font-medium tracking-[0.2em] hidden sm:inline">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className="relative h-11 w-auto flex items-center justify-center group"
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                >
                  <div
                    className={`h-px transition-all duration-700 ${
                      idx === current
                        ? "w-12 bg-white"
                        : "w-6 bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                  <span className="absolute inset-0 -inset-y-4" />
                </button>
              ))}
            </div>
            <span className="text-white/60 text-sm font-medium tracking-[0.2em] hidden sm:inline">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex gap-4">
            {[
              {
                icon: <ChevronLeft className="w-5 h-5" />,
                onClick: prevSlide,
                label: "Anterior",
              },
              {
                icon: <ChevronRight className="w-5 h-5" />,
                onClick: nextSlide,
                label: "Siguiente",
              },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                aria-label={btn.label}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 
                  bg-transparent
                  flex items-center justify-center 
                  text-white 
                  hover:bg-white hover:text-black
                  transition-all duration-500 group"
              >
                <div className="transition-transform duration-500 group-hover:scale-110">
                  {btn.icon}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
