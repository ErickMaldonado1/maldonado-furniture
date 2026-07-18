export interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tag: string;
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "COCINAS",
    description: "Diseño y calidad en muebles de cocina a medida.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781539487/cocina1_of01fb.webp",
    link: "/cocina",
    tag: "Cocinas a Medida",
  },
  {
    id: 2,
    title: "PELIKANO",
    description: "Nueva Colección 2026 - Tiempo de Sentir.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1784327140/Fondo_Colores_Nueva_Coleccio%CC%81n_2025_-_Peli%CC%81kano_jqrtui.webp",
    link: "/catalogo-colores",
    tag: "Nuevos colores y texturas",
  },
  {
    id: 3,
    title: "CLOSETS",
    description: "Modernos y elegantes que unen diseño, confort y calidad.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781540116/dormitorio1_yrt2sp.webp",
    link: "/dormitorio/closets",
    tag: "Nuevos diseños",
  },
  {
    id: 4,
    title: "DORMITORIO",
    description: "Camas a medida modernas y lineales.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781540970/dormitorio2_bs2vfn.webp",
    link: "/dormitorio/camas-lineales",
    tag: "Nuevos diseños",
  },
  {
    id: 5,
    title: "SALA",
    description: "Muebles de sala para cada espacio de tu hogar.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781542056/muebletv1_zgzn5p.webp",
    link: "/sala",
    tag: "Decoración de sala",
  },
  {
    id: 6,
    title: "OFICINA",
    description:
      "Muebles de oficina para home office y espacios profesionales.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781542507/oficina_szp6uc.webp",
    link: "/oficina",
    tag: "Home Office",
  },
  {
    id: 7,
    title: "EDIMCA",
    description: "Nueva Colección 2026 - Momento.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1784329076/momento-2026_exgddo.webp",
    link: "/catalogo-colores",
    tag: "Sincronía Natural",
  },
];
