"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Whatsapp } from "@/utils/icons/social";
import { CheckBadge } from "@/utils/icons/layout";
import { ArrowNarrowRight } from "@/utils/icons/actions";
import { MapPin, Calendar, Ruler, AlertCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Cuéntanos tu Espacio",
    desc: "Envíanos las medidas referenciales, un plano o una foto del lugar que se desea amoblar.",
  },
  {
    num: "02",
    title: "Diseño & Melaminas",
    desc: "Elige la distribución y el catálogo de colores disponible (Pelikano, Edimca, Masisa).",
  },
  {
    num: "03",
    title: "Fabricación en Taller",
    desc: "Corte milimétrico computarizado, cantos termoadheridos y tableros de melamina de alta resistencia.",
  },
  {
    num: "04",
    title: "Envío & Instalación",
    desc: "Entrega e instalación profesional en Quito y valles sin intermediarios.",
  },
];

const previewProjects = [
  {
    title: "Walking Clóset a Medida",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899947/closet-4_i77msn.webp",
    tag: "Dormitorio",
  },
  {
    title: "Cocina High Gloss y Melamina",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899061/cocina-13_o7lfle.webp",
    tag: "Cocina",
  },
  {
    title: "Estación de Trabajo y Librero",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1788456283/desk1_ka40la.webp",
    tag: "Oficina",
  },
];

const LIMITS = {
  width: { min: 30, max: 400, label: "Ancho" },
  height: { min: 30, max: 300, label: "Alto" },
  depth: { min: 15, max: 120, label: "Profundidad" },
};

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]{3,60}$/;
const SECTOR_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s,.-]{3,60}$/;

