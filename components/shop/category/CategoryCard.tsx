"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowNarrowRight } from "@/utils/icons/actions";

interface CategoryCardProps {
  label: string;
  slug: string;
  imageSrc: string;
  className?: string;
  tag?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  slug,
  imageSrc,
  className = "",
  tag = "Premium",
}) => {
  return (
    <Link
      href={`/productos?category=${slug}`}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 aspect-4/5 shadow-sm hover:shadow hover:shadow-[#4A3728]/15 transition-all duration-1000 ${className}`}
    >
      <Image
        src={imageSrc}
        alt={label}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

      <div className="absolute inset-x-8 bottom-8 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-md font-black text-white uppercase tracking-[0.3em] mb-4">
          {tag}
        </span>
        <h3 className="text-3xl font-black text-white mb-4 leading-none uppercase tracking-tighter">
          {label}
        </h3>
        <div className="flex items-center gap-3 text-[#4A3728] text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white uppercase tracking-widest text-md">
            Ver Colección
          </span>{" "}
          <ArrowNarrowRight width={20} height={20} />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
