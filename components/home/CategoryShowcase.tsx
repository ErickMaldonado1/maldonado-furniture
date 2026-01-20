"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const categories = [
  {
    name: "Dormitorio",
    image:
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=2070",
    href: "/productos?category=dormitorio",
    span: "lg:col-span-2 lg:row-span-2",
    tag: "Minimalista",
  },
  {
    name: "Sala",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2070",
    href: "/productos?category=sala",
    span: "lg:col-span-1 lg:row-span-1",
    tag: "Escultural",
  },
  {
    name: "Cocina",
    image:
      "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=2070",
    href: "/productos?category=cocina",
    span: "lg:col-span-1 lg:row-span-2",
    tag: "Artesanal",
  },
  {
    name: "Oficina",
    image:
      "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=2070",
    href: "/productos?category=oficina",
    span: "lg:col-span-1 lg:row-span-1",
    tag: "Productivo",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="w-full bg-[#F9F7F2] dark:bg-black py-24 transition-colors duration-500">
      {/* Contenedor centralizado al máximo ancho permitido */}
      <div className="max-w-360 mx-auto px-6 lg:px-12">
        {/* Header alineado a tu paleta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-[#4A3728] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              Explora por Estancias
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white leading-[0.85] tracking-tighter uppercase">
              Espacios <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                que inspiran.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs md:text-right font-medium leading-relaxed">
              Materializamos cada rincón de tu hogar con la precisión de un
              maestro artesano y visión de vanguardia.
            </p>
            <Link
              href="/productos"
              className="group flex items-center gap-3 text-zinc-900 dark:text-white font-black uppercase text-[10px] tracking-[0.2em] border-b-2 border-[#4A3728]/20 hover:border-[#4A3728] pb-2 transition-all"
            >
              Ver Catálogo Completo
              <HiOutlineArrowNarrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Grid Corregido: Altura mínima para asegurar visibilidad en 1440px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 min-h-175 lg:h-187.5">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 ${cat.span} transition-all duration-700 hover:shadow-2xl hover:shadow-[#4A3728]/20 shadow-sm`}
            >
              {/* Imagen con Zoom Suave */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay: Más oscuro abajo para que el texto resalte siempre */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Contenido de la Tarjeta */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[12px] font-black text-white uppercase tracking-[0.3em] mb-3">
                    {cat.tag}
                  </span>

                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-none uppercase tracking-tighter">
                    {cat.name}
                  </h3>

                  {/* Botón que aparece en Hover */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="text-white uppercase tracking-widest text-[10px] font-bold">
                      Descubrir
                    </span>
                    <div className="w-8 h-0.5 bg-[#4A3728]" />
                    <HiOutlineArrowNarrowRight
                      size={18}
                      className="text-white"
                    />
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
