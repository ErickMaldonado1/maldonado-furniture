"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineDevicePhoneMobile,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function ContactoPage() {
  // Link de Google Maps enfocado en el nombre comercial para forzar el pin
  const googleMapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.816041!2d-78.495!3d-0.125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58564282717a7%3A0xc39f88031d92a095!2sMuebles%20Maldonado%20Ec!5e0!3m2!1ses!2sec!4v1705000000000!5m2!1ses!2sec";

  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#0A0A0A] transition-colors">
      {/* 1. SECCIÓN DE CONTEXTO — INTRODUCCIÓN EDITORIAL */}
      <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-[0.85]">
              Hagamos <br /> Algo{" "}
              <span className="text-[#4A3728]">Grande.</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-lg">
              Desde el diseño inicial hasta la instalación final en tu hogar.
              Somos expertos en transformar melamina de alta gama en espacios de
              vida.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-zinc-100 dark:bg-[#111] rounded-2xl space-y-4">
              <HiOutlineChatBubbleLeftRight className="text-3xl text-[#4A3728]" />
              <h3 className="font-black uppercase text-[10px] tracking-widest dark:text-zinc-500">
                Asesoría 1:1
              </h3>
              <p className="text-sm font-bold dark:text-zinc-300">
                Hablamos sobre tus medidas y presupuesto.
              </p>
            </div>
            <div className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
              <HiOutlineEnvelope className="text-3xl text-[#4A3728]" />
              <h3 className="font-black uppercase text-[10px] tracking-widest dark:text-zinc-500">
                Proforma
              </h3>
              <p className="text-sm font-bold dark:text-zinc-300">
                Recibe un desglose técnico detallado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CANALES DIGITALES — REDES SOCIALES MODERNAS */}
      <section className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              Conecta con nosotros
            </h2>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
              Inspiración diaria en nuestras redes
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: <FaWhatsapp />,
                link: "https://wa.me/593959504842",
                label: "WhatsApp",
              },
              {
                icon: <FaInstagram />,
                link: "https://instagram.com/muebles_maldonad",
                label: "Instagram",
              },
              {
                icon: <FaFacebook />,
                link: "https://facebook.com/MueblesMaldonad",
                label: "Facebook",
              },
              { icon: <FaTiktok />, link: "#", label: "TikTok" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                className="group flex flex-col items-center gap-3 p-6 bg-zinc-800 hover:bg-[#4A3728] transition-all rounded-xl min-w-30"
              >
                <span className="text-3xl transition-transform group-hover:scale-110">
                  {social.icon}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAPA — INTEGRACIÓN LIMPIA */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter dark:text-white mb-4">
                Nuestra Fábrica
              </h2>
              <div className="h-1 w-20 bg-[#4A3728]" />
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <HiOutlineMapPin className="text-2xl text-[#4A3728] shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase text-zinc-400 mb-1">
                    Dirección Exacta
                  </p>
                  <p className="text-lg font-bold dark:text-white leading-tight">
                    El Condado Alto, Calle N75, Quito - Ecuador.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <HiOutlineDevicePhoneMobile className="text-2xl text-[#4A3728] shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase text-zinc-400 mb-1">
                    Atención Directa
                  </p>
                  <p className="text-lg font-bold dark:text-white">
                    095 950 4842
                  </p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] dark:text-white border-b-2 border-[#4A3728] pb-2 hover:gap-8 transition-all">
              Cómo llegar con Waze <HiOutlineArrowUpRight className="text-xl" />
            </button>
          </div>

          <div className="lg:col-span-2 relative h-125 bg-zinc-100 rounded-4xl overflow-hidden shadow-2xl border-8 border-white dark:border-[#111]">
            <iframe
              src={googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale-[0.2] dark:invert dark:hue-rotate-180"
            />
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO FINAL — DISEÑO DE ALTA GAMA */}
      <section className="pb-32 px-6 max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter dark:text-white mb-4">
            Envíanos un mensaje
          </h2>
          <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em]">
            Respuesta inmediata garantizada
          </p>
        </div>

        <form className="grid gap-10">
          <div className="grid md:grid-cols-2 gap-10">
            <input
              type="text"
              placeholder="¿CÓMO TE LLAMAS?"
              className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-sm font-black uppercase tracking-widest outline-none focus:border-[#4A3728] transition-colors dark:text-white"
            />
            <input
              type="text"
              placeholder="TU WHATSAPP"
              className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-sm font-black uppercase tracking-widest outline-none focus:border-[#4A3728] transition-colors dark:text-white"
            />
          </div>
          <textarea
            rows={4}
            placeholder="¿QUÉ PROYECTO TIENES EN MENTE?"
            className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-sm font-black uppercase tracking-widest outline-none focus:border-[#4A3728] transition-colors dark:text-white resize-none"
          ></textarea>

          <button className="mx-auto px-16 py-6 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.5em] hover:bg-[#4A3728] hover:text-white transition-all rounded-full shadow-2xl">
            Enviar Solicitud de Cotización
          </button>
        </form>
      </section>
    </main>
  );
}
