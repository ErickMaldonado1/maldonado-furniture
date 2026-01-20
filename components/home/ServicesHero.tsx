"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineCube, HiOutlineSupport } from "react-icons/hi";

const ServicesHero = () => {
    const services = [
        {
            icon: HiOutlineCube,
            title: "DISEÑO 3D GRATIS",
            desc: "Visualiza tu espacio antes de fabricar con renders realistas de máxima precisión."
        },
        {
            icon: HiOutlineShieldCheck,
            title: "GARANTÍA TOTAL",
            desc: "Garantizamos la durabilidad de cada pieza gracias al uso de materiales premium."
        },
        {
            icon: HiOutlineSupport,
            title: "INSTALACIÓN EXPERTA",
            desc: "Nuestro equipo técnico asegura un montaje perfecto y sin complicaciones en tu hogar."
        }
    ];

    return (
        <section className="relative py-32 overflow-hidden bg-white dark:bg-black">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative group order-2 lg:order-1">
                    <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl z-10">
                        <Image
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                            alt="Maldonado Service"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#4A3728]/10 mix-blend-multiply" />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center p-8 text-center border-t-4 border-[#4A3728] shadow-2xl z-20 animate-bounce-slow">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">Calidad Certificada</p>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <p className="text-[#4A3728] text-[10px] font-black uppercase tracking-[0.5em] mb-4">Experiencia Premium</p>
                    <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white leading-[0.85] tracking-tighter uppercase mb-12 font-heading">
                        MÁS QUE MUEBLES, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A3728] to-[#5D4037]">SERVICIOS DE ÉLITE.</span>
                    </h2>

                    <div className="space-y-12">
                        {services.map((service, idx) => (
                            <div key={idx} className="flex gap-8 group">
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center text-[#4A3728] border border-zinc-100 dark:border-zinc-800 group-hover:bg-[#4A3728] group-hover:text-white transition-all duration-500 shadow-sm">
                                    <service.icon size={28} />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-2 group-hover:text-[#4A3728] transition-colors font-heading">{service.title}</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-wrap gap-6">
                        <Link
                            href="https://api.whatsapp.com/send/?phone=593959504842"
                            className="px-12 py-5 bg-[#4A3728] text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#4A3728]/30 flex items-center gap-4 uppercase tracking-widest text-[10px]"
                        >
                            Solicitar Asesoría VIP
                            <HiOutlineArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesHero;
