import { Metadata } from "next";
import PreguntasFrecuentesClient from "./PreguntasFrecuentesClient";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes sobre Muebles a Medida | Muebles Maldonado",
  description: "Resuelve tus dudas sobre tiempos de entrega, materiales (melamina y madera), formas de pago y costos de envío e instalación en Quito.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/preguntas-frecuentes",
  },
};

export default function Page() {
  return <PreguntasFrecuentesClient />;
}
