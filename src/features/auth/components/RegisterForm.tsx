"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const ecuadorPhoneRegex = /^09\d{8}$/;

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(60, "Nombre demasiado largo"),
    email: z.string().email("Ingresa un correo electrónico válido"),
    phone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || ecuadorPhoneRegex.test(val), {
        message: "Formato de celular: 09XXXXXXXX (10 dígitos)",
      }),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
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
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          phone: data.phone?.trim() || undefined,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await res.json();
      if (!res.ok)
        throw new Error(resData.message || "Error al registrar la cuenta");

      const loginRes = await signIn("credentials", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (loginRes?.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        router.push("/login");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocurrió un error al crear la cuenta.";
      setGlobalError(message);
      setLoading(false);
    }
  };

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
              Nombre Completo *
            </label>
            <div className="relative">
              <input
                {...register("name")}
                type="text"
                placeholder="Ej. Carlos Paredes"
                disabled={loading}
                className={`w-full rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/50 py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                }`}
              />
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 font-medium ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 ml-0.5">
              Correo Electrónico *
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                placeholder="usuario@ejemplo.com"
                disabled={loading}
                className={`w-full rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/50 py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                }`}
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 ml-0.5">
              Teléfono Celular (Opcional)
            </label>
            <div className="relative">
              <input
                {...register("phone")}
                type="tel"
                placeholder="Ej. 0991234567"
                disabled={loading}
                className={`w-full rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/50 py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                }`}
              />
              <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-500 font-medium ml-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 ml-0.5">
              Contraseña (mínimo 6 caracteres) *
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={loading}
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
              <p className="text-[11px] text-red-500 font-medium ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 ml-0.5">
              Confirmar Contraseña *
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={loading}
                className={`w-full rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/50 py-3 pl-10 pr-12 text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all ${
                  errors.confirmPassword
                    ? "border-red-400 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                }`}
              />
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                tabIndex={-1}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación"
                    : "Ver confirmación"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-500 font-medium ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center rounded-xl bg-[#4A3728] hover:bg-[#3D2C1F] text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] disabled:opacity-60 shadow-md cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creando Cuenta...</span>
                </div>
              ) : (
                <span>Registrarme</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-7 text-center">
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-xs font-medium text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors"
            >
              ¿Ya tienes una cuenta?{" "}
              <span className="font-bold text-[#4A3728] dark:text-[#D4B896] underline underline-offset-4">
                Iniciar sesión
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="text-xs font-medium text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors"
            >
              ¿Ya tienes una cuenta?{" "}
              <span className="font-bold text-[#4A3728] dark:text-[#D4B896] underline underline-offset-4">
                Iniciar sesión
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