export default function CustomFurnitureSection() {
  const [furnitureType, setFurnitureType] = useState("Clóset a Medida");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [finish, setFinish] = useState("Melamina Maderada");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [sector, setSector] = useState("El Condado, Quito");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sanitizeNumber = (val: string) => {
    const cleaned = val.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return `${parts[0]}.${parts.slice(1).join("")}`;
    }
    return cleaned;
  };

  const validateField = (field: string, value: string): string | null => {
    if (field === "width") {
      if (!value.trim()) return "El ancho es obligatorio.";
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) return "Ingresa un número positivo.";
      if (num < LIMITS.width.min || num > LIMITS.width.max) {
        return `El ancho debe estar entre ${LIMITS.width.min} y ${LIMITS.width.max} cm.`;
      }
    }
    if (field === "height") {
      if (!value.trim()) return "El alto es obligatorio.";
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) return "Ingresa un número positivo.";
      if (num < LIMITS.height.min || num > LIMITS.height.max) {
        return `El alto debe estar entre ${LIMITS.height.min} y ${LIMITS.height.max} cm.`;
      }
    }
    if (field === "depth") {
      if (!value.trim()) return "La profundidad es obligatoria.";
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) return "Ingresa un número positivo.";
      if (num < LIMITS.depth.min || num > LIMITS.depth.max) {
        return `La profundidad debe estar entre ${LIMITS.depth.min} y ${LIMITS.depth.max} cm.`;
      }
    }
    if (field === "name") {
      const trimmed = value.trim();
      if (!trimmed) return "Por favor escribe tu nombre.";
      if (trimmed.length < 3) return "El nombre debe tener al menos 3 letras.";
      if (!NAME_REGEX.test(trimmed)) return "Ingresa un nombre real válido.";
    }
    if (field === "sector") {
      const trimmed = value.trim();
      if (!trimmed) return "Indica el sector o ciudad.";
      if (trimmed.length < 3)
        return "El sector debe tener al menos 3 caracteres.";
      if (!SECTOR_REGEX.test(trimmed))
        return "Ingresa un sector o ciudad válido.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const wErr = validateField("width", width);
    if (wErr) newErrors.width = wErr;

    const hErr = validateField("height", height);
    if (hErr) newErrors.height = hErr;

    const dErr = validateField("depth", depth);
    if (dErr) newErrors.depth = dErr;

    const nErr = validateField("name", name);
    if (nErr) newErrors.name = nErr;

    const sErr = validateField("sector", sector);
    if (sErr) newErrors.sector = sErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const phone = "593959504842";
    const message = `Hola Muebles Maldonado, quiero cotizar un mueble a medida:
*Tipo de Mueble:* ${furnitureType}
*Medidas Deseadas (cm):*
  - Ancho: ${width} cm
  - Alto: ${height} cm
  - Profundidad: ${depth} cm
*Acabado / Textura:* ${finish}
*Presupuesto Estimado:* ${budget.trim() ? `$${budget.trim()}` : "A convenir"}
*Sector / Ubicación:* ${sector.trim()}
*Nombre del Cliente:* ${name.trim()}

¿Tienen asesoría disponible para coordinar y cotizar?`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
            Fabricamos tu{" "}
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
                Te enviamos un presupuesto preliminar directamente por WhatsApp
                con asesoría técnica sin compromiso.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="tipo-mueble"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Tipo de Mueble
                  </label>
                  <select
                    id="tipo-mueble"
                    name="tipoMueble"
                    value={furnitureType}
                    onChange={(e) => setFurnitureType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-[#D4B896]"
                  >
                    <option value="Clóset o Walking Clóset">
                      Clóset / Walking Clóset
                    </option>
                    <option value="Cocina Integral o Modular">
                      Cocina Integral a Medida
                    </option>
                    <option value="Escritorio o Mueble de Oficina">
                      Escritorio / Home Office
                    </option>
                    <option value="Centro de TV o Panel Flotante">
                      Centro de TV y Sala
                    </option>
                    <option value="Cama o Dormitorio Completo">
                      Cama / Litera a Medida
                    </option>
                    <option value="Mueble de Baño">Mueble de Baño RH</option>
                    <option value="Mobiliario Comercial o Tienda">
                      Mobiliario Comercial
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="acabado-color"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Color o Acabado Preferido
                  </label>
                  <select
                    id="acabado-color"
                    name="acabadoColor"
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-[#D4B896]"
                  >
                    <option value="Melamina Maderada (Roble, Carvalo, Cava)">
                      Maderado Cálido
                    </option>
                    <option value="Blanco Mate o Brillante">
                      Blanco Minimalista
                    </option>
                    <option value="Combinación Madera + Unicolor">
                      Combinación Mixta
                    </option>
                    <option value="Melamina RH Resistente a Humedad">
                      Melamina RH (Cocina/Baño)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="label-premium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#634E3A] dark:text-[#D4B896]" aria-hidden="true" />
                    Medidas Aproximadas de tu Espacio (en Centímetros)
                  </span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Unidad: cm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <div className="relative">
                      <input
                        id="medida-ancho"
                        name="ancho"
                        type="text"
                        inputMode="decimal"
                        placeholder="Ancho (ej. 180)"
                        aria-label="Ancho aproximado en centímetros"
                        value={width}
                        onChange={(e) => {
                          const clean = sanitizeNumber(e.target.value);
                          setWidth(clean);
                          if (errors.width) {
                            setErrors((prev) => ({ ...prev, width: "" }));
                          }
                        }}
                        className={`w-full px-3 py-2 pr-10 rounded-xl border ${
                          errors.width
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-zinc-400 dark:border-zinc-600 focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:ring-[#4A3728] dark:focus:ring-[#D4B896]"
                        } bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-1`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 pointer-events-none" aria-hidden="true">
                        cm
                      </span>
                    </div>
                    {errors.width && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.width}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        id="medida-alto"
                        name="alto"
                        type="text"
                        inputMode="decimal"
                        placeholder="Alto (ej. 220)"
                        aria-label="Alto aproximado en centímetros"
                        value={height}
                        onChange={(e) => {
                          const clean = sanitizeNumber(e.target.value);
                          setHeight(clean);
                          if (errors.height) {
                            setErrors((prev) => ({ ...prev, height: "" }));
                          }
                        }}
                        className={`w-full px-3 py-2 pr-10 rounded-xl border ${
                          errors.height
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-zinc-400 dark:border-zinc-600 focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:ring-[#4A3728] dark:focus:ring-[#D4B896]"
                        } bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-1`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 pointer-events-none" aria-hidden="true">
                        cm
                      </span>
                    </div>
                    {errors.height && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.height}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        id="medida-fondo"
                        name="fondo"
                        type="text"
                        inputMode="decimal"
                        placeholder="Fondo (ej. 55)"
                        aria-label="Fondo aproximado en centímetros"
                        value={depth}
                        onChange={(e) => {
                          const clean = sanitizeNumber(e.target.value);
                          setDepth(clean);
                          if (errors.depth) {
                            setErrors((prev) => ({ ...prev, depth: "" }));
                          }
                        }}
                        className={`w-full px-3 py-2 pr-10 rounded-xl border ${
                          errors.depth
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-zinc-400 dark:border-zinc-600 focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:ring-[#4A3728] dark:focus:ring-[#D4B896]"
                        } bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-1`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 pointer-events-none" aria-hidden="true">
                        cm
                      </span>
                    </div>
                    {errors.depth && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.depth}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="cliente-nombre"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Tu Nombre
                  </label>
                  <input
                    id="cliente-nombre"
                    name="nombreCliente"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name)
                        setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-400 dark:border-zinc-600 focus:border-[#4A3728] dark:focus:border-[#D4B896]"
                    } bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-[#D4B896]`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cliente-sector"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Sector o Ciudad
                  </label>
                  <input
                    id="cliente-sector"
                    name="sectorCliente"
                    type="text"
                    placeholder="Ej. El Condado, Cumbayá, Quito..."
                    value={sector}
                    onChange={(e) => {
                      setSector(e.target.value);
                      if (errors.sector)
                        setErrors((prev) => ({ ...prev, sector: "" }));
                    }}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      errors.sector
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-400 dark:border-zinc-600 focus:border-[#4A3728] dark:focus:border-[#D4B896]"
                    } bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-[#D4B896]`}
                  />
                  {errors.sector && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.sector}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cliente-presupuesto"
                    className="block label-premium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Presupuesto (Opcional)
                  </label>
                  <input
                    id="cliente-presupuesto"
                    name="presupuestoCliente"
                    type="text"
                    placeholder="Ej. $250 - $400"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:border-[#4A3728] dark:focus:border-[#D4B896] focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-[#D4B896]"
                  />
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-between label-premium text-zinc-600 dark:text-zinc-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckBadge
                    className="w-4 h-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  Asesoría técnica y cotización sin costo
                </span>
                <span className="font-mono text-zinc-600 dark:text-zinc-400">
                  095 950 4842
                </span>
              </div>

              <button
                type="submit"
                aria-label="Enviar solicitud de cotización por WhatsApp"
                className="w-full h-12 rounded-full bg-[#166534] hover:bg-[#14532d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 text-white label-premium text-white! font-medium tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
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

            <div className="space-y-4">
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
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#4A3728]/10 dark:bg-[#A6866A]/10 text-[#4A3728] dark:text-[#A6866A] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs pt-2 font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Visita Nuestra Fábrica con Cita Previa
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-5 h-5 pt-2 text-[#4A3728] dark:text-[#A6866A]" />
                    <span className="pt-2">
                      Sector Condado Alto, norte de Quito
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
