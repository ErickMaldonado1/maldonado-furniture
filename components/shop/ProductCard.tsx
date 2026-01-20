"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineHeart, HiOutlineArrowRight } from "react-icons/hi";

type Props = {
  product: any;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const imageUrl = product.images?.[0]?.url || "/assets/images/placeholder.png";

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(132,93,64,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 dark:bg-zinc-800">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Actions */}
        <div className="absolute top-6 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="w-12 h-12 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md text-zinc-900 dark:text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#4A3728] hover:text-white transition-all">
            <HiOutlineHeart size={20} />
          </button>
        </div>

        {/* Brand Tag */}
        <div className="absolute top-6 left-6 px-3 py-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-[#4A3728] shadow-sm">
          Edición Limitada
        </div>
      </div>

      {/* Details */}
      <div className="p-8 flex flex-col items-center text-center">
        <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 leading-tight font-heading">
          {product.name}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 line-clamp-2 italic">
          {product.description || "Un diseño único con acabados en nogal y pizarra."}
        </p>

        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-6" />

        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-black text-zinc-900 dark:text-white italic tracking-tighter">
            ${product.price ? product.price.toLocaleString() : "Consultar"}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="w-12 h-12 bg-zinc-900 dark:bg-zinc-700 text-white dark:text-white rounded-full flex items-center justify-center group-hover:bg-[#4A3728] dark:group-hover:bg-[#4A3728] transition-all transform hover:rotate-[-45deg] shadow-lg"
          >
            <HiOutlineArrowRight size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
