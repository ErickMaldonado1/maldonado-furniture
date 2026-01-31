import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/utils/icons";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#141414] text-white pt-16 pb-16 font-sans overflow-hidden border-t border-white/5 selection:bg-[#4A3728] selection:text-white">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden">
        <Icons.BackgroundPattern />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-8 text-center md:text-left">
          <div className="space-y-4 flex flex-col items-center md:items-start">
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
            <p className="text-zinc-400 text-md font-semibold leading-relaxed">
              Especialistas en muebles personalizados, combinando{" "}
              <span className="text-white">estilo</span>,{" "}
              <span className="text-white">calidad</span> y{" "}
              <span className="text-white">funcionalidad</span> para crear
              espacios únicos.
            </p>
          </div>

          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h3 className="text-md font-black text-[#8B735B] tracking-widest uppercase">
              Catálogo
            </h3>
            <nav className="flex flex-col gap-4">
              {[
                { name: "Camas lineales", slug: "/dormitorio/camas-lineales" },
                { name: "Muebles de TV", slug: "/sala/muebles-tv" },
                { name: "Escritorios", slug: "/oficina/escritorios" },
                { name: "Libreros", slug: "/oficina/libreros" },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="text-zinc-400 hover:text-[#4A3728] dark:hover:text-white text-md font-semibold transition-all duration-300 hover:translate-x-1 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h3 className="text-md font-black text-[#8B735B] tracking-widest uppercase">
              Servicios
            </h3>
            <nav className="flex flex-col gap-4">
              {[
                { name: "Preguntas Frecuentes", path: "/preguntas-frecuentes" },
                { name: "Envío y Montaje", path: "/servicios/envio-montaje" },
                { name: "Nuestros Proyectos", path: "/proyectos" },
                { name: "Contacto", path: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-zinc-400 hover:text-white text-md font-semibold transition-all duration-300 hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h3 className="text-md font-black text-[#8B735B] tracking-widest uppercase">
              Suscríbete
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-bold text-zinc-500 uppercase tracking-widest">
            <span>Muebles Maldonado © {currentYear}</span>
            <span className="hidden md:block opacity-20">|</span>
            <Link
              href="/terminos-condiciones"
              className="hover:text-white transition-colors"
            >
              Términos y Condiciones
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-4">
              {[
                {
                  icon: <Icons.Instagram />,
                  href: "https://www.instagram.com/muebles_maldonad/",
                  label: "Instagram",
                },
                {
                  icon: <Icons.Facebook />,
                  href: "https://www.facebook.com/MueblesMaldonad/",
                  label: "Facebook",
                },
                {
                  icon: <Icons.Whatsapp />,
                  href: "https://api.whatsapp.com/send?phone=+593959504842&text=%C2%A1Hola!%20%F0%9F%91%8B%20Muebles%20Maldonado.%20Estoy%20interesado%20en%20obtener%20informaci%C3%B3n%20sobre%20sus%20productos%20y%20servicios.%20%C2%BFPodr%C3%ADan%20proporcionarme%20m%C3%A1s%20detalles?%20acerca%20de",
                  label: "WhatsApp",
                },
                {
                  icon: <Icons.Pinterest />,
                  href: "https://www.pinterest.com/mueblesmaldonadoec/",
                  label: "Pinterest",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#4A3728] hover:border-[#4A3728] transition-all duration-300"
                  aria-label={`Ir a ${social.label}`}
                >
                  <span className="w-5 h-5">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
