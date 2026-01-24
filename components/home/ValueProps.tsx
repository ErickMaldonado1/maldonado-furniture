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
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ValueProps = () => {
  return (
    <section className="py-12 bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="mb-20 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white"
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
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-12"
        >
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

type Service = (typeof services)[number];

const ServiceCard = ({ service }: { service: Service }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      className="group relative flex flex-col items-center text-center md:items-start md:text-left rounded-sm border border-zinc-200/70 dark:border-white/10 md:border-none p-5 md:p-0 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={itemVariants}
    >
      <motion.div
        animate={
          hovered
            ? { x: 8, rotate: 4, scale: 1.1 }
            : { x: 0, rotate: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="w-14 h-14 md:w-18 md:h-18 rounded-sm bg-white dark:bg-zinc-950 flex items-center justify-center text-[#4A3728] mb-4 border border-zinc-200 dark:border-white/10 shadow-sm transition-colors duration-300 group-hover:bg-[#4A3728] group-hover:text-white"
      >
        <Icon size={32} strokeWidth={1.5} />
      </motion.div>

      <div className="flex-1 flex flex-col">
        <span className="text-md md:text-md font-black tracking-[0.15em] uppercase text-[#4A3728] mb-2">
          {service.subtitle}
        </span>

        <h4 className="text-md md:text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-2 md:mb-3">
          {service.title}
        </h4>

        <p className="text-md md:text-sm font-medium text-zinc-500 dark:text-white/50 leading-relaxed max-w-xs mb-4">
          {service.desc}
        </p>

        <div className="flex items-center justify-between w-full">
          <motion.div
            className="h-1 rounded-full w-6 md:w-8"
            animate={
              hovered
                ? { width: "48px", backgroundColor: "#4A3728" }
                : { width: "24px", backgroundColor: "rgba(74,55,40,0.3)" }
            }
            transition={{ duration: 0.3 }}
          />

          <motion.a
            href={service.href}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-md font-black uppercase  text-zinc-900 dark:text-white pointer-events-auto"
          >
            {service.cta}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ValueProps;
