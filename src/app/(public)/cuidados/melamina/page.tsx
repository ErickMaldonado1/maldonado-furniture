import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo limpiar y cuidar muebles de melamina | Muebles Maldonado",
  description:
    "Guía técnica para la limpieza adecuada de tableros de melamina Pelikano, Edimca y Masisa. Productos seguros, técnicas de secado y prevención de rayones.",
};

export default function MelaminaCarePage() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-zinc-50 dark:bg-[#070707] transition-colors">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/cuidados"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Volver a Guías de Cuidado
        </Link>

        <header className="mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#634E3A] dark:text-[#D4B896] block">
            Guía de Materiales
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white leading-tight">
            Cómo limpiar y cuidar muebles de melamina
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Los muebles de Muebles Maldonado están fabricados con tableros de melamina de marcas líderes (Pelikano, Masisa y Edimca). Sigue estas instrucciones para mantener su brillo original y textura por décadas.
          </p>
        </header>

        <div className="space-y-8 bg-white dark:bg-[#111111] p-6 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              1. Rutina de Limpieza Diaria
            </h2>
            <p>
              La melamina es una superficie cerrada y no porosa que repele la suciedad con facilidad. Para la limpieza regular:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Usa un paño de microfibra suave o franela ligeramente humedecida con agua tibia.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Si hay grasa leve o huellas dactilares, disuelve unas gotas de jabón líquido neutro o lavavajillas suave.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Pasa inmediatamente un paño seco y limpio para no dejar humedad residual sobre los cantos termoadheridos.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              2. Lo que NUNCA debes usar en melamina
            </h2>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Esponjas de alambre o fibra verde abrasiva:</strong> rayan la película protectora de melamina y eliminan la textura maderada.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Solventes agresivos (Thinner, aguarrás, acetona pura, cloro directo):</strong> degradan el adhesivo de poliuretano de los cantos y decoloran el diseño.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Ceras o lustramuebles a base de silicona:</strong> crean una película grasosa que atrapa el polvo en lugar de proteger el tablero.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              3. Protección contra el calor y objetos cortantes
            </h2>
            <p>
              Aunque los tableros cuentan con alta resistencia térmica superficial:
            </p>
            <p>
              Utiliza siempre posavasos, manteles individuales o tablas para cortar. Nunca apoyes ollas recién salidas del fuego directo o planchas calientes sobre las superficies de melamina sin un aislante térmico.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
