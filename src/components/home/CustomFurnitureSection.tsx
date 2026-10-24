"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Whatsapp } from "@/utils/icons/social";
import { CheckBadge } from "@/utils/icons/layout";
import { Sparkles, ArrowNarrowRight } from "@/utils/icons/actions";

const steps = [
  {
    num: "01",
    title: "1. Cuéntanos tu Espacio",
    desc: "Envíanos tus medidas tentativas, un plano o una foto del lugar que deseas amoblar.",
  },
  {
    num: "02",
    title: "2. Diseño & Melaminas",
    desc: "Elegimos juntos la distribución y el catálogo de colores (Pelikano, Edimca, Masisa).",
  },
  {
    num: "03",
    title: "3. Fabricación en Taller",
    desc: "Corte milimétrico computarizado, cantos termoadheridos y tableros de melamina de alta resistencia.",
  },
  {
    num: "04",
    title: "4. Envío & Instalación",
    desc: "Entrega e instalación profesional y limpia en Quito y valles sin intermediarios.",
  },
];

const previewProjects = [
  {
    title: "Walking Clóset a Medida",
    image: "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899947/closet-4_i77msn.webp",
    tag: "Dormitorio",
  },
  {
    title: "Cocina High Gloss y Melamina",
    image: "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899061/cocina-13_o7lfle.webp",
    tag: "Cocina",
  },
  {
    title: "Estación de Trabajo y Librero",
    image: "https://res.cloudinary.com/dwvruzkll/image/upload/v1788456283/desk1_ka40la.webp",
    tag: "Oficina",
  },
];

