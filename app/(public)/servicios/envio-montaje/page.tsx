"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, HomeModern } from "@/utils/icons/index";

interface StepProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ProcessStep = ({ icon: Icon, title, description }: StepProps) => (
  <div className="flex flex-col items-center text-center group p-4">
    <div className="w-20 h-20 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-sm flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-[#4A3728] group-hover:shadow-xl group-hover:shadow-[#4A3728]/10 group-hover:-translate-y-1">
      <Icon className="w-12 h-12 text-3xl text-[#4A3728]" />
    </div>

    <h3 className="text-[13px] font-black uppercase tracking-[0.15em] mb-3 dark:text-white/80">
      {title}
    </h3>
    <p className="text-md text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-220px">
      {description}
    </p>
  </div>
);

export default function EnvioMontajePage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] dark:bg-[#0A0A0A] pt-32 pb-24 selection:bg-[#4A3728]/20">
      <section className="px-6 md:px-8 max-w-6xl mx-auto mb-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-3">
              <span className="text-[13px] font-black uppercase tracking-[0.4em] text-[#4A3728] block">
                Logística
              </span>
              <div className="h-1 w-12 bg-[#4A3728] mx-auto lg:mx-0" />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-[0.9]">
              Del taller a <br />
              <span className="text-[#4A3728]">tu hogar</span>
            </h1>

            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              Nos encargamos de que cada pieza llegue en perfectas condiciones.
              Controlamos todo el proceso: desde el embalaje técnico hasta la
              instalación final en tu espacio.
            </p>
          </motion.div>
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-340px px-4 group">
              <div className="absolute inset-0 bg-[#4A3728]/5 -rotate-3 rounded-sm -z-10 group-hover:rotate-0 transition-transform duration-700" />

              <div className="group relative overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-lg aspect-square sm:aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                  alt="Logística Muebles Maldonado"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-center text-white drop-shadow-sm">
                    Manejo Especializado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50/50 dark:bg-zinc-900/20 border-y border-zinc-100 dark:border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 p-10 md:p-16 rounded-sm bg-white dark:bg-[#0A0A0A]">
            <ProcessStep
              icon={ShieldCheck}
              title="Embalaje de Seguridad"
              description="Protección multicapa con espumas y cartón paa embalaje reforzado."
            />
            <ProcessStep
              icon={Truck}
              title="Transporte Directo"
              description="Aliados logísticos expertos encargados del manejo de mobiliario."
            />
            <ProcessStep
              icon={HomeModern}
              title="Instalación Final"
              description="Montaje y nivelación profesional incluido en todos nuestros servicios."
            />
          </div>
        </div>
      </section>
      <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="p-10 border border-zinc-200 dark:border-zinc-800 rounded-sm space-y-8 hover:border-[#4A3728] transition-colors duration-500">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#4A3728] mb-2">
                Quito y Valles
              </h3>
              <p className="text-md font-bold text-zinc-400 uppercase tracking-widest">
                Servicio Prioritario
              </p>
            </div>
            <ul className="space-y-5">
              {[
                "Entrega e instalación gratuita.",
                "Personal técnico directo de fábrica.",
                "Horarios flexibles de entrega.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-md text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 bg-[#4A3728] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 bg-zinc-900 dark:bg-zinc-950 text-white rounded-sm space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Truck width={60} height={60} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#4A3728] mb-2">
                Resto del País
              </h3>
              <p className="text-md font-bold text-zinc-500 uppercase tracking-widest">
                Cobertura Nacional
              </p>
            </div>
            <ul className="space-y-5">
              {[
                "Envíos asegurados al 100%.",
                "Embalaje reforzado de exportación.",
                "Coordinación personalizada vía WhatsApp.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-md text-zinc-300"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 bg-[#4A3728] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-1 px-4 bg-zinc-100 dark:bg-zinc-900 rounded-sm mb-4">
            <p className="text-md font-black uppercase tracking-[0.15em] text-zinc-500">
              Aviso Importante
            </p>
          </div>
          <p className="text-md text-zinc-400 max-w-md mx-auto leading-relaxed">
            * Los costos de envío fuera de Quito se calculan de manera justa
            basándose en el volumen total y la ciudad de destino.
          </p>
        </div>
      </section>
    </main>
  );
}
