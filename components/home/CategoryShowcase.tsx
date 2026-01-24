"use client";
import Image from "next/image";
import Link from "next/link";
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
    <section className="py-12 bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white transition-colors">
              {" "}
              Espacios{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                que inspiran
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <Link
              href="/productos"
              className="group flex items-center gap-3 text-zinc-900 dark:text-white font-bold uppercase text-sm tracking-[0.2em] border-b-2 border-zinc-200 dark:border-zinc-800 hover:border-[#4A3728] pb-3 transition-all duration-300"
            >
              <span>Ver Catálogo Completo</span>
              <HiOutlineArrowNarrowRight
                size={22}
                className="group-hover:translate-x-2 transition-transform duration-300 text-[#4A3728]"
              />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 min-h-175 lg:h-187.5">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className={`group relative overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900 ${cat.span} transition-all duration-700 hover:shadow hover:shadow-[#4A3728]/20 shadow-sm`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[13px] font-black text-white uppercase tracking-[0.2em] mb-3">
                    {cat.tag}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-none uppercase tracking-tighter">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="text-white uppercase tracking-widest text-md font-bold">
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
