"use client";

import { motion } from "framer-motion";
import { Whatsapp } from "@/utils/icons/social";
import { ArrowUpRight } from "@/utils/icons/navigation";
import { Mail, Phone, Users, MapPin, Clock } from "@/utils/icons/ui";
import { ContactForm } from "@/components/shop/contact/ContactForm";

export default function ContactoPage() {
  return (
    <main className="mt-20 min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      {/* Header Banner */}
      <section className="pt-8 md:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-zinc-100 dark:border-zinc-800/80 pb-6 mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A3728] dark:text-[#D4B896] block mb-1">
              Canales Directos
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-zinc-900 dark:text-white leading-tight">
              Atención al{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A3728] to-[#634E3A] dark:from-[#D4B896] dark:to-[#E0CCA7]">
                Cliente & Proyectos
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-md w-full md:w-auto"
          >
            <div className="relative border-l-2 border-[#4A3728] pl-5 py-1">
              <p className="text-sm md:text-base font-normal text-zinc-600 dark:text-zinc-300 leading-relaxed text-left">
                &quot;Estamos aquí para materializar tus ideas. Conecta con
                nuestro equipo especializado en diseño, tableros de melamina y
                fabricación a medida en Quito.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Direct Contact Cards */}
      <section className="py-8 bg-zinc-50/50 dark:bg-[#080808] border-y border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://api.whatsapp.com/send/?phone=593959504842&text=Hola%21+Necesito+ayuda+con+un+pedido.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-[#0D0D0D] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 hover:border-[#4A3728] dark:hover:border-[#D4B896] shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#4A3728]/10 dark:bg-[#D4B896]/10 flex items-center justify-center mb-4 text-[#4A3728] dark:text-[#D4B896]">
                  <Whatsapp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                  Escríbenos
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Asesoría técnica y ventas en tiempo real con expertos de
                  fábrica.
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A3728] dark:text-[#D4B896] mt-5 group-hover:translate-x-1 transition-transform">
                Enviar Mensaje <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            <div className="flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-[#0D0D0D] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#4A3728]/10 dark:bg-[#D4B896]/10 flex items-center justify-center mb-4 text-[#4A3728] dark:text-[#D4B896]">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                  Email
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Proyectos, planos y solicitudes de proformas detalladas.
                </p>
              </div>
              <a
                href="mailto:mueblesmaldonadoec@gmail.com"
                className="text-xs font-semibold text-[#4A3728] dark:text-[#D4B896] hover:underline mt-5 truncate"
              >
                mueblesmaldonadoec@gmail.com
              </a>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-[#0D0D0D] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#4A3728]/10 dark:bg-[#D4B896]/10 flex items-center justify-center mb-4 text-[#4A3728] dark:text-[#D4B896]">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                  Llamadas
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Atención telefónica personalizada de lunes a viernes.
                </p>
              </div>
              <a
                href="tel:0959504842"
                className="text-xs font-bold uppercase tracking-wider text-[#4A3728] dark:text-[#D4B896] hover:underline mt-5"
              >
                095 950 4842
              </a>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-[#0D0D0D] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#4A3728]/10 dark:bg-[#D4B896]/10 flex items-center justify-center mb-4 text-[#4A3728] dark:text-[#D4B896]">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                  Comunidad
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Síguenos en redes para conocer proyectos entregados e
                  inspiración.
                </p>
              </div>
              <a
                href="https://www.instagram.com/muebles_maldonad/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold tracking-wider text-[#4A3728] dark:text-[#D4B896] hover:underline mt-5"
              >
                @muebles_maldonad
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Map Balanced Layout */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Column 1: Solicita una Proforma (Form) */}
          <div className="flex flex-col h-full">
            <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A3728] dark:text-[#D4B896] block mb-1">
                Cotización en Línea
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-zinc-900 dark:text-white leading-tight">
                Solicita una Proforma
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Completa tus datos y te contactaremos con una propuesta técnica
                y cotización sin costo.
              </p>
            </div>

            <div className="flex-1 bg-white dark:bg-[#0D0D0D] border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <ContactForm variant="compact" hideHeader={true} />
            </div>
          </div>

          {/* Column 2: Nuestra Fábrica & Mapa */}
          <div className="flex flex-col h-full">
            <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A3728] dark:text-[#D4B896] block mb-1">
                Taller de Producción
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-zinc-900 dark:text-white leading-tight">
                Nuestra Fábrica
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Visítanos en nuestro taller bajo previa cita para revisar
                muestrarios físicos y planificar tu espacio.
              </p>
            </div>

            <div className="flex-1 bg-white dark:bg-[#0D0D0D] border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
              {/* Information Cards (Location & Hours) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4A3728]/10 dark:bg-[#D4B896]/10 flex items-center justify-center shrink-0 text-[#4A3728] dark:text-[#D4B896]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                      Ubicación
                    </span>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      Norte de Quito, Sector Condado Alto
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4A3728]/10 dark:bg-[#D4B896]/10 flex items-center justify-center shrink-0 text-[#4A3728] dark:text-[#D4B896]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                      Horario de Atención
                    </span>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      Lun - Vie: 08:30 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="relative w-full flex-1 min-h-[320px] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-inner group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8131877759606!2d-78.52207852622!3d-0.09190273548446162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5854e128da845%3A0xe91f40a9dd58a38a!2sMuebles%20Maldonado%20Ec!5e0!3m2!1ses-419!2sec!4v1765848391688!5m2!1ses-419!2sec"
                  className="absolute inset-0 w-full h-full grayscale-25 contrast-110 dark:invert-[0.88] dark:hue-rotate-180 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación de fábrica Muebles Maldonado en Quito"
                />
                <div className="absolute bottom-3 left-3 z-10">
                  <a
                    href="https://maps.google.com/?q=Muebles+Maldonado+Quito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#4A3728] hover:bg-[#3D2C1F] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                  >
                    <span>Abrir en Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct appointment button via WhatsApp */}
              <div className="pt-2">
                <a
                  href="https://wa.me/593959504842?text=Hola%20Muebles%20Maldonado,%20quisiera%20agendar%20una%20cita%20previa%20para%20visitar%20su%20f%C3%A1brica%20en%20el%20Norte%20de%20Quito."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
                >
                  <Whatsapp className="w-4 h-4 text-white" />
                  <span>Agendar Cita Previa por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
