"use client";

import { useState, useEffect, useCallback } from "react";
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

  const nextSlideIndex = (current + 1) % slides.length;

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label="Galería principal de colecciones"
        className="relative h-[82vh] md:h-[88vh] min-h-[580px] max-h-[920px] w-full overflow-hidden bg-black dark:bg-[#0a0a0a] transition-colors duration-700"
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

              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white pt-20 sm:pt-24 md:pt-28 pb-20">
              <div className="max-w-2xl overflow-hidden">
                <m.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4B896] bg-black/45 border border-[#D4B896]/30 backdrop-blur-md rounded-full shadow-xs">
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-light tracking-tight leading-[1.08] uppercase text-white mb-4 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
                >
                  {slides[current].title}
                </m.h1>
              </div>

              <div className="max-w-xl overflow-hidden">
                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="text-sm sm:text-base md:text-[17px] font-normal leading-relaxed text-zinc-200/95 mb-7 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
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
                  className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-wider text-black bg-white hover:bg-[#D4B896] hover:text-black transition-all duration-300 shadow-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 cursor-pointer"
                >
                  <span>Ver colección</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote(slides[current])}
                  title={`Cotizar ${slides[current].title} por WhatsApp`}
                  aria-label={`Cotizar ${slides[current].title} por WhatsApp`}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white bg-[#166534] hover:bg-[#14532d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] transition-all duration-300 shadow-md group cursor-pointer active:scale-95"
                >
                  <Whatsapp
                    className="w-4 h-4 text-white group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>Cotizar a Medida</span>
                </button>
              </m.div>
            </div>
          </m.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-6 md:bottom-10 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between pointer-events-auto">
            <div className="flex items-center gap-3 sm:gap-4 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
              <span className="text-white text-xs sm:text-sm font-bold tracking-[0.2em] font-mono">
                {String(current + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Ir a diapositiva ${idx + 1}`}
                    className="relative h-6 sm:h-7 w-6 sm:w-10 flex items-center justify-center group cursor-pointer"
                  >
                    <div
                      className={`relative h-[3px] rounded-full overflow-hidden transition-all duration-400 ${
                        idx === current
                          ? "w-6 sm:w-10 bg-white/30"
                          : "w-2.5 sm:w-4 bg-white/20 group-hover:w-5 group-hover:bg-white/60"
                      }`}
                    >
                      {idx === current && (
                        <m.div
                          key={current}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 7, ease: "linear" }}
                          className="h-full bg-white"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <span className="text-white/50 text-[11px] font-medium tracking-[0.2em] font-mono">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={nextSlide}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 backdrop-blur-md text-white transition-all duration-300 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Ver siguiente colección"
              >
                <span className="text-[11px] uppercase tracking-wider text-white/70">
                  Siguiente:
                </span>
                <span className="text-xs font-semibold text-white tracking-wide">
                  {slides[nextSlideIndex].title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-1.5 sm:gap-2">
                {[
                  {
                    icon: (
                      <ChevronLeft
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    ),
                    onClick: prevSlide,
                    label: "Diapositiva anterior",
                  },
                  {
                    icon: (
                      <ChevronRight
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                      />
                    ),
                    onClick: nextSlide,
                    label: "Diapositiva siguiente",
                  },
                ].map((btn, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={btn.onClick}
                    aria-label={btn.label}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {btn.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default HeroSlider;
