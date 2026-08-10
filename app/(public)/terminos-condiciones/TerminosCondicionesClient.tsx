"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale } from "@/utils/icons/shop";
import Link from "next/link";

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: PolicySection[] = [
  {
    id: "general",
    title: "1. Disposiciones Generales",
    content: (
      <p>
        Al acceder y utilizar el sitio web de <strong>Muebles Maldonado</strong>
        , usted acepta quedar vinculado por estos términos y condiciones.
        Nuestra fábrica se reserva el derecho de actualizar estos términos en
        cualquier momento para reflejar cambios en nuestras operaciones o
        regulaciones legales ecuatorianas.
      </p>
    ),
  },
  {
    id: "productos",
    title: "2. Productos y Personalización",
    content: (
      <>
        <p>
          Cada pieza de mobiliario es fabricada bajo pedido. Debido a la
          naturaleza de la madera natural y tableros melamínicos de alta
          calidad, pueden existir variaciones menores en la veta y el tono, lo
          cual es prueba de la autenticidad del material.
        </p>
        <ul className="mt-4 space-y-2 list-disc pl-5 opacity-80 font-medium">
          <li>
            Las medidas pueden variar +/- 1cm debido al proceso de ensamblaje
            artesanal.
          </li>
          <li>
            Los colores en pantalla son referenciales y pueden variar levemente
            del acabado físico.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pagos",
    title: "3. Políticas de Pago",
    content: (
      <p>
        Para iniciar la fabricación de cualquier pedido personalizado, se
        requiere un anticipo del 50%. El saldo restante deberá ser cancelado
        antes del despacho o al momento de la instalación (según el acuerdo
        previo en Quito). Aceptamos transferencias bancarias y tarjetas de
        crédito.
      </p>
    ),
  },
  {
    id: "garantia",
    title: "4. Garantía Limitada",
    content: (
      <p>
        Ofrecemos una garantía de <strong>6 meses a 1 año</strong> que cubre
        defectos de fabricación y estructura. Esta garantía no cubre daños por
        mal uso, exposición directa al sol, humedad excesiva o el uso de
        productos de limpieza abrasivos no recomendados por nuestra fábrica.
      </p>
    ),
  },
];

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-24 px-6 md:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        <header className="mb-20 space-y-4">
          <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#4A3728] block">
            Marco Legal
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white leading-none">
            Términos <span className="text-[#4A3728]">y Condiciones</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium">
            Última actualización: 11 de Agosto, 2026
          </p>
        </header>

        <div className="grid lg:grid-cols-4 gap-16">
          <aside className="hidden lg:block space-y-3 sticky top-32 h-fit">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 block mb-4">
              Índice
            </span>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-xs font-bold text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#4A3728] transition-colors uppercase tracking-wider"
              >
                {section.title}
              </a>
            ))}
          </aside>
          <div className="lg:col-span-3 space-y-20">
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-32"
              >
                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                  {section.title}
                </h2>
                <div className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base space-y-4 font-medium">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Caja de Ayuda */}
            <div className="p-8 md:p-12 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 rounded-sm space-y-6">
              <div className="flex items-center gap-4 text-[#4A3728]">
                <Scale width={32} height={32} />
                <h3 className="text-xl md:text-2xl font-medium tracking-tight dark:text-white text-zinc-900">
                  ¿Dudas sobre nuestras políticas?
                </h3>
              </div>
              <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                Si tiene alguna pregunta sobre el alcance legal de estos
                términos o requiere una aclaración sobre su pedido, por favor
                contáctenos directamente con nuestro equipo de atención.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="mailto:legal@mueblesmaldonado.com"
                  className="inline-flex items-center justify-center bg-[#4A3728] hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900 text-white px-6 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Enviar Correo
                </a>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 px-6 py-3 rounded-sm hover:border-[#4A3728] dark:hover:border-[#4A3728] text-[11px] font-black uppercase tracking-[0.2em] transition-all text-zinc-900 dark:text-white"
                >
                  Ir a Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-32 pt-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.25em]">
            Muebles Maldonado © 2026 • Todos los derechos reservados
          </p>
        </footer>
      </div>
    </main>
  );
}
