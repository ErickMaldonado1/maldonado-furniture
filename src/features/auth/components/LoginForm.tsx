"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [globalError, setGlobalError] = useState<string | null>(
    urlError
      ? "Hubo un problema al autenticar con Google. Inténtalo de nuevo."
      : null,
  );

  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleAuthSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push(callbackUrl);
    }
    router.refresh();
  };

  const onSubmit = async (data: LoginFormData) => {
    setGlobalError(null);
    setIsCredentialsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setGlobalError(
          "Credenciales incorrectas. Verifica tu correo y contraseña.",
        );
        setIsCredentialsLoading(false);
        return;
      }

      handleAuthSuccess();
    } catch {
      setGlobalError(
        "Ocurrió un error inesperado al conectar con el servidor.",
      );
      setIsCredentialsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGlobalError(null);
    setIsGoogleLoading(true);

    try {
      await signIn("google", {
        callbackUrl,
      });
    } catch {
      setGlobalError("No se pudo conectar con el servicio de Google.");
      setIsGoogleLoading(false);
    }
  };

  const isAnyLoading = isCredentialsLoading || isGoogleLoading;

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white dark:bg-[#111111] shadow-xl border border-zinc-200/90 dark:border-zinc-800 overflow-hidden transition-all duration-300">
      <div className="p-7 sm:p-9">
        <header className="mb-6 flex flex-col items-center text-center space-y-2">
          <Link
            href="/"
            className="inline-block transition-transform hover:scale-102"
          >
            <Image
              src="/assets/images/logoA.webp"
              alt="Muebles Maldonado"
              width={160}
              height={48}
              unoptimized
              className="dark:brightness-110"
              priority
            />
          </Link>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Accede a tus pedidos, personalizaciones y catálogo
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {globalError && (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3.5 text-xs font-medium text-red-600 dark:text-red-400 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{globalError}</span>
            </div>
          )}

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 ml-0.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                placeholder="usuario@ejemplo.com"
                disabled={isAnyLoading}
                className={`w-full rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/50 py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                }`}
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 ml-0.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isAnyLoading}
                className={`w-full rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/50 py-3 pl-10 pr-12 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                }`}
              />
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                tabIndex={-1}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Ver contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isAnyLoading}
            className="w-full h-12 flex items-center justify-center rounded-xl bg-[#4A3728] hover:bg-[#3D2C1F] text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] disabled:opacity-60 shadow-md cursor-pointer"
          >
            {isCredentialsLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              <span>Ingresar</span>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-xs font-bold text-zinc-400 uppercase">
            O continúa con
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <button
          type="button"
          disabled={isAnyLoading}
          onClick={handleGoogleSignIn}
          className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-xs active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {isGoogleLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#4A3728]" />
              <span>Conectando...</span>
            </div>
          ) : (
            <>
              <FcGoogle className="text-lg" />
              <span>Google</span>
            </>
          )}
        </button>

        <div className="mt-7 text-center">
          {onSwitchToRegister ? (
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-xs font-medium text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors"
            >
              ¿No tienes una cuenta?{" "}
              <span className="font-bold text-[#4A3728] dark:text-[#D4B896] underline underline-offset-4">
                Crear cuenta
              </span>
            </button>
          ) : (
            <Link
              href="/register"
              className="text-xs font-medium text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors"
            >
              ¿No tienes una cuenta?{" "}
              <span className="font-bold text-[#4A3728] dark:text-[#D4B896] underline underline-offset-4">
                Crear cuenta
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
