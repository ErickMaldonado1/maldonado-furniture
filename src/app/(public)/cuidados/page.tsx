import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Guía de Cuidados y Mantenimiento | Muebles Maldonado Quito",
  description:
    "Recomendaciones técnicas y consejos profesionales para conservar tus muebles de melamina, clósets, cocinas y muebles a medida en óptimas condiciones.",
};

const guides = [
  {
    slug: "/cuidados/melamina",
    title: "Limpieza y Cuidado de Muebles de Melamina",
    badge: "Tableros Pelikano / Masisa / Edimca",
    summary:
      "Técnicas correctas para limpiar superficies melamínicas sin rayar la resina ni opacar el acabado mate o brillante. Productos recomendados y sustancias a evitar.",
  },
  {
    slug: "/cuidados/closets-puertas",
    title: "Conservación de Clósets, Puertas y Rieles",
    badge: "Herrajes y Sistemas Corredizos",
    summary:
      "Mantenimiento preventivo para bisagras de cierre suave, correderas telescópicas pesadas y rodamientos de puertas corredizas en dormitorios y vestidores.",
  },
  {
    slug: "/cuidados/muebles-cocina",
    title: "Cuidados para Muebles de Cocina (Melamina RH)",
    badge: "Resistencia a la Humedad y Calor",
    summary:
      "Consejos de protección frente a vapor, salpicaduras en zócalos y zonas de fregadero. Cuidado de cantos termoadheridos y desengrasado seguro.",
  },
  {
    slug: "/cuidados/muebles-a-medida",
    title: "Mantenimiento Integral de Muebles Personalizados",
    badge: "Nivelación y Estructura",
    summary:
      "Ajustes posteriores a la instalación en Quito, distribución de peso en repisas, prevención del alabeo y ventilación adecuada en ambientes interiores.",
  },
];

export default function CuidadosHubPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-zinc-50 dark:bg-[#070707] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A3728]/10 dark:bg-[#A6866A]/10 text-[#4A3728] dark:text-[#D4B896] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Asesoría Técnica de Fábrica
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-900 dark:text-white leading-tight">
            Guía de Cuidados para tus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A3728] to-[#8B735B] dark:from-[#D4B896] dark:to-[#E0CCA7]">
              Muebles a Medida
            </span>
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Aprende cómo alargar la vida útil de tus muebles fabricados por Muebles Maldonado. Consejos prácticos basados en las especificaciones reales de los tableros y herrajes que utilizamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.slug}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 hover:border-[#4A3728] dark:hover:border-[#A6866A] transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#634E3A] dark:text-[#D4B896] block">
                  {guide.badge}
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-[#4A3728] dark:group-hover:text-[#D4B896] transition-colors">
                  {guide.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-[#4A3728] dark:text-[#D4B896]">
                <span>Leer recomendaciones completas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAF9F7] to-zinc-100 dark:from-zinc-900/60 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4A3728]/10 text-[#4A3728] dark:text-[#D4B896] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                ¿Tienes dudas sobre un mueble específico o una mancha difícil?
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Nuestro taller  te asesora directamente por WhatsApp sin intermediarios.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/593959504842?text=Hola%20Muebles%20Maldonado,%20quisiera%20asesor%C3%ADa%20sobre%20el%20cuidado%20de%20un%20mueble."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full bg-[#4A3728] hover:bg-[#38281B] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
