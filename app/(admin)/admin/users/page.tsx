import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Shield, Edit2, Trash2 } from "lucide-react";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    // CAMBIO: Fondo dinámico y color de texto base
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-600 dark:text-zinc-400 pt-24 pb-12 transition-colors">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-white/5 pb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={14} />
            Volver al Panel
          </Link>
          <div className="flex justify-between items-end">
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter ">
              Control deUsuarios
            </h1>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-1">
              Total: {users.length}
            </span>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              // CAMBIO: Fondo de tarjeta, borde y sombra adaptables
              className="bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-5 rounded-full hover:border-zinc-400 dark:hover:border-white/10 transition-all group relative overflow-hidden shadow-sm dark:shadow-xl"
            >
              {/* Actions */}
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-1.5 bg-white dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors border border-zinc-200 dark:border-white/5 shadow-sm">
                  <Edit2 size={10} />
                </button>
                <button className="p-1.5 bg-white dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-red-500 transition-colors border border-zinc-200 dark:border-white/5 shadow-sm">
                  <Trash2 size={10} />
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-white/5 flex items-center justify-center text-[14px] font-black text-zinc-800 dark:text-white italic tracking-tighter shrink-0 ring-2 ring-transparent group-hover:ring-zinc-400 dark:group-hover:ring-white/5 transition-all">
                  {getInitials(user.name)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-tight truncate">
                    {user.name || "Usuario sin nombre"}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-1">
                    <Shield
                      size={10}
                      className={
                        user.role === "ADMIN"
                          ? "text-amber-600 dark:text-amber-500/50"
                          : "text-zinc-400 dark:text-zinc-700"
                      }
                    />
                    <span className="uppercase tracking-[0.1em] font-black">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email footer */}
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-white/5 flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors truncate">
                <Mail size={10} />
                <span className="lowercase truncate">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
        {users.length === 0 && (
          <div className="py-20 text-center text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600 italic">
            No hay usuarios registrados
          </div>
        )}
      </div>
    </div>
  );
}
