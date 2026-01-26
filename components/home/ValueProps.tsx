"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  HiOutlineTruck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const services = [
  {
    icon: HiOutlineTruck,
    subtitle: "LOGÍSTICA",
    title: "Envío y Montaje",
    desc: "Envío y montaje gratuito en la ciudad de Quito en compras superiores a $200.",
    href: "/servicios/envio-montaje",
    cta: "Consultar detalles",
  },
  {
    icon: HiOutlineSparkles,
    subtitle: "PERSONALIZACIÓN",
    title: "Muebles a Medida",
    desc: "Diseñamos muebles personalizados según tu espacio, estilo y necesidades.",
    href: "/catalogo-colores",
    cta: "Ver catálogo de colores",
  },
  {
    icon: HiOutlineUserGroup,
    subtitle: "ASESORÍA",
    title: "Acompañamiento Total",
    desc: "Te guiamos desde la idea inicial hasta disfrutar tus muebles en casa.",
    href: "/servicios/asesoria",
    cta: "Ver más información",
  },
  {
    icon: HiOutlineShieldCheck,
    subtitle: "CONFIANZA",
    title: "Garantía & Postventa",
    desc: "Respaldamos nuestro trabajo con garantía y soporte después de la entrega.",
    href: "/servicios/garantia",
    cta: "Conocer garantía",
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
    <section className="py-6 md:py-12 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white"
          >
            Nuestros{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              servicios
            </span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex md:grid overflow-x-auto md:overflow-visible pb-6 md:pb-0 hide-scrollbar snap-x snap-mandatory md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
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
        <Icon size={24} className="md:size-7" strokeWidth={1.5} />
      </motion.div>

      <div className="flex-1 flex flex-col w-full">
        <span className="text-[10px] font-black tracking-widest text-[#4A3728] mb-1 opacity-80 uppercase">
          {service.subtitle}
        </span>

        <h4 className="text-[16px] md:text-[18px] font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-2">
          {service.title}
        </h4>

        <p className="text-[13px] md:text-[14px] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
          {service.desc}
        </p>

        <div className="mt-auto">
          <a
            href={service.href}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase text-zinc-900 dark:text-white hover:text-[#4A3728] dark:hover:text-white transition-colors"
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
