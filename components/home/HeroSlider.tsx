"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const slides = [
  {
    id: 1,
    title: "DORMITORIOS",
    description: "Modernos y elegantes que unen diseño, confort y calidad.",
    image:
      "https://images.pexels.com/photos/32177992/pexels-photo-32177992.png?auto=compress&cs=tinysrgb&w=1440",
    link: "/productos?category=dormitorio",
    tag: "Nuevos diseños",
  },
  {
    id: 2,
    title: "SALA ",
    description: "Muebles de sala para cada espacio de tu hogar.",
    image:
      "https://images.pexels.com/photos/27604130/pexels-photo-27604130.png?auto=compress&cs=tinysrgb&w=1920",
    link: "/productos?category=sala",
    tag: "Decoración de sala",
  },
  {
    id: 3,
    title: "OFICINA",
    description:
      "Muebles de oficina para home office y espacios profesionales.",
    image:
      "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1920",
    link: "/productos?category=oficina",
    tag: "Home Office",
  },
  {
    id: 4,
    title: "COCINAS",
    description: "Diseño y calidad en muebles de cocina a medida.",
    image:
      "https://images.pexels.com/photos/7534545/pexels-photo-7534545.jpeg?auto=compress&cs=tinysrgb&w=1920",
    link: "/productos?category=cocina",
    tag: "Cocinas a Medida ",
  },
  {
    id: 5,
    title: "Proyectos",
    description: "Muebles a medida para proyectos con estilo y funcionalidad.",
    image:
      "https://images.pexels.com/photos/7534545/pexels-photo-7534545.jpeg?auto=compress&cs=tinysrgb&w=1920",
    link: "/productos?category=cocina",
    tag: "Diseño de muebles personalzados",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-125 w-full overflow-hidden bg-black dark:bg-[#0a0a0a] transition-colors duration-700">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          {/* Image Layer with Dynamic Overlays */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dynamic Overlays: Sophisticated & Subtle */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-700" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent dark:from-black/70 dark:via-black/30 transition-colors duration-700" />
          </div>

          {/* Content Layer with Fluid Layout & Navbar Offset */}
          <div className="relative h-full w-full max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start text-white pt-20 md:pt-24">
            <div
              className={`max-w-3xl transition-all duration-1000 delay-300 ${
                index === current
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm"
              }`}
            >
              <span className=" inline-flex mb-4 px-3 py-1 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-white dark:text-white bg-[#4A3728]/90 dark:bg-white/10 backdrop-blur-sm rounded-md">
                {slide.tag}
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-none sm:leading-[0.9] uppercase font-heading">
                {slide.title.split(" ").map((word, idx) => (
                  <span
                    key={idx}
                    className={
                      idx % 2 !== 0
                        ? "text-transparent stroke-white stroke-[1px] md:stroke-[2px]"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <p className="text-sm md:text-base lg:text-lg opacity-90 max-w-xl font-medium leading-relaxed mb-8 md:mb-8 text-zinc-200">
                {slide.description}
              </p>

              <Link
                href={slide.link}
                className=" inline-flex items-center gap-2 px-5 py-2.5 text-sm md:text-base font-semibold rounded-md bg-[#4A3728]/90 dark:bg-white/10 text-white dark:text-white backdrop-blur-sm border border-transparent hover:bg-[#4A3728] dark:hover:bg-white/20 transition-all duration-300 group
  "
              >
                Ver colección
                <HiOutlineArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls Wrapper - Aligned with NavBar bounds */}
      <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-20 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex items-end justify-between pointer-events-auto">
          {/* Slide Indicators - Left Side */}
          <div className="flex items-center gap-5">
            <span className="text-white/60 text-[12px] font-black tracking-widest hidden sm:inline">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    idx === current
                      ? "w-10 bg-[#4A3728]"
                      : "w-1.5 bg-white/40 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-white/60 text-[12px] font-black tracking-widest hidden sm:inline">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Buttons - Right Side */}
          <div className="flex gap-2 md:gap-3">
            {[
              {
                icon: <HiOutlineChevronLeft className="text-lg md:text-xl" />,
                onClick: prevSlide,
                label: "Anterior",
              },
              {
                icon: <HiOutlineChevronRight className="text-lg md:text-xl" />,
                onClick: nextSlide,
                label: "Siguiente",
              },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                aria-label={btn.label}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-transparent 
                 backdrop-blur-xl bg-white/20 dark:bg-black/20 
                 flex items-center justify-center 
                 text-white dark:text-white 
                 hover:bg-white/70 dark:hover:bg-black/70 
                 hover:text-black dark:hover:text-white 
                 transition-all duration-300 shadow-lg group"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
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
