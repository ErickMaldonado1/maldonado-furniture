import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Recomendaciones para conservar clósets y puertas | Muebles Maldonado",
  description:
    "Mantenimiento preventivo para herrajes, bisagras de cierre suave, rieles corredizos y distribución de peso en clósets y vestidores a medida.",
};

export default function ClosetsPuertasCarePage() {
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
            Dormitorios & Vestidores
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white leading-tight">
            Recomendaciones para conservar clósets y puertas
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Los clósets y vestidores soportan uso diario constante. Conocer el funcionamiento de sus herrajes y sistemas de rodadura garantiza un deslizamiento suave y silencioso durante años.
          </p>
        </header>

        <div className="space-y-8 bg-white dark:bg-[#111111] p-6 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              1. Cuidado de Bisagras de Cierre Suave (Soft Close)
            </h2>
            <p>
              Nuestros muebles incorporan bisagras hidráulicas diseñadas para amortiguar el cierre de las puertas batientes:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>No forzar el cierre:</strong> Deja que el pistón hidráulico complete el movimiento de manera automática. Empujar la puerta con fuerza desgasta el mecanismo prematuramente.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Calibración de tornillos:</strong> Cada 6 a 12 meses, un ligero ajuste con destornillador en los tornillos de nivelación de la bisagra mantendrá la alineación milimétrica de las puertas.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              2. Mantenimiento de Rieles y Puertas Corredizas
            </h2>
            <p>
              El principal enemigo de los rodamientos inferiores en puertas corredizas es el polvo acumulado:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Aspira el canal inferior del riel de aluminio una vez al mes para evitar que pelusas o residuos traben las ruedas de nylon.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Aplica spray de silicona seca o teflón en los rodamientos si notas resistencia; evita aceites grasos que atraigan polvo.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              3. Distribución Balanceada de Carga
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div className="space-y-1 text-xs">
                <strong className="block font-bold">Consejo de sobrecarga:</strong>
                <p>
                  Distribuye abrigos pesados a lo largo del tubo ovalado y no concentres maletas excesivamente pesadas en el centro de las repisas voladas sin apoyo inferior.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
