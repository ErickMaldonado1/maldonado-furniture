import { getColors } from "@/features/admin/color.actions";
import ColorClient from "@/app/(admin)/admin/colors/ColorClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestión de Colores | Admin",
};

export const dynamic = "force-dynamic";

export default async function ColorsAdminPage() {
  const res = await getColors();
  const colors = res.colors || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Gestión de{" "}
          <span className="text-[#4A3728] dark:text-[#A6866A]">Colores</span>
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Administra los colores disponibles y su empresa de origen.
        </p>
      </div>
      <ColorClient initialColors={colors} />
    </div>
  );
}