export default function CustomFurnitureSection() {
  const [furnitureType, setFurnitureType] = useState("Clóset a Medida");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [finish, setFinish] = useState("Melamina Maderada");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [sector, setSector] = useState("Quito");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "593959504842";
    const message = `Hola Muebles Maldonado, quiero cotizar un mueble a medida:
*Tipo de Mueble:* ${furnitureType}
*Medidas Deseadas:*
  - Ancho / Largo: ${width || "Por definir"}
  - Alto: ${height || "Por definir"}
  - Profundidad: ${depth || "Por definir"}
*Acabado / Textura:* ${finish}
*Presupuesto Estimado:* ${budget ? `$${budget}` : "A convenir"}
*Sector / Ciudad:* ${sector}
*Nombre:* ${name || "Cliente interesado"}

¿Tienen asesoría disponible para coordinar y cotizar?`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 label-premium text-[#634E3A] dark:text-[#D4B896] mb-3">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Servicio Exclusivo en Quito y Valles
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
            Fabricamos tu {" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037] dark:from-[#C4A482] dark:to-[#E0CCA7]">
              proyecto a Medida
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-[#FAF9F7] dark:bg-zinc-900/40 relative overflow-hidden group hover:border-[#634E3A]/50 transition-all duration-300"
            >
              <span className="text-2xl font-semibold text-[#634E3A] dark:text-[#D4B896] block mb-2 font-mono">
                {st.num}
              </span>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                {st.title}
              </h3>
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 bg-[#FAF9F7] dark:bg-zinc-900/50 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="mb-6">
              <span className="label-premium text-[#634E3A] dark:text-[#D4B896] block">
                Cotización Rápida
              </span>
              <h3 className="text-xl font-medium text-zinc-900 dark:text-white mt-1">
                Solicita tu Proforma Personalizada
              </h3>
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">
                Te enviamos un presupuesto preliminar directamente por WhatsApp sin compromiso.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tipo-mueble" className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Tipo de Mueble
                  </label>
                  <select
                    id="tipo-mueble"
                    name="tipoMueble"
                    value={furnitureType}
                    onChange={(e) => setFurnitureType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  >
                    <option value="Clóset o Walking Clóset">Clóset / Walking Clóset</option>
                    <option value="Cocina Integral o Modular">Cocina Integral a Medida</option>
                    <option value="Escritorio o Mueble de Oficina">Escritorio / Home Office</option>
                    <option value="Centro de TV o Panel Flotante">Centro de TV y Sala</option>
                    <option value="Cama o Dormitorio Completo">Cama / Litera a Medida</option>
                    <option value="Mueble de Baño">Mueble de Baño RH</option>
                    <option value="Mobiliario Comercial o Tienda">Mobiliario Comercial</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="acabado-color" className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Color o Acabado Preferido
                  </label>
                  <select
                    id="acabado-color"
                    name="acabadoColor"
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  >
                    <option value="Melamina Maderada (Roble, Carvalo, Cava)">Maderado Cálido</option>
                    <option value="Blanco Mate o Brillante">Blanco Minimalista</option>
                    <option value="Grafito / Negro Mate">Grafito / Antracita</option>
                    <option value="Combinación Madera + Unicolor">Combinación Mixta</option>
                    <option value="Melamina RH Resistente a Humedad">Melamina RH</option>
                  </select>
                </div>
              </div>

              <div>
                <span className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                  Medidas Aproximadas de tu espacio
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    id="medida-ancho"
                    name="ancho"
                    type="text"
                    placeholder="Ancho (ej. 180cm)"
                    aria-label="Ancho aproximado en centímetros"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                  <input
                    id="medida-alto"
                    name="alto"
                    type="text"
                    placeholder="Alto (ej. 220cm)"
                    aria-label="Alto aproximado en centímetros"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                  <input
                    id="medida-fondo"
                    name="fondo"
                    type="text"
                    placeholder="Fondo (ej. 55cm)"
                    aria-label="Fondo aproximado en centímetros"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="cliente-nombre" className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Tu Nombre
                  </label>
                  <input
                    id="cliente-nombre"
                    name="nombreCliente"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                </div>
                <div>
                  <label htmlFor="cliente-sector" className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Sector en Quito
                  </label>
                  <input
                    id="cliente-sector"
                    name="sectorCliente"
                    type="text"
                    placeholder="Ej. El Condado, Cumbayá..."
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                </div>
                <div>
                  <label htmlFor="cliente-presupuesto" className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1">
                    Presupuesto (Opcional)
                  </label>
                  <input
                    id="cliente-presupuesto"
                    name="presupuestoCliente"
                    type="text"
                    placeholder="Ej. $250 - $400"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                  />
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-between label-premium text-zinc-600 dark:text-zinc-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckBadge className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  Asesoría técnica y cotización sin costo
                </span>
                <span className="font-mono text-zinc-600 dark:text-zinc-400">095 950 4842</span>
              </div>

              <button
                type="submit"
                aria-label="Enviar solicitud de cotización por WhatsApp"
                className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 text-white label-premium text-white! font-medium tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Whatsapp className="w-5 h-5 text-white" aria-hidden="true" />
                <span>Enviar Solicitud a WhatsApp</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="label-premium text-zinc-700 dark:text-zinc-300">
                Proyectos Entregados Recientemente
              </span>
              <Link
                href="/proyectos"
                aria-label="Ver todos los proyectos entregados"
                className="label-premium text-[#634E3A] dark:text-[#D4B896] hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#634E3A] rounded"
              >
                <span>Ver proyectos</span>
                <ArrowNarrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-3">
              {previewProjects.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-[#FAF9F7] dark:bg-zinc-900/40"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="label-premium text-[#634E3A] dark:text-[#D4B896]">
                      {p.tag}
                    </span>
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                      {p.title}
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Fabricado a medida con tableros de melamina de alta calidad.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-amber-200/60 dark:border-amber-900/30 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 space-y-1">
              <span className="label-premium text-amber-900 dark:text-amber-200 block">🏢 Visítanos en Fábrica:</span>
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                El Condado Alto, Quito. Conoce nuestro muestrario físico de melaminas y acabados agendando una cita previa por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
