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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#111111] text-zinc-300 pt-16 pb-20 font-sans overflow-hidden border-t border-white/5 selection:bg-[#8B735B] selection:text-white">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden">
        <BackgroundPattern />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-3 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 text-center md:text-left">
          <div className="lg:col-span-2 space-y-4 flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="group inline-block transition-transform duration-500 hover:scale-105"
            >
              <div className="relative w-48 h-12">
                <Image
                  src="/assets/images/logoA1.webp"
                  alt="Maldonado Furniture"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-zinc-400 text-sm font-normal leading-relaxed max-w-sm">
              Especialistas en muebles personalizados en Quito, combinando{" "}
              <span className="text-white font-medium">estilo</span>,{" "}
              <span className="text-white font-medium">calidad</span> y{" "}
              <span className="text-white font-medium">funcionalidad</span> para
              crear espacios únicos en tu hogar u oficina.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Fabricación directa con instalación en Quito
            </div>
          </div>

          {/* Columna 2: Catálogo */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold text-[#8B735B]  uppercase">
              Catálogo
            </h3>
            <nav className="flex flex-col gap-3.5 items-center">
              {[
                { name: "Camas lineales", slug: "/dormitorio/camas-lineales" },
                { name: "Muebles de TV", slug: "/sala/muebles-tv" },
                { name: "Escritorios", slug: "/oficina/escritorios" },
                { name: "Libreros", slug: "/oficina/libreros" },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="text-zinc-400 hover:text-white text-sm font-normal transition-all duration-300 hover:translate-x-1 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold text-[#8B735B]  uppercase">
              Servicios
            </h3>
            <nav className="flex flex-col gap-3.5">
              {[
                { name: "Preguntas Frecuentes", path: "/preguntas-frecuentes" },
                { name: "Envío y Montaje", path: "/servicios/envio-montaje" },
                { name: "Nuestros Proyectos", path: "/proyectos" },
                { name: "Contacto", path: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-zinc-400 hover:text-white text-sm font-normal transition-all duration-300 hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold text-[#8B735B]  uppercase">
              Suscríbete
            </h3>
            <div className="w-full max-w-xs md:max-w-none">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-zinc-400">
            <span>Muebles Maldonado © {currentYear}</span>
            <span className="hidden md:block opacity-30">•</span>
            <Link
              href="/terminos-condiciones"
              className="hover:text-white transition-colors"
            >
              Términos y Condiciones
            </Link>
          </div>
          <div className="flex items-center gap-3">
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
                href: "https://api.whatsapp.com/send?phone=+593959504842&text=%C2%A1Hola!%20%F0%9F%91%8B%20Muebles%20Maldonado.%20Estoy%20interesado%20en%20obtener%20informaci%C3%B3n%20sobre%20sus%20productos%20y%20servicios.%20%C2%BFPodr%C3%ADan%20proporcionarme%20m%C3%A1s%20detalles?%20acerca%20de",
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
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#8B735B] hover:border-[#8B735B] transition-all duration-300 shadow-sm"
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
