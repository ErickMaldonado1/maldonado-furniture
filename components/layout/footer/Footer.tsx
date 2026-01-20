"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
 
  HiOutlineArrowRight,
} from "react-icons/hi";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#141414] text-white pt-10 pb-10 font-sans overflow-hidden border-t border-white/5 selection:bg-[#4A3728] selection:text-white">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nodes" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#8B735B" />
              <line x1="50" y1="50" x2="0" y2="0" stroke="#8B735B" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#8B735B" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="50" y2="100" stroke="#8B735B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nodes)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-12">
        
        {/* UPPER SECTION: COMPACT CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-8 text-center md:text-left">
          
          {/* Brand & Mission (Compact) */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Link href="/" className="group inline-block transition-transform duration-500 hover:scale-105">
              <div className="relative w-48 h-12">
                <Image
                  src="/assets/images/logoA1.webp" 
                  alt="Maldonado Furniture"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-zinc-400  text-md font-semibold leading-relaxed ">
              Especialistas en muebles personalizados, combinando <span className="text-white">estilo</span>, <span className="text-white">calidad</span> y <span className="text-white">funcionalidad</span> para crear espacios únicos.
            </p>
            
          </div>

          {/* Highlights & Info (Merged for compactness) */}
          <div className="space-y-6 flex flex-col items-center md:items-start ">
            <h3 className="text-[14px] font-black text-[#8B735B] tracking-widest uppercase">
                Catálogo
            </h3>
            <nav className="flex flex-col gap-4">
              {["Camas lineales", "Muebles de TV", "Escritorios", "Libreros"].map((item) => (
                <Link
                  key={item}
                  href={`/productos?q=${item.toLowerCase()}`}
                  className="text-zinc-400 hover:text-white text-md font-semibold transition-all duration-300 hover:translate-x-1"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h3 className="text-[14px] font-black text-[#8B735B] tracking-widest uppercase">
                Servicios
            </h3>
           <nav className="flex flex-col gap-4">
              {[
                { name: "Preguntas Frecuentes", path: "/preguntas-frecuentes" },
                { name: "Envío y Montaje", path: "/servicios" },
                { name: "Nuestros Proyectos", path: "/proyectos" },
                { name: "Contacto", path: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-zinc-400 hover:text-white text-md font-semibold transition-all duration-300 hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Integrated Newsletter (Clean & Modern) */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
           <h3 className="text-[14px] font-black text-[#8B735B] tracking-widest uppercase">
                Suscríbete
            </h3>
            <div className="w-full space-y-4">
                <p className="text-md text-zinc-500 font-medium">
                    Sé el primero en ver nuestras últimas actualizaciones.
                </p>
                <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        className="w-full bg-white/2 border border-white/5 rounded-xl py-3 px-4 text-md font-medium focus:outline-none focus:border-[#4A3728] transition-all text-white placeholder:text-zinc-700"
                    />
                    <button className="absolute right-2 p-1.5 text-[#8B735B] hover:text-[#4A3728] transition-colors">
                        <HiOutlineArrowRight size={18} />
                    </button>
                </form>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL & FINISH */}
        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
            <span>Muebles Maldonado © {currentYear}</span>
            <span className="hidden md:block opacity-20">|</span>
            <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-6">
              {[
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaWhatsapp />, href: "https://wa.me/593959504842" },
                { icon: <FaPinterestP />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#4A3728] hover:border-[#4A3728] transition-all duration-300"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
            

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
