"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowNarrowRight } from "@/utils/icons/actions";

const categories = [
  {
    name: "Camas Lineales",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769995574/maldonado-furniture/products/revj9kwq1m6cu0dt8was.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/dormitorio/camas-lineales",
    tag: "Minimalista",
  },
  {
    name: "Clósets",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1786233117/dormitorio-page_vyz24g.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/closets",
    tag: "Funcional",
  },
  {
    name: "Cocina",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769127395/cocina_stp9o1.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/cocina/",
    tag: "Integral",
  },
  {
    name: "Cómodas",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1787109140/maldonado-furniture/products/gbtexxwrbpluqyq06gan.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/dormitorio/comodas",
    tag: "Elegante",
  },
  {
    name: "Veladores",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1786982073/maldonado-furniture/products/pmm2otqtsuzbkyozyrv2.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/dormitorio/veladores",
    tag: "Moderno",
  },
  {
    name: "Muebles de TV",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769918623/maldonado-furniture/products/cridxxmounhabfnoxnyo.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/sala/muebles-tv",
    tag: "Escultural",
  },

  {
    name: "Aparadores",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1770158971/maldonado-furniture/products/s1zbhksggqc4meitoraj.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/sala/aparadores",
    tag: "Sofisticado",
  },
  {
    name: "Mesas de Centro",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1770161665/maldonado-furniture/products/piete4kbki8cylmu7psn.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/sala/mesas-de-centro",
    tag: "Central",
  },
  {
    name: "Escritorios",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769954367/maldonado-furniture/products/qw3bewwgy7ednw8ytdcr.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/oficina/escritorios",
    tag: "Productivo",
  },
  {
    name: "Libreros",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1770164331/maldonado-furniture/products/clgysfgzb3ilvfrha6vr.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/oficina/libreros",
    tag: "Estudio",
  },
  {
    name: "Archivadores",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769958515/maldonado-furniture/products/ejh4fky3i6llm7zm7ugn.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/oficina/archivadores",
    tag: "Organización",
  },
  {
    name: "Complementos",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1770162241/maldonado-furniture/products/jcienn2bef6xkqmx0sls.webp?auto=compress&cs=tinysrgb&w=2070",
    href: "/productos",
    tag: "Exclusivo",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-8 md:py-14 bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-10 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
            Nuestras{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              colecciones
            </span>
          </h2>

          <Link
            href="/productos"
            className="group flex items-center gap-2 text-sm md:text-base hover:text-[#4A3728] dark:hover:text-zinc-300 transition-all"
          >
            <span className="hidden sm:inline">VER CATÁLOGO COMPLETO</span>
            <span className="sm:hidden">CATÁLOGO</span>
            <ArrowNarrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform text-[#4A3728]" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className={`group relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 transition-all duration-700 shadow-sm hover:shadow-xl flex flex-col justify-end aspect-[4/5] ${
                idx >= 8 ? "hidden sm:flex" : "flex"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                priority={idx < 6}
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/85 via-black/40 to-transparent pointer-events-none transition-opacity duration-500" />

              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end z-10">
                <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xs sm:text-sm font-medium text-white mb-1  leading-snug drop-shadow-sm">
                    {cat.name}
                  </h3>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] font-semibold -wider uppercase text-white">
                      Explorar
                    </span>
                    <div className="w-2.5 h-px bg-[#A98B6C]" />
                    <ArrowNarrowRight className="w-3 h-3 text-[#A98B6C] transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
