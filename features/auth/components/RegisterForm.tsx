"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loading } from "@/utils/icons/actions";
import { Eye, EyeOff } from "lucide-react";
interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setGlobalError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Error en el registro");

      const loginRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (loginRes?.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.href = "/shop";
        }
      }
    } catch (err: any) {
      setGlobalError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white dark:bg-zinc-950 shadow border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-all duration-300">
      <div className="p-8 sm:p-10">
        <header className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/assets/images/logoA.webp"
            alt="Muebles Maldonado"
            width={160}
            height={50}
            className="mb-4 dark:brightness-110"
            priority
          />
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {globalError && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm font-medium text-red-600 dark:text-red-400 text-center animate-pulse">
              {globalError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
              Nombre
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Nombre"
              className={`w-full rounded-md border bg-zinc-50 dark:bg-zinc-900/50 py-3.5 px-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-[#6B4B36] focus:ring-[#6B4B36]/20"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
              Correo Electrónico
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="ejemplo@muebles.com"
              className={`w-full rounded-md border bg-zinc-50 dark:bg-zinc-900/50 py-3.5 px-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-[#6B4B36] focus:ring-[#6B4B36]/20"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-md border bg-zinc-50 dark:bg-zinc-900/50 py-3.5 px-4 pr-12 text-sm text-zinc-900 dark:text-zinc-100 transition-all ${
                  errors.password
                    ? "border-red-300"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-[#6B4B36] focus:ring-2 focus:ring-[#6B4B36]/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 flex items-center justify-center rounded-md bg-[#4A3728] text-white text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#3d2d21] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-sm shadow-[#4A3728]/20 overflow-hidden"
              aria-label="register"
            >
              {loading ? (
                <Loading className="w-5 h-6 animate-spin text-xl" />
              ) : (
                <span className="relative z-10 filter">REGISTRARSE</span>
              )}
              <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
            </button>
          </div>
        </form>

        <div className="mt-8 text-center bg-transparent">
          {onSwitchToLogin ? (
            <button
              onClick={onSwitchToLogin}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6B4B36] transition-colors"
              aria-label="sucess-cuenta"
            >
              ¿Ya tienes cuenta?{" "}
              <span className="text-[#6B4B36] underline underline-offset-4 decoration-2">
                Inicia sesión
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6B4B36] transition-colors"
            >
              ¿Ya tienes cuenta?{" "}
              <span className="text-[#6B4B36] underline underline-offset-4 decoration-2">
                Inicia sesión
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
