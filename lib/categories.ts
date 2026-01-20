export interface SubCategory {
  sub: string;
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FeaturedCard {
  badge: string;
  badgeColor: "accent" | "gold" | "red" | "blue" | "green";
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

export interface Category {
  label: string;
  slug: string;
  subcategories: SubCategory[];
  highlightedSub?: string;
  featuredContent: FeaturedCard[];
}

export const categories: Category[] = [
  {
    label: "Dormitorio",
    slug: "dormitorio",
    subcategories: [
      {
        sub: "camas-lineales",
        label: "Camas Lineales",
        href: "/dormitorio/camas-lineales",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcama-lineal.webp?alt=media&token=5cc9698b-bea9-4d44-b880-c8f7413f8b95",
        imageAlt: "cama lineal",
      },
      {
        sub: "camas-clasicas",
        label: "Camas Clásicas",
        href: "/dormitorio/camas-clasicas",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcama-clasica.webp?alt=media&token=4d5f4d4c-6ae4-4153-9e7e-c77b35eb15d3",
        imageAlt: "cama clasica",
      },
      {
        sub: "camas-juveniles",
        label: "Camas Juveniles",
        href: "/dormitorio/camas-juveniles",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcama-juvenil.webp?alt=media&token=a74e795e-a42d-4720-b25a-5d05dcf3bb3e",
        imageAlt: "cama juvenil",
      },
      {
        sub: "literas",
        label: "Literas",
        href: "/dormitorio/literas",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Flitera.webp?alt=media&token=f8bad6e6-5110-4c46-af5e-1799999c637b",
        imageAlt: "litera",
      },
      {
        sub: "closets",
        label: "Closets",
        href: "/dormitorio/closets",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Farmario.webp?alt=media&token=94ad9f79-fc4a-49b9-886c-28c04bb00904",
        imageAlt: "closet",
      },
      {
        sub: "comodas",
        label: "Cómodas",
        href: "/dormitorio/comodas",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcomoda.webp?alt=media&token=27f7a5fe-dc6d-441c-9d21-21996690db98",
        imageAlt: "comoda",
      },
      {
        sub: "veladores",
        label: "Veladores",
        href: "/dormitorio/veladores",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fvelador1.webp?alt=media&token=083c7f28-411e-42be-848c-040e73021a5c",
        imageAlt: "velador",
      },
    ],
    highlightedSub: "camas-lineales",
    featuredContent: [
      {
        badge: "TENDENCIA",
        badgeColor: "accent",
        title: "Minimalismo Nórdico",
        description: "Descubre la nueva colección",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcama-lineal.webp?alt=media&token=5cc9698b-bea9-4d44-b880-c8f7413f8b95",
        href: "/dormitorio",
      },
      {
        badge: "TOP VENTAS",
        badgeColor: "gold",
        title: "Camas Lineales",
        description: "El favorito de nuestros clientes",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcama-lineal.webp?alt=media&token=5cc9698b-bea9-4d44-b880-c8f7413f8b95",
        href: "/dormitorio/camas-lineales",
      },
      {
        badge: "OFERTA -20%",
        badgeColor: "red",
        title: "Closets a Medida",
        description: "Diseño personalizado incluido",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Farmario.webp?alt=media&token=94ad9f79-fc4a-49b9-886c-28c04bb00904",
        href: "/dormitorio/closets",
      },
      {
        badge: "INSPIRACIÓN",
        badgeColor: "blue",
        title: "Guía de Decoración",
        description: "Tips para tu dormitorio ideal",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcama-clasica.webp?alt=media&token=4d5f4d4c-6ae4-4153-9e7e-c77b35eb15d3",
        href: "/blog/guia-dormitorio",
      },
    ],
  },
  {
    label: "Sala",
    slug: "sala",
    subcategories: [
      {
        sub: "aparadores",
        label: "Aparadores",
        href: "/sala/aparadores",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Faparador.webp?alt=media&token=41974a89-2950-4c22-ba0a-a21717117b22",
        imageAlt: "aparador",
      },
      {
        sub: "comedores",
        label: "Comedores",
        href: "/sala/comedores",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcomedor.webp?alt=media&token=e62987f5-59ce-4557-9f57-493354e28408",
        imageAlt: "comedor",
      },
      {
        sub: "muebles-tv",
        label: "Muebles TV",
        href: "/sala/muebles-tv",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fmuebletv.webp?alt=media&token=fe6606b1-40b7-4450-8559-88c2e64f8070",
        imageAlt: "muebletv",
      },
      {
        sub: "mesas-de-centro",
        label: "Mesas de Centro",
        href: "/sala/mesas-de-centro",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fmesa-centro.webp?alt=media&token=d5df39df-25cb-4da6-a981-e7f97a8fe0be",
        imageAlt: "mesa centro",
      },
      {
        sub: "recibidores",
        label: "Recibidores",
        href: "/sala/recibidores",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Frecibidor.webp?alt=media&token=e1f27c7b-d7b1-47d4-890c-cdb590d4f756",
        imageAlt: "recibidor",
      },
    ],
    highlightedSub: "comedores",
    featuredContent: [
      {
        badge: "NUEVO",
        badgeColor: "green",
        title: "Comedores Modernos",
        description: "Recién llegados de fábrica",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fcomedor.webp?alt=media&token=e62987f5-59ce-4557-9f57-493354e28408",
        href: "/sala/comedores",
      },
      {
        badge: "DESTACADO",
        badgeColor: "accent",
        title: "Muebles TV Premium",
        description: "Diseño y funcionalidad",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fmuebletv.webp?alt=media&token=fe6606b1-40b7-4450-8559-88c2e64f8070",
        href: "/sala/muebles-tv",
      },
    ],
  },
  {
    label: "Cocina",
    slug: "cocina",
    subcategories: [
      {
        sub: "cocina-a-medida",
        label: "Cocina a medida",
        href: "/cocina/cocina-a-medida",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fgabinete.webp?alt=media&token=d25f34cf-1a9a-41f5-a6e5-9a22b5314997",
        imageAlt: "cocina",
      },
      {
        sub: "modulares",
        label: "Modulares",
        href: "/cocina/modulares",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fgabinete-cocina.webp?alt=media&token=541e78ab-eab7-42cb-b71e-cc3ae1cab5ce",
        imageAlt: "modulares",
      },
      {
        sub: "auxiliares",
        label: "Auxiliares",
        href: "/cocina/auxiliares",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fmesa-auxiliar.webp?alt=media&token=c0d1a965-27c9-4265-9b66-2c1e7381e3bb",
        imageAlt: "auxiliares",
      },
    ],
    highlightedSub: "cocina-a-medida",
    featuredContent: [
      {
        badge: "PREMIUM",
        badgeColor: "accent",
        title: "Cocinas a Medida",
        description: "Diseño personalizado total",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fgabinete.webp?alt=media&token=d25f34cf-1a9a-41f5-a6e5-9a22b5314997",
        href: "/cocina/cocina-a-medida",
      },
    ],
  },
  {
    label: "Oficina",
    slug: "oficina",
    subcategories: [
      {
        sub: "archivadores",
        label: "Archivadores",
        href: "/oficina/archivadores",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Farchivador.webp?alt=media&token=93a64c6a-9874-4a8f-bfdf-dc3bf2348c4b",
        imageAlt: "archivador",
      },
      {
        sub: "escritorios",
        label: "Escritorios",
        href: "/oficina/escritorios",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fescritorio.webp?alt=media&token=44330aad-fdf5-431a-a69e-54661d621e92",
        imageAlt: "escritorio",
      },
      {
        sub: "libreros",
        label: "Libreros",
        href: "/oficina/libreros",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Flibrero.webp?alt=media&token=e9905c82-fb95-497e-9430-1292bd04b64d",
        imageAlt: "librero",
      },
    ],
    highlightedSub: "escritorios",
    featuredContent: [
      {
        badge: "PRODUCTIVIDAD",
        badgeColor: "blue",
        title: "Escritorios Ejecutivos",
        description: "Diseño profesional",
        imageSrc:
          "https://firebasestorage.googleapis.com/v0/b/app-muebles-maldonado.appspot.com/o/menu%2Fescritorio.webp?alt=media&token=44330aad-fdf5-431a-a69e-54661d621e92",
        href: "/oficina/escritorios",
      },
    ],
  },
];
