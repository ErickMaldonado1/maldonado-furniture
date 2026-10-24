import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Whatsapp,
  Facebook,
  Pinterest,
  BackgroundPattern,
} from "@/utils/icons/social";
import NewsletterForm from "./NewsletterForm";
import { MapPin, Phone, Clock, Sparkles, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0E0E0E] text-zinc-300 pt-16 pb-14 font-sans overflow-hidden border-t border-white/5 selection:bg-[#8B735B] selection:text-white">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <BackgroundPattern />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 text-left">
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="group inline-block transition-transform duration-300 hover:scale-102"
              aria-label="Ir al inicio de Muebles Maldonado"
            >
              <div className="relative w-48 h-12">
                <Image
                  src="/assets/images/logoA1.webp"
                  alt="Muebles Maldonado Quito"
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed max-w-sm">
              Especialistas en fabricación de muebles personalizados en Quito.
              Melaminas de alta resistencia (Pelikano, Masisa y Edimca), corte
              milimétrico computarizado y garantía directa de fábrica.
            </p>

            <div className="space-y-2 pt-1 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4B896] shrink-0 mt-0.5" />
                <span>
                  Sector Condado Alto, norte de Quito (Visitas previa cita)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/593959504842"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium hover:underline"
                >
                  WhatsApp: 095 950 4842
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/593959504842?text=Hola%20Muebles%20Maldonado,%20quisiera%20solicitar%20asesor%C3%ADa%20para%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <Whatsapp className="w-4 h-4 text-white" />
                <span>Asesoría Directa por WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-[#D4B896] uppercase tracking-wider">
              Catálogo
            </h3>
            <nav className="flex flex-col gap-3 text-xs sm:text-sm">
              {[
                { name: "Camas lineales", slug: "/dormitorio/camas-lineales" },
                { name: "Muebles de TV", slug: "/sala/muebles-tv" },
                { name: "Escritorios", slug: "/oficina/escritorios" },
                { name: "Libreros", slug: "/oficina/libreros" },
                { name: "Catálogo de Colores", slug: "/catalogo-colores" },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="text-zinc-400 hover:text-white transition-colors duration-200 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-[#D4B896] uppercase tracking-wider">
              Servicios
            </h3>
            <nav className="flex flex-col gap-3 text-xs sm:text-sm">
              {[
                { name: "Nuestros Proyectos", path: "/proyectos" },
                { name: "Envío - Montaje", path: "/servicios/envio-montaje" },
                { name: "Preguntas Frecuentes", path: "/preguntas-frecuentes" },
                { name: "Términos - Garantía", path: "/terminos-condiciones" },
                { name: "Contacto", path: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-zinc-400 hover:text-white transition-colors duration-200 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Cuidados de Muebles (Span 2) - New Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-[#D4B896] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Cuidado de Muebles
            </h3>
            <nav className="flex flex-col gap-3 text-xs sm:text-sm">
              {[
                { name: "Guía General", path: "/cuidados" },
                { name: "Limpiar Melamina", path: "/cuidados/melamina" },
                {
                  name: "Clósets y Puertas",
                  path: "/cuidados/closets-puertas",
                },
                { name: "Muebles de Cocina", path: "/cuidados/muebles-cocina" },
                {
                  name: "Muebles a Medida",
                  path: "/cuidados/muebles-a-medida",
                },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-zinc-400 hover:text-white transition-colors duration-200 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 5: Suscripción & Novedades (Span 2) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-[#D4B896] uppercase tracking-wider">
              Novedades
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Recibe promociones de temporada y proyectos recientes directamente
              en tu correo.
            </p>
            <div className="w-full">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-medium text-zinc-400 text-center sm:text-left">
            <span>
              Muebles Maldonado © {currentYear}. Todos los derechos reservados.
            </span>
            <span className="hidden sm:inline opacity-30">•</span>
            <Link
              href="/terminos-condiciones"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Términos y Condiciones
            </Link>
            <span className="hidden sm:inline opacity-30">•</span>
            <Link
              href="/cuidados"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Guía de Mantenimiento
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {[
              {
                icon: <Instagram />,
                href: "https://www.instagram.com/muebles_maldonad/",
                label: "Instagram",
              },
              {
                icon: <Facebook />,
                href: "https://www.facebook.com/MueblesMaldonad/",
                label: "Facebook",
              },
              {
                icon: <Whatsapp />,
                href: "https://api.whatsapp.com/send?phone=+593959504842&text=%C2%A1Hola!%20%F0%9F%91%8B%20Muebles%20Maldonado.%20Estoy%20interesado%20en%20obtener%20informaci%C3%B3n%20sobre%20sus%20productos%20y%20servicios.",
                label: "WhatsApp",
              },
              {
                icon: <Pinterest />,
                href: "https://www.pinterest.com/mueblesmaldonadoec/",
                label: "Pinterest",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#8B735B] hover:border-[#8B735B] transition-all duration-300 shadow-sm"
                aria-label={`Ir a ${social.label}`}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
