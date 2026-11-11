"use client";

import { useState } from "react";
import Link from "next/link";
import { m, LazyMotion, domAnimation, type Variants } from "framer-motion";
import { Sparkles, ShieldCheck } from "@/utils/icons/actions";
import { Truck, UserGroup } from "@/utils/icons/shop";
import { CheckCircle2, MapPin, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    subtitle: "TALLER PROPIO",
    title: "Fabricación en Quito",
    desc: "Fabricación directa en el Norte de Quito, Sector Condado Alto con melamina Pelikano, Masisa y Edimca de alta resistencia.",
    href: "/contacto",
    cta: "Conocer fábrica",
  },
  {
    icon: UserGroup,
    subtitle: "A TU MEDIDA",
    title: "Personalización Total",
    desc: "Ajustamos dimensiones, distribución interior de gavetas y acabados a tu espacio exacto.",
    href: "/catalogo-colores",
    cta: "Ver catálogo de colores",
  },
  {
    icon: Truck,
    subtitle: "LOGÍSTICA QUITO",
    title: "Envío & Montaje",
    desc: "Personal capacitado que instala y calibra cada mueble en tu hogar. Gratis en compras sobre $200.",
    href: "/servicios/envio-montaje",
    cta: "Detalles de envío",
  },
  {
    icon: ShieldCheck,
    subtitle: "CONFIANZA",
    title: "Garantía & Postventa",
    desc: "Garantía directa de fabricación, herrajes de uso rudo y soporte continuo vía WhatsApp.",
    href: "/terminos-condiciones",
    cta: "Ver términos y garantía",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ValueProps = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-10 md:py-16 bg-white dark:bg-[#050505] overflow-hidden">
        <div className="max-w-360 mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-zinc-100 dark:border-zinc-800/50 pb-6 gap-4">
            <div>
              <span className="label-premium text-[#634E3A] dark:text-[#D4B896] block mb-1">
                Diferenciación & Confianza
              </span>
              <m.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none"
              >
                Por qué elegir{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037] dark:from-[#C4A482] dark:to-[#E0CCA7]">
                  Muebles Maldonado
                </span>
              </m.h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md">
              Mobiliario contemporáneo, fabricación directa y proyectos
              residenciales corporativos en Quito y otras provincias del Ecuador.
            </p>
          </div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex md:grid overflow-x-auto md:overflow-visible pb-6 md:pb-0 hide-scrollbar snap-x snap-mandatory md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className="min-w-[85%] sm:min-w-[48%] md:min-w-0 snap-center p-1"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#FAF9F7] dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 flex items-start gap-4 transition-all duration-300 hover:border-[#4A3728]/40 dark:hover:border-[#A6866A]/40 group">
            <div className="w-11 h-11 rounded-xl bg-[#4A3728]/10 dark:bg-[#A6866A]/10 text-[#4A3728] dark:text-[#A6866A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#634E3A] dark:text-[#D4B896] block">
                Experiencia Comprobada
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
                Proyectos Realizados
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Cocinas, clósets, dormitorios y oficinas a medida en Quito con
                acabados de alta resistencia.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F7] dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 flex items-start gap-4 transition-all duration-300 hover:border-[#4A3728]/40 dark:hover:border-[#A6866A]/40 group">
            <div className="w-11 h-11 rounded-xl bg-[#4A3728]/10 dark:bg-[#A6866A]/10 text-[#4A3728] dark:text-[#A6866A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#634E3A] dark:text-[#D4B896] block">
                Atención Personalizada
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
                Fábrica en el Norte de Quito
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Atención en el sector Condado Alto, con visitas a fábrica
                únicamente bajo cita previa.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F7] dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 flex items-start gap-4 transition-all duration-300 hover:border-[#4A3728]/40 dark:hover:border-[#A6866A]/40 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                Asesoría Técnica Directa
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
                WhatsApp: 095 950 4842
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Orientación técnica personalizada y proformas sin intermediarios
                para tu proyecto de mobiliario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </LazyMotion>
);
};

const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <m.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative flex flex-col items-start text-left h-full p-6 md:p-8 rounded-xl border transition-all duration-300
        ${
          hovered
            ? "border-[#4A3728]/40 bg-white dark:bg-zinc-900/50 shadow-sm"
            : "border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 md:bg-transparent md:border-transparent"
        }
      `}
    >
      <m.div
        animate={
          hovered
            ? { x: 5, rotate: 5, scale: 1.05 }
            : { x: 0, rotate: 0, scale: 1 }
        }
        className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white dark:bg-zinc-950 flex items-center justify-center text-[#4A3728] dark:text-[#D4B896] mb-5 border border-zinc-200 dark:border-white/10 shadow-sm group-hover:bg-[#4A3728] group-hover:text-white transition-colors duration-300"
      >
        <Icon
          width={24}
          height={24}
          className="md:size-7"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </m.div>

      <div className="flex-1 flex flex-col w-full">
        <span className="label-premium text-[#4A3728] dark:text-[#D4B896] mb-1 font-semibold">
          {service.subtitle}
        </span>

        <h3 className="text-base md:text-lg font-medium text-zinc-900 dark:text-white mb-2">
          {service.title}
        </h3>

        <p className="text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
          {service.desc}
        </p>

        <div className="mt-auto">
          <Link
            href={service.href}
            aria-label={`${service.cta}: ${service.title}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-white hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4A3728] rounded"
          >
            {service.cta}
            <span
              className={`block h-0.5 bg-[#4A3728] dark:bg-[#D4B896] transition-all duration-300 ${hovered ? "w-8" : "w-4"}`}
            />
          </Link>
        </div>
      </div>
    </m.div>
  );
};

export default ValueProps;
