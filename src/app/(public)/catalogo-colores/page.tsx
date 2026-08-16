import { Metadata } from "next";
import CatalogoColoresClient from "./CatalogoColoresClient";
import { getColors } from "@/features/admin/colors/color.actions";
export const metadata: Metadata = {
  title: "Catálogo de Colores y Texturas de Melamina | Muebles Maldonado",
  description:
    "Explora nuestra variedad de acabados y tonalidades de melamina y madera para la fabricación de tus muebles personalizados en Quito.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/catalogo-colores",
  },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await getColors();
  const colors = res.colors || [];
  return <CatalogoColoresClient initialColors={colors} />;
}