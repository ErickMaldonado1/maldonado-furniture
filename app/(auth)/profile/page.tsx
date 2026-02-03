"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, Logout, Shopping, Settings } from "@/utils/icons/ui";
import { Dashboard } from "@/utils/icons/navigation";
import { Verified } from "@/utils/icons/actions";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4A3728] border-t-transparent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-5xl mx-auto pt-8 md:pt-24">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-[#4A3728] flex items-center justify-center text-white text-3xl font-bold">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </div>
              {isAdmin && (
                <div
                  className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full border-2 border-white dark:border-zinc-900"
                  title="Administrador"
                >
                  <Verified className="w-4.5 h-4.5 text-[#4A3728]" />
                </div>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {user?.name || "Usuario de Muebles Maldonado"}
              </h1>
              <p className="text-zinc-500 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4.5 h-4.5" /> {user?.email}
              </p>
              <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                Cuenta {isAdmin ? "Administrador" : "Cliente"}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
              >
                <Logout className="w-4.5 h-4.5" /> CERRAR SESIÓN
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isAdmin && (
            <div className="md:col-span-2 bg-[#4A3728] rounded-2xl p-6 text-white shadow-lg shadow-[#4A3728]/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Panel de Control Maestro</h2>
                <p className="text-[#D4A373] text-sm italic">
                  Gestiona productos, pedidos y usuarios de la tienda.
                </p>
              </div>
              <Link
                href="/admin"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-[#4A3728] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-[#D4A373] hover:text-white transition-all transform hover:scale-105"
              >
                <Dashboard className="w-5 h-5" />
                Ir al Panel de Administración
              </Link>
            </div>
          )}

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4 text-[#4A3728] dark:text-[#D4A373]">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <Shopping className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Historial de Compras</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4 text-pretty">
              Revisa el estado de tus muebles pedidos y descarga tus facturas.
            </p>
            <Link
              href="/ordenes"
              className="text-sm font-bold text-[#6B4B36] underline underline-offset-4 hover:text-[#4A3728]"
            >
              Ver mis pedidos
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4 text-[#4A3728] dark:text-[#D4A373]">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <Settings className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-lg">Ajustes de Cuenta</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4 text-pretty">
              Actualiza tu teléfono, dirección de entrega y preferencias de
              privacidad.
            </p>
            <Link
              href="/profile/settings"
              className="text-sm font-bold text-[#6B4B36] underline underline-offset-4 hover:text-[#4A3728]"
            >
              Editar perfil
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center text-zinc-400 text-xs uppercase tracking-widest font-medium">
          Muebles Maldonado &copy; 2024 - Calidad que perdura
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
