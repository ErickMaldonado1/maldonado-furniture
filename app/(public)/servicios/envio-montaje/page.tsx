import { Metadata } from "next";
import EnvioMontajeClient from "./EnvioMontajeClient";

export const metadata: Metadata = {
  title: "Políticas de Envío e Instalación de Muebles | Muebles Maldonado",
  description: "Detalles sobre el transporte, armado e instalación gratuita de muebles personalizados en Quito y valles cercanos.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/servicios/envio-montaje",
  },
};

export default function Page() {
  return <EnvioMontajeClient />;
}
