export interface SubCategory {
  sub: string;
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FeaturedCard {
  id: number;
  subcategory: string;
  badge: string;
  badgeColor: "brand";
  title: string;
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
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190706/cama-lineal_s686kh.webp",
        imageAlt: "cama lineal",
      },
      {
        sub: "camas-clasicas",
        label: "Camas Clásicas",
        href: "/dormitorio/camas-clasicas",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190704/cama-clasica_pujgl9.webp",
        imageAlt: "cama clasica",
      },
      {
        sub: "camas-juveniles",
        label: "Camas Juveniles",
        href: "/dormitorio/camas-juveniles",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190705/cama-juvenil_noxqes.webp",
        imageAlt: "cama juvenil",
      },
      {
        sub: "literas",
        label: "Literas",
        href: "/dormitorio/literas",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190708/litera_xirrrj.webp",
        imageAlt: "litera",
      },
      {
        sub: "closets",
        label: "Closets",
        href: "/dormitorio/closets",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190704/armario_tji5kq.webp",
        imageAlt: "closet",
      },
      {
        sub: "comodas",
        label: "Cómodas",
        href: "/dormitorio/comodas",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190707/comoda_fkpkjv.webp",
        imageAlt: "comoda",
      },
      {
        sub: "veladores",
        label: "Veladores",
        href: "/dormitorio/veladores",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190709/velador1_l8ken4.webp",
        imageAlt: "velador",
      },
    ],
    highlightedSub: "dormitorio",
    featuredContent: [
      {
        badge: "Confort",
        badgeColor: "brand",
        title: "Muebles de dormitorio",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769201196/dormitorio-page_eojapw.webp",
        href: "/dormitorio",
        id: 0,
        subcategory: "",
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
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190710/aparador_ayliec.webp",
        imageAlt: "aparador",
      },
      {
        sub: "comedores",
        label: "Comedores",
        href: "/sala/comedores",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190710/comedor_sm9shq.webp",
        imageAlt: "comedor",
      },
      {
        sub: "muebles-tv",
        label: "Muebles tv",
        href: "/sala/muebles-tv",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190713/muebletv_vmoebu.webp",
        imageAlt: "mueble tv",
      },
      {
        sub: "mesas-de-centro",
        label: "Mesas de Centro",
        href: "/sala/mesas-de-centro",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190712/mesa-centro_cgbp9g.webp",
        imageAlt: "mesa centro",
      },
      {
        sub: "recibidores",
        label: "Recibidores",
        href: "/sala/recibidores",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190713/recibidor_g2qukc.webp",
        imageAlt: "recibidor",
      },
    ],
    highlightedSub: "Sala y hogar",
    featuredContent: [
      {
        badge: "Tendencia",
        badgeColor: "brand",
        title: "Muebles de sala",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769201194/sala-page_svem3p.webp",
        href: "/sala",
        id: 0,
        subcategory: "",
      },
    ],
  },
  {
    slug: "cocina",
    label: "Cocina",
    subcategories: [
      {
        sub: "modulares",
        label: "Modulares",
        href: "/cocina/modulares",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190715/gabinete-cocina_cmi7i7.webp",
        imageAlt: "modulares",
      },
      {
        sub: "auxiliares",
        label: "Auxiliares",
        href: "/cocina/auxiliares",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190716/mesa-auxiliar_nhyhcm.webp",
        imageAlt: "auxiliares",
      },
    ],
    highlightedSub: "cocina-a-medida",
    featuredContent: [
      {
        badge: "Funcional",
        badgeColor: "brand",
        title: "Muebles de cocina a medida",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769201198/cocina-page_hrwpwh.webp",
        href: "/cocina/cocina-a-medida",
        id: 0,
        subcategory: "cocina-a-medida",
      },
    ],
  },
  {
    slug: "oficina",
    label: "Oficina",
    subcategories: [
      {
        sub: "archivadores",
        label: "Archivadores",
        href: "/oficina/archivadores",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190718/archivador_clkja6.webp",
        imageAlt: "archivador",
      },
      {
        sub: "escritorios",
        label: "Escritorios",
        href: "/oficina/escritorios",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190718/escritorio_fhpios.webp",
        imageAlt: "escritorio",
      },
      {
        sub: "libreros",
        label: "Libreros",
        href: "/oficina/libreros",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769190719/librero_b25afx.webp",
        imageAlt: "librero",
      },
    ],
    highlightedSub: "oficina",
    featuredContent: [
      {
        badge: "Home Office",
        badgeColor: "brand",
        title: "Diseño profesional",
        imageSrc:
          "https://res.cloudinary.com/dwvruzkll/image/upload/v1769201200/oficina-page_jlagve.webp",
        href: "/oficina",
        id: 0,
        subcategory: "",
      },
    ],
  },
];
