"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, QuestionMarkCircle } from "@/utils/icons/index";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Pedidos y Personalización",
    items: [
      {
        question:
          "¿Puedo personalizar las dimensiones y acabados de mis muebles?",
        answer:
          "Absolutamente. Como fábrica, nos especializamos en diseños a medida. Puedes elegir el tipo de madera, el tono del lacado y las dimensiones exactas para que el mueble encaje perfectamente en tu espacio.",
      },
      {
        question: "¿Cuál es el tiempo de entrega estimado?",
        answer:
          "El tiempo de fabricación varía entre 8 a 25 días laborables, dependiendo de la complejidad del diseño y la carga de trabajo en fábrica al momento de confirmar el pedido.",
      },
    ],
  },
  {
    title: "Envíos y Montaje",
    items: [
      {
        question: "¿Realizan envíos fuera de Quito?",
        answer:
          "Sí, realizamos envíos a todo el Ecuador a través de transporte especializado en muebles para garantizar que lleguen en perfecto estado. El costo varía según la ciudad de destino.",
      },
      {
        question: "¿El servicio incluye la instalación?",
        answer:
          "En Quito y valles cercanos, el armado e instalación están incluidos en el precio. Para envíos a otras provincias, enviamos guías detalladas o brindamos asistencia por videollamada si es necesario.",
      },
    ],
  },
  {
    title: "Garantía y Pagos",
    items: [
      {
        question: "¿Qué garantía ofrecen en sus productos?",
        answer:
          "Ofrecemos una garantía de 1 año contra defectos de fabricación y problemas estructurales en la madera. Nuestra calidad está respaldada por décadas de experiencia.",
      },
      {
        question: "¿Cuáles son las formas de pago?",
        answer:
          "Aceptamos efectivo y transferencia bancaria. Generalmente solicitamos un 50%-60% de anticipo para iniciar la fabricación.",
      },
    ],
  },
];

const AccordionItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border-b border-zinc-200 dark:border-zinc-800 transition-all ${isOpen ? "bg-zinc-50/50 dark:bg-zinc-900/30" : ""}`}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        aria-label="questions"
      >
        <span
          className={`text-sm md:text-base font-bold tracking-tight transition-colors ${isOpen ? "text-[#4A3728]" : "text-zinc-800 dark:text-zinc-200"}`}
        >
          {item.question}
        </span>
        <div className="shrink-0 ml-4">
          {isOpen ? (
            <Minus className="text-[#4A3728]" />
          ) : (
            <Plus className="text-zinc-400" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-md text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  return (
    <main className="min-h-screen bg-[#FDFCFB] dark:bg-[#0A0A0A] md:pt-32 pt-24 pb-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-md font-black uppercase tracking-[0.2em] text-[#4A3728]">
            Soporte al Cliente
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            Preguntas <span className="text-[#4A3728]">Frecuentes</span>
          </h1>
          <div className="h-1.5 w-36 bg-[#4A3728] mx-auto mt-6" />
        </div>

        <div className="space-y-8">
          {faqData.map((category, catIndex) => (
            <section key={catIndex} className="space-y-4">
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-zinc-400 border-l-4 border-[#4A3728] pl-4 mb-4">
                {category.title}
              </h2>
              <div className="border-t border-zinc-200 dark:border-zinc-800">
                {category.items.map((item, itemIndex) => {
                  const id = `${catIndex}-${itemIndex}`;
                  return (
                    <AccordionItem
                      key={id}
                      item={item}
                      isOpen={openIndex === id}
                      onClick={() => setOpenIndex(openIndex === id ? null : id)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-16 p-8 md:p-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm text-center space-y-6 shadow-sm">
          <div className="inline-flex p-4 bg-[#4A3728]/10 rounded-sm mb-2">
            <QuestionMarkCircle className=" w-8 h-8 text-3xl text-[#4A3728]" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight dark:text-white text-zinc-900">
            ¿Aún tienes dudas?
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
            Si no encontraste la respuesta que buscabas, nuestro equipo de
            asesores está listo para ayudarte personalmente.
          </p>
          <div className="pt-4">
            <a
              href="/contacto"
              className="inline-block bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-10 py-4 rounded-full text-sm font-black uppercase hover:bg-[#4A3728] hover:text-white transition-all duration-300"
            >
              Contactar con un Asesor
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
