import { Metadata } from "next";
import ProyectosClient from "./ProyectosClient";

export const metadata: Metadata = {
  title: "Proyectos de Muebles Personalizados Realizados | Muebles Maldonado",
  description: "Galería de cocinas, clósets, muebles de TV y dormitorios diseñados e instalados por Muebles Maldonado en Quito y Ecuador.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/proyectos",
  },
};

export default function Page() {
  return <ProyectosClient />;
}
