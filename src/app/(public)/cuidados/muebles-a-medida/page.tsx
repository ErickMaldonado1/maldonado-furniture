import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo mantener los muebles personalizados en buen estado | Muebles Maldonado",
  description:
    "Pautas esenciales para muebles a medida en Quito: estabilidad, nivelación estructural, ventilación interior y ajustes tras el asentamiento en la vivienda.",
};

export default function MueblesAMedidaCarePage() {
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
            Fabricación Especial
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white leading-tight">
            Cómo mantener muebles personalizados en buen estado
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Un mueble a medida encaja exactamente con las paredes, pisos y techos de tu hogar. Aprende cómo acompañar el asentamiento natural de la edificación y conservar la estructura como el primer día.
          </p>
        </header>

        <div className="space-y-8 bg-white dark:bg-[#111111] p-6 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              1. Asentamiento y Nivelación de la Estructura
            </h2>
            <p>
              En construcciones nuevas o remodelaciones en Quito y los valles, las losas y paredes presentan micropérdidas de nivel con el paso de los meses:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Nuestros muebles modulares incluyen niveladores ajustables ocultos en la base o zócalo. Si notas que una puerta roza levemente tras varios meses, solo requiere ajustar el nivelador correspondiente.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Evita arrastrar muebles empotrados o modulares pesados; si requieres reubicar una pieza modular, vacíala y levántala con al menos dos personas.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              2. Ventilación de Ambientes Interiores
            </h2>
            <p>
              El clima andino de Quito puede alternar días secos y soleados con semanas de lluvia continua:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Abre ventanas y ventila habitaciones al menos 15 a 20 minutos diarios para evitar acumulación de condensación en dormitorios y baños.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Deja una separación mínima de 1 a 2 cm entre muebles traseros no empotrados y paredes perimetrales frías para permitir la circulación de aire.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              3. Soporte Postventa Maldonado
            </h2>
            <p>
              Recuerda que todos nuestros muebles cuentan con garantía de fabricación directa en nuestro taller. Si necesitas reajustar bisagras, cambiar un canto golpeado accidentalmente o añadir repisas complementarias, nuestro equipo está a tu disposición para ayudarte en lo que necesites.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
