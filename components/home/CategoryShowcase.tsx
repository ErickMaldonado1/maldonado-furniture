"use client";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const categories = [
  {
    name: "Dormitorio",
    image:
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=2070",
    href: "/dormitorio",
    span: "md:col-span-2 md:row-span-2 col-span-1",
    tag: "Minimalista",
  },
  {
    name: "Sala",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2070",
    href: "/sala",
    span: "col-span-1",
    tag: "Escultural",
  },
  {
    name: "Cocina",
    image:
      "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=2070",
    href: "/cocina",
    span: "md:col-span-1 md:row-span-2 col-span-1",
    tag: "Artesanal",
  },
  {
    name: "Oficina",
    image:
      "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=2070",
    href: "/oficina",
    span: "col-span-1",
    tag: "Productivo",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-6 md:py-12 bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            Espacios{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              que inspiran
            </span>
          </h2>

          <Link
            href="/productos"
            className="group flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.15em] transition-all"
          >
            <span className="hidden sm:inline">VER CATÁLOGO COMPLETO</span>
            <span className="sm:hidden">CATÁLOGO</span>
            <HiOutlineArrowNarrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform text-[#4A3728]"
            />
          </Link>
        </div>

        <div className="relative group/container">
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 md:gap-6 h-125 md:h-150 lg:h-175">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`group relative overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900 ${cat.span} transition-all duration-700 shadow-sm`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={idx < 2}
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.2em] mb-2">
                      {cat.tag}
                    </span>

                    <h3 className="text-lg md:text-4xl font-black text-white mb-2 uppercase tracking-tighter leading-none">
                      {cat.name}
                    </h3>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-white uppercase tracking-widest text-[9px] font-bold">
                        Descubrir
                      </span>
                      <div className="w-4 h-px bg-[#4A3728]" />
                      <HiOutlineArrowNarrowRight className="size-6 text-zinc-500 group-hover/btn:text-[#4A3728] transition-colors stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
