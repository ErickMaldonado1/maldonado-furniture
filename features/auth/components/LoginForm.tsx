"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {Loading } from "@/utils/icons/index";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (urlError) {
      setGlobalError("Hubo un problema al iniciar sesión con Google.");
    }
  }, [urlError]);

  const handleAuthSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
    router.refresh();
  };

  const onSubmit = async (data: LoginFormData) => {
    setGlobalError(null);
    setIsCredentialsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.error) {
        setGlobalError("Credenciales incorrectas. Inténtalo de nuevo.");
        setIsCredentialsLoading(false);
        return;
      }

      handleAuthSuccess();
    } catch (error) {
      setGlobalError("Ocurrió un error inesperado.");
      setIsCredentialsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGlobalError(null);
    setIsGoogleLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      setGlobalError("No se pudo conectar con Google.");
      setIsGoogleLoading(false);
    }
  };
  const isAnyLoading = isCredentialsLoading || isGoogleLoading;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white dark:bg-zinc-950 shadow border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-all duration-300">
      <div className="p-8 sm:p-8">
        <header className="mb-4 flex flex-col items-center text-center">
          <Image
            src="/assets/images/logoA.webp"
            alt="Muebles Maldonado"
            width={160}
            height={50}
            className="mb-4 dark:brightness-110"
            priority
          />
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {globalError && (
            <div className="rounded-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm font-medium text-red-600 dark:text-red-400 text-center animate-pulse">
              {globalError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
              Correo Electrónico
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="admin@ejemplo.com"
              disabled={isAnyLoading}
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
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              disabled={isAnyLoading}
              className={`w-full rounded-md border bg-zinc-50 dark:bg-zinc-900/50 py-3.5 px-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-[#6B4B36] focus:ring-[#6B4B36]/20"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isAnyLoading}
            className="group relative w-full h-12 flex items-center justify-center rounded-md bg-[#4A3728] text-white text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#3d2d21] active:scale-[0.98] disabled:opacity-70 shadow-sm shadow-[#4A3728]/20 overflow-hidden"
          >
            {isCredentialsLoading ? (
              <Loading className="w-5 h-5 animate-spin text-xl" />
            ) : (
              <span className="relative z-10 filter">ACCEDER</span>
            )}
            <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-sm font-black text-zinc-400 tracking-widest">
            O
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <button
          type="button"
          disabled={isAnyLoading}
          onClick={handleGoogleSignIn}
          className="group relative flex h-12 w-full items-center justify-center gap-3 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        >
          {isGoogleLoading ? (
            <Loading className="w-5 h-6 animate-spin text-xl text-[#4A3728]" />
          ) : (
            <>
              <FcGoogle className="text-xl" />
              <span>CONTINUAR CON GOOGLE</span>
            </>
          )}
          <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-zinc-500/5" />
        </button>

        <div className="mt-8 text-center bg-transparent">
          {onSwitchToRegister ? (
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6B4B36] transition-colors"
            >
              ¿No tienes cuenta?{" "}
              <span className="text-[#6B4B36] underline underline-offset-4 decoration-2">
                Regístrate ahora
              </span>
            </button>
          ) : (
            <Link
              href="/register"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6B4B36] transition-colors"
            >
              ¿No tienes cuenta?{" "}
              <span className="text-[#6B4B36] underline underline-offset-4 decoration-2">
                Regístrate ahora
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
