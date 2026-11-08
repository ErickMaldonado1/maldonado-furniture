"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { slides, SlideData } from "@/utils/SlidesHero";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "@/utils/icons/navigation";
import { Whatsapp } from "@/utils/icons/social";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

const getOptimizedHeroImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto:good,w_1400/");
};

const getOptimizedThumbImage = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto:good,w_120/");
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlideIndex = (current + 1) % slides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const handleWhatsAppQuote = (slide: SlideData) => {
    const phone = "593959504842";
    const text =
      slide.whatsappText ||
      `Hola Muebles Maldonado, vi el banner de "${slide.title}" en su web y deseo cotizar un diseño similar para mi espacio.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label="Galería principal de colecciones"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[82vh] md:h-[88vh] min-h-[580px] max-h-[920px] w-full overflow-hidden bg-black dark:bg-[#0a0a0a] transition-colors duration-700 select-none"
      >
        <AnimatePresence initial={false}>
          <m.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <Image
                src={getOptimizedHeroImage(slides[current].image)}
                alt={slides[current].title}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1600px"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white pt-20 sm:pt-24 md:pt-28 pb-20">
              <div className="max-w-2xl overflow-hidden">
                <m.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4B896] bg-black/45 border border-[#D4B896]/30 backdrop-blur-md rounded-full shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4B896]" />
                    {slides[current].tag}
                  </span>
                </m.div>
              </div>

              <div className="max-w-3xl overflow-hidden">
                <m.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-tight uppercase text-white mb-4 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
                >
                  {slides[current].title}
                </m.h1>
              </div>

              <div className="max-w-xl overflow-hidden">
                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-zinc-200/95 mb-7 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                >
                  {slides[current].description}
                </m.p>
              </div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link
                  href={slides[current].link}
                  aria-label={`Explorar colección de ${slides[current].title}`}
                  className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-transparent border border-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 cursor-pointer backdrop-blur-xs"
                >
                  <span>Ver colección</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote(slides[current])}
                  title={`Cotizar ${slides[current].title} por WhatsApp`}
                  aria-label={`Cotizar ${slides[current].title} por WhatsApp`}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-md group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                >
                  <Whatsapp
                    className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>Cotizar a Medida</span>
                </button>
              </m.div>
            </div>
          </m.div>
        </AnimatePresence>

        <div className="hidden" aria-hidden="true">
          <Image
            src={getOptimizedHeroImage(slides[nextSlideIndex].image)}
            alt="Próxima diapositiva"
            width={1400}
            height={900}
            priority
          />
        </div>

        <div className="absolute inset-x-0 bottom-6 md:bottom-10 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end pointer-events-auto">
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={nextSlide}
                aria-label={`Ver siguiente colección: ${slides[nextSlideIndex].title}`}
                className="group relative flex items-center gap-3 p-1.5 sm:pr-4 rounded-2xl bg-black/45 hover:bg-black/75 border border-white/20 hover:border-white/40 backdrop-blur-md text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 shadow-xl overflow-hidden"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-xs">
                  <Image
                    src={getOptimizedThumbImage(slides[nextSlideIndex].image)}
                    alt={slides[nextSlideIndex].title}
                    fill
                    sizes="44px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="text-left hidden sm:block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D4B896] block leading-tight">
                    Siguiente:
                  </span>
                  <span className="text-xs font-semibold text-white tracking-wide block truncate max-w-[120px] sm:max-w-[170px] leading-tight group-hover:text-white transition-colors">
                    {slides[nextSlideIndex].title}
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-0.5" />

                <m.div
                  key={current}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused ? 0 : 1 }}
                  transition={{ duration: 7, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#D4B896] via-white to-[#D4B896]/60 pointer-events-none"
                />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Diapositiva anterior"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-black/45 hover:bg-white hover:text-black hover:border-white backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 shadow-lg group"
                >
                  <ChevronLeft
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Diapositiva siguiente"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-black/45 hover:bg-white hover:text-black hover:border-white backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 shadow-lg group"
                >
                  <ChevronRight
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default HeroSlider;
