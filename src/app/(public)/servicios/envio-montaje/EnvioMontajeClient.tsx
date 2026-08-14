"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Truck } from "@/utils/icons/shop";
import { ShieldCheck, HomeModern } from "@/utils/icons/actions";

interface StepProps {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const ProcessStep = ({ number, icon: Icon, title, description }: StepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="group relative"
  >
    <div className="mb-7 flex items-center justify-between">
      <span className="text-sm font-medium text-[#4A3728]">{number}</span>

      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all duration-300 group-hover:border-[#4A3728]/40 group-hover:bg-[#4A3728]/5 dark:border-zinc-800 dark:bg-zinc-950">
        <Icon className="h-6 w-6 text-[#4A3728]" />
      </div>
    </div>

    <h3 className="mb-3 text-lg font-medium text-zinc-900 dark:text-white">
      {title}
    </h3>

    <p className="max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
      {description}
    </p>
  </motion.div>
);

interface CoverageCardProps {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ElementType;
}

const CoverageCard = ({
  eyebrow,
  title,
  description,
  items,
  icon: Icon,
}: CoverageCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden border border-zinc-200 bg-white p-8 transition-all duration-500 hover:border-[#4A3728]/30 hover:shadow-xl hover:shadow-zinc-900/4 md:p-10 dark:border-zinc-800 dark:bg-[#0A0A0A] dark:hover:border-[#4A3728]/40"
  >
    <div className="absolute -right-8 -top-8 opacity-[0.035] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.07]">
      <Icon className="h-40 w-40 text-[#4A3728]" />
    </div>

    <div className="relative">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-md font-medium text-[#4A3728]">{eyebrow}</span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A3728]/5">
          <Icon className="h-5 w-5 text-[#4A3728]" />
        </div>
      </div>

      <h3 className="mb-3 text-2xl font-medium  text-zinc-900 dark:text-white">
        {title}
      </h3>

      <p className="mb-8 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>

      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300"
          >
            <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A3728]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function EnvioMontajePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 transition-colors dark:bg-[#050505] dark:text-white">
      {/* Hero */}
      <section className="px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <h1 className="max-w-xl text-3xl md:text-4xl lg:text-5xl font-medium leading-none text-zinc-900 dark:text-white">
                Del taller a <span className="text-[#4A3728]">tu hogar</span>
              </h1>

              <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-zinc-500 md:text-lg lg:mx-0 dark:text-zinc-400">
                Nos encargamos de que cada pieza llegue en perfectas
                condiciones. Cuidamos cada etapa, desde el embalaje hasta la
                instalación final en tu espacio.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-[#4A3728]/30" />

              <div className="relative aspect-4/3 overflow-hidden border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src="https://res.cloudinary.com/dwvruzkll/image/upload/v1786381288/proceso_rnk0fo.webp?q=80&w=2070&auto=format&fit=crop"
                  alt="Proceso de logística y entrega de muebles Maldonado"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/50 via-black/10 to-transparent p-6 pt-16">
                  <p className="text-sm font-medium text-white">
                    Manejo especializado
                  </p>

                  <p className="mt-1 text-xs text-white/70">
                    Cuidamos cada pieza durante todo el proceso.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-zinc-200 bg-zinc-50/70 px-6 py-20 md:px-8 md:py-24 dark:border-zinc-800 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-xl"
          >
            <span className="text-lg font-medium text-[#4A3728]">
              Nuestro proceso
            </span>

            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
              Cada entrega tiene su cuidado
            </h2>

            <p className="mt-4 text-base leading-7 text-zinc-500 dark:text-zinc-400">
              Preparamos, transportamos e instalamos tus muebles procurando que
              lleguen en las mismas condiciones en las que salieron de nuestro
              taller.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
            <div className="md:border-r md:border-zinc-200 md:pr-10 dark:md:border-zinc-800">
              <ProcessStep
                number="01"
                icon={ShieldCheck}
                title="Embalaje seguro"
                description="Protegemos cada pieza con materiales adecuados para reducir riesgos durante su traslado."
              />
            </div>

            <div className="md:border-r md:border-zinc-200 md:px-10 dark:md:border-zinc-800">
              <ProcessStep
                number="02"
                icon={Truck}
                title="Transporte directo"
                description="Coordinamos el traslado con personal y aliados que conocen el manejo de mobiliario."
              />
            </div>

            <div className="md:pl-10">
              <ProcessStep
                number="03"
                icon={HomeModern}
                title="Instalación final"
                description="Una vez en tu hogar, realizamos el montaje y dejamos cada pieza lista para disfrutar."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="text-sm font-medium text-[#4A3728]">
              Cobertura
            </span>

            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
              Entregamos donde estés
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-500 dark:text-zinc-400">
              Tenemos diferentes alternativas de entrega dependiendo de tu
              ubicación y de las características de tu pedido.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <CoverageCard
              eyebrow="Servicio prioritario"
              title="Quito y Valles"
              description="Para Quito y sus alrededores contamos con un servicio coordinado para facilitar la entrega y puesta a punto de tus muebles."
              icon={HomeModern}
              items={[
                "Entrega e instalación gratuita.",
                "Personal técnico directo de fábrica.",
                "Horarios flexibles de entrega.",
              ]}
            />

            <CoverageCard
              eyebrow="Cobertura nacional"
              title="Resto del país"
              description="Coordinamos cada envío de acuerdo con la ciudad de destino, el volumen del pedido y las necesidades de protección."
              icon={Truck}
              items={[
                "Envíos asegurados.",
                "Embalaje reforzado para el traslado.",
                "Coordinación personalizada vía WhatsApp.",
              ]}
            />
          </div>

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl border-t border-zinc-200 pt-8 text-center dark:border-zinc-800"
          >
            <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
              Información sobre envíos
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Los costos de envío fuera de Quito se calculan de manera justa
              según el volumen total del pedido y la ciudad de destino.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
