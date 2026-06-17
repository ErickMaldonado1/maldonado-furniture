import { Metadata } from "next";
import AsesoriaClient from "./AsesoriaClient";

export const metadata: Metadata = {
  title: "Asesoría en Diseño y Planificación de Muebles | Muebles Maldonado",
  description: "Planificamos y diseñamos en 3D tus clósets, muebles de cocina y oficina para optimizar tus espacios en Quito.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/servicios/asesoria",
  },
};

export default function Page() {
  return <AsesoriaClient />;
}
