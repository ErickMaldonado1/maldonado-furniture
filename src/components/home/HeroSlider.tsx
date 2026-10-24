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

  const handleWhatsAppQuote = (slide: SlideData) => {
    const phone = "593959504842";
    const text =
      slide.whatsappText ||
      `👋 ¡Hola Muebles Maldonado! Vi el banner de "${slide.title}" en su web y deseo cotizar un diseño similar para mi espacio.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const nextSlideIndex = (current + 1) % slides.length;

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative h-[80vh] md:h-[85vh] min-h-125 w-full overflow-hidden bg-black dark:bg-[#0a0a0a] transition-colors duration-700">
        <AnimatePresence initial={false}>
          <m.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
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
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="relative h-full w-full max-w-360 mx-auto px-6 lg:px-12 flex flex-col justify-center items-start text-white pt-16 md:pt-24">
              <div className="max-w-3xl overflow-hidden">
                <m.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                  className="inline-flex mb-4 label-premium text-white! bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20"
                >
                  {slides[current].tag}
                </m.span>
              </div>

              <div className="overflow-hidden">
                <m.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 md:mb-6 leading uppercase text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                >
                  {slides[current].title}
                </m.h1>
              </div>

              <div className="overflow-hidden">
                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                  className="text-sm md:text-base lg:text-[17px] max-w-xl font-normal leading-relaxed mb-6 md:mb-8 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                >
                  {slides[current].description}
                </m.p>
              </div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link
                  href={slides[current].link}
                  aria-label={`Ver colección de ${slides[current].title}`}
                  className="inline-flex items-center gap-4 px-6 py-4 text-[13px] font-medium uppercase text-white bg-transparent border border-white/30 hover:bg-white hover:text-black transition-all duration-500 group shadow-sm"
                >
                  <span>Ver colección</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote(slides[current])}
                  title={`Cotizar ${slides[current].title} por WhatsApp`}
                  aria-label={`Cotizar ${slides[current].title} por WhatsApp`}
                  className="inline-flex items-center gap-2.5 px-6 py-4 text-[13px] font-medium uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-500 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Whatsapp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>Cotizar a Medida</span>
                </button>
              </m.div>
            </div>
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-20 pointer-events-none">
          <div className="max-w-360 mx-auto px-6 lg:px-12 flex items-end justify-between pointer-events-auto">
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="text-white text-sm font-medium tracking-[0.2em] font-mono">
                {String(current + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Ir a diapositiva ${idx + 1}`}
                    className="relative h-6 sm:h-8 w-6 sm:w-10 flex items-center justify-center group cursor-pointer"
                  >
                    <div
                      className={`relative h-[2px] rounded-full overflow-hidden transition-all duration-500 ${idx === current
                          ? "w-6 sm:w-10 bg-white/30"
                          : "w-2.5 sm:w-4 bg-white/30 group-hover:w-5 group-hover:bg-white/70"
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

                    {idx === current && (
                      <m.span
                        layoutId="hero-indicator"
                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <span className="text-white/40 text-xs font-medium tracking-[0.2em] font-mono">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                onClick={nextSlide}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-md text-white transition-all duration-300 group cursor-pointer"
                aria-label="Ver siguiente espacio"
              >
                <span className="label-premium text-white/60">Siguiente:</span>
                <span className="text-xs font-medium text-white tracking-wide">
                  {slides[nextSlideIndex].title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex gap-2 sm:gap-3">
                {[
                  {
                    icon: <ChevronLeft className="w-5 h-5" aria-hidden="true" />,
                    onClick: prevSlide,
                    label: "Diapositiva anterior",
                  },
                  {
                    icon: <ChevronRight className="w-5 h-5" aria-hidden="true" />,
                    onClick: nextSlide,
                    label: "Diapositiva siguiente",
                  },
                ].map((btn, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={btn.onClick}
                    aria-label={btn.label}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <div className="transition-transform duration-500 group-hover:scale-110">
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