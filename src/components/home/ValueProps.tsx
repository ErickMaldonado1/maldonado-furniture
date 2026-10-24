"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, ShieldCheck } from "@/utils/icons/actions";
import { Truck, UserGroup } from "@/utils/icons/shop";

const services = [
  {
    icon: Sparkles,
    subtitle: "TALLER PROPIO",
    title: "Fabricación en Quito",
    desc: "Fabricación directa en El Condado Alto con melamina Pelikano, Masisa y Edimca de alta resistencia.",
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
    <section className="py-10 md:py-16 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-zinc-100 dark:border-zinc-800/50 pb-6 gap-4">
          <div>
            <span className="label-premium text-[#8B735B] dark:text-[#C4A482] block mb-1">
              Diferenciación &amp; Confianza
            </span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none"
            >
              Por qué elegir{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037] dark:from-[#C4A482] dark:to-[#E0CCA7]">
                Muebles Maldonado
              </span>
            </motion.h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Mobiliario contemporáneo sin intermediarios, respaldado por proyectos residenciales y corporativos realizados en Quito.
          </p>
        </div>

        <motion.div
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
        </motion.div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-[#FAF9F7] dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">⭐</span>
            <div>
              <strong className="block text-zinc-900 dark:text-white">Proyectos Entregados</strong>
              <span className="text-[11px] text-zinc-500">Cocinas, clósets, dormitorios y oficinas en Quito</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg">📍</span>
            <div>
              <strong className="block text-zinc-900 dark:text-white">Fábrica en El Condado Alto</strong>
              <span className="text-[11px] text-zinc-500">Atención personalizada con previa cita</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg">💬</span>
            <div>
              <strong className="block text-zinc-900 dark:text-white">Atención Directa WhatsApp</strong>
              <span className="text-[11px] text-zinc-500">095 950 4842 con asesor técnico en línea</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
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
      <motion.div
        animate={
          hovered
            ? { x: 5, rotate: 5, scale: 1.05 }
            : { x: 0, rotate: 0, scale: 1 }
        }
        className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white dark:bg-zinc-950 flex items-center justify-center text-[#4A3728] mb-5 border border-zinc-200 dark:border-white/10 shadow-sm group-hover:bg-[#4A3728] group-hover:text-white transition-colors duration-300"
      >
        <Icon width={24} height={24} className="md:size-7" strokeWidth={1.5} />
      </motion.div>

      <div className="flex-1 flex flex-col w-full">
        <span className="label-premium !text-[#4A3728] mb-1 opacity-80">
          {service.subtitle}
        </span>

        <h3 className="text-base md:text-lg font-medium text-zinc-900 dark:text-white mb-2">
          {service.title}
        </h3>

        <p className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
          {service.desc}
        </p>

        <div className="mt-auto">
          <a
            href={service.href}
            className="inline-flex items-center gap-2 label-premium text-zinc-900 dark:text-white hover:text-[#4A3728] dark:hover:text-[#A68B67] transition-colors"
          >
            {service.cta}
            <span
              className={`block h-0.5 bg-[#4A3728] transition-all duration-300 ${hovered ? "w-8" : "w-4"}`}
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ValueProps;
