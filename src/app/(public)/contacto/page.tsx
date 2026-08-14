import { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto y Asesoría de Diseño de Interiores | Muebles Maldonado",
  description:
    "Cotiza tus muebles personalizados en Quito. Visita nuestra fábrica o contáctanos por WhatsApp para diseñar tus clósets, camas o cocinas.",
  alternates: {
    canonical: "https://mueblesmaldonadoec.com/contacto",
  },
};

export default function Page() {
  return <ContactoClient />;
}
