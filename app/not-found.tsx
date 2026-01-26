"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

export default function NotFound() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8 bg-white dark:bg-[#050505]">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#4A3728]">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white sm:text-6xl">
          Pieza no <br className="sm:hidden" /> encontrada
        </h1>

        <p className="mt-6 text-base leading-7 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Lo sentimos, esta página no existe. Serás redirigido al inicio
          automáticamente en{" "}
          <span className="font-bold text-zinc-900 dark:text-white">
            {seconds} segundos...
          </span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-[#4A3728] dark:hover:bg-zinc-200 transition-all duration-300 shadow-xl"
          >
            <HiOutlineArrowLongLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            Volver ahora
          </Link>
        </div>

        <div className="mt-20 opacity-10 dark:opacity-5">
          <span className="text-[120px] font-black tracking-tighter select-none">
            MF
          </span>
        </div>
      </div>
    </main>
  );
}
