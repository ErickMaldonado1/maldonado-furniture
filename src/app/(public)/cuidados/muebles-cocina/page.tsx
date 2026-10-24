import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Cuidados de muebles de cocina | Muebles Maldonado",
  description:
    "Recomendaciones para conservar muebles de cocina en melamina RH resistente a humedad. Protección contra vapor, agua en fregaderos y limpieza de grasa.",
};

export default function CocinaCarePage() {
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
            Área de Cocina & Zonas Húmedas
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white leading-tight">
            Cuidados de muebles de cocina (Melamina RH)
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            La cocina es el espacio más exigente del hogar debido a cambios de temperatura, vapor de cocción y humedad. En Maldonado utilizamos melamina RH (Resistente a la Humedad) con cantos termoadheridos de alto gramaje.
          </p>
        </header>

        <div className="space-y-8 bg-white dark:bg-[#111111] p-6 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              1. Control de Vapor Directo
            </h2>
            <p>
              Aunque el tablero RH tolera la humedad ambiental propia de Quito, el vapor continuo y concentrado a alta temperatura puede ablandar los pegamentos de los cantos con los años:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Enciende la campana extractora siempre que hiervas líquidos o cocines a fuego medio/alto.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Ubica hervidores de agua, cafeteras y ollas arroceras fuera de la proyección vertical directa de los muebles aéreos.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              2. Zona del Fregadero y Mesón
            </h2>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Seca los encharcamientos de agua alrededor de la grifería y el borde del mesón (granito o cuarzo) con un secador de cocina.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Revisa semestralmente el sello de silicona fungicida entre el salpicadero y el mesón para evitar filtraciones hacia el mueble bajo.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              3. Eliminación de Grasa sin Dañar el Acabado
            </h2>
            <p>
              Para retirar gotas de aceite o grasa acumulada en puertas y tiradores:
            </p>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
              <p>
                Aplica una solución de agua tibia con un detergente desengrasante multiusos biodegradable (dilución 1:10). Pasa con paño de microfibra en círculos suaves y retira inmediatamente con un paño humedecido en agua limpia. Seca por completo.
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
