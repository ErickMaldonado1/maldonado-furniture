"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/utils/icons";

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
          naturaleza de la madera natural (Eucalipto, Seike, entre otras),
          pueden existir variaciones menores en la veta y el tono, lo cual es
          prueba de la autenticidad del material.
        </p>
        <ul className="mt-4 space-y-2 list-disc pl-5 opacity-80">
          <li>
            Las medidas pueden variar +/- 1cm debido al proceso artesanal.
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
        requiere un anticipo del 50% - 60%. El saldo restante deberá ser
        cancelado antes del despacho o al momento de la entrega (según el
        acuerdo previo en Quito). Aceptamos transferencias, tarjetas de crédito
        y efectivo.
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
    <main className="min-h-screen bg-[#FDFCFB] dark:bg-[#0A0A0A] pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-20 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-1px w-12 bg-[#4A3728]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            Términos <span className="text-[#4A3728]"> y Condiciones</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Última actualización: 9 de febrero, 2026
          </p>
        </header>

        <div className="grid lg:grid-cols-4 gap-16">
          <aside className="hidden lg:block space-y-4 sticky top-32 h-fit">
            <p className="text-md font-black uppercase tracking-widest text-zinc-400 mb-4">
              Índice
            </p>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-xs font-bold text-zinc-500 hover:text-[#4A3728] transition-colors uppercase tracking-tight"
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
                <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-2px bg-[#4A3728]" />
                  {section.title}
                </h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base space-y-4 font-medium">
                  {section.content}
                </div>
              </motion.section>
            ))}

            <div className="p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-sm space-y-6">
              <div className="flex items-center gap-4 text-[#4A3728]">
                <Icons.Scale width={32} height={32} />
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white text-zinc-900">
                  ¿Dudas sobre nuestras políticas?
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Si tiene alguna pregunta sobre el alcance legal de estos
                términos o requiere una aclaración sobre su pedido, por favor
                contáctenos directamente a nuestro departamento de servicio al
                cliente.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="mailto:legal@mueblesmaldonado.com"
                  className="text-md font-black uppercase tracking-widest bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-6 py-3 rounded-sm hover:bg-[#4A3728] dark:hover:bg-[#4A3728] dark:hover:text-white transition-all"
                >
                  Enviar Correo
                </a>
                <a
                  href="/contacto"
                  className="text-md font-black uppercase tracking-widest border border-zinc-300 dark:border-zinc-700 px-6 py-3 rounded-sm hover:border-[#4A3728] transition-all dark:text-white"
                >
                  Ir a Contacto
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 pt-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
          <p className="mt-6 text-md font-bold text-zinc-400 uppercase tracking-[0.3em]">
            Muebles Maldonado © 2026 • Todos los derechos reservados
          </p>
        </footer>
      </div>
    </main>
  );
}
