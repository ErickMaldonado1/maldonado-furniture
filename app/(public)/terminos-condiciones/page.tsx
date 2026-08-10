import { Metadata } from "next";
import TerminosCondicionesClient from "./TerminosCondicionesClient";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Servicio | Muebles Maldonado",
  description:
    "Políticas de compra, garantía, devoluciones y fabricación de muebles personalizados de Muebles Maldonado.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/terminos-condiciones",
  },
};

export default function Page() {
  return <TerminosCondicionesClient />;
}
