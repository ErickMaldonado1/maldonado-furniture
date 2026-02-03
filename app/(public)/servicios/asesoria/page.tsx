"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LightBulb,
  PencilSquare,
  Cube,
  Sparkles,
} from "@/utils/icons/actions";
import { ContactForm } from "@/components/shop/ContactForm";

interface ProcessStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  stepNumber: number;
}

const ProcessStep = ({
  icon: Icon,
  title,
  description,
  stepNumber,
}: ProcessStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: stepNumber * 0.1 }}
    className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-900 rounded-sm border border-zinc-100 dark:border-zinc-800 shadow-lg group hover:shadow-xl transition-all duration-300"
  >
    <div className="absolute top-4 left-4 text-zinc-200 dark:text-zinc-700 font-black text-5xl opacity-50 z-0">
      {stepNumber < 10 ? `0${stepNumber}` : stepNumber}
    </div>
    <div className="w-20 h-20 bg-[#4A3728]/10 dark:bg-[#4A3728]/20 text-[#4A3728] rounded-full flex items-center justify-center mb-6 relative z-10">
      <Icon className="w-10 h-10 text-3xl" />
    </div>
    <h3 className="text-[15px] font-black uppercase tracking-widest mb-2 dark:text-white/90 relative z-10">
      {title}
    </h3>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed relative z-10">
      {description}
    </p>
  </motion.div>
);

export default function AsesoriaDisenoPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] dark:bg-[#0A0A0A] pt-12 md:pt-32 pb-24 selection:bg-[#4A3728]/20">
      <section className="bg-zinc-50/50 dark:bg-zinc-900/20 py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-4"
          >
            Nuestro Proceso de <span className="text-[#4A3728]">Asesoría</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Desde la idea inicial hasta la pieza final, te acompañamos para que
            el resultado supere tus expectativas.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProcessStep
            stepNumber={1}
            icon={LightBulb}
            title="Exploración de Ideas"
            description="Comprendemos tus necesidades, estilo y el entorno del proyecto. Creamos un concepto inicial."
          />
          <ProcessStep
            stepNumber={2}
            icon={PencilSquare}
            title="Diseño y Visualización"
            description="Desarrollamos bocetos, planos técnicos y renders 3D para que veas tu mobiliario antes de crearlo."
          />
          <ProcessStep
            stepNumber={3}
            icon={Cube}
            title="Selección de Materiales"
            description="Te asesoramos en la elección de maderas, acabados y herrajes que se ajusten a tu visión y presupuesto."
          />
          <ProcessStep
            stepNumber={4}
            icon={Sparkles}
            title="Fabricación y Montaje"
            description="Una vez aprobado el diseño, nuestros artesanos dan vida a tu pieza con la más alta calidad."
          />
        </div>
      </section>
      <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-4"
        >
          ¿Por Qué Elegir Nuestra{" "}
          <span className="text-[#4A3728]">Asesoría?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12"
        >
          Combinamos la artesanía tradicional con la innovación en diseño para
          ofrecerte resultados que superan lo convencional.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Expertos en Diseño",
              description:
                "Equipo de diseñadores con años de experiencia en mobiliario de lujo y a medida.",
            },
            {
              title: "Tecnología 3D Avanzada",
              description:
                "Visualiza tus muebles con renders fotorrealistas antes de la producción.",
            },
            {
              title: "Materiales Premium",
              description:
                "Acceso a una selección exclusiva de maderas finas y acabados de alta durabilidad.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-white dark:bg-zinc-900 rounded-sm border border-zinc-100 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto">
        <ContactForm />
      </section>
    </main>
  );
}
