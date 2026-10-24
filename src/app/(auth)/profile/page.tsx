import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProfileClientView } from "./ProfileClientView";

export const metadata = {
  title: "Mi Perfil | Muebles Maldonado Quito",
  description: "Visualiza y actualiza tu información de cuenta, pedidos y favoritos en Muebles Maldonado.",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
          favorites: true,
        },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          total: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-zinc-50 dark:bg-[#070707] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#D4B896] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Volver a la tienda</span>
          </Link>
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 hover:underline"
            >
              Ir al CMS Administrativo →
            </Link>
          )}
        </div>

        <ProfileClientView user={user} />
      </div>
    </main>
  );
}
