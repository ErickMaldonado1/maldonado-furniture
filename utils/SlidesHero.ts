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
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769127395/cocina_stp9o1.webp",
    link: "/cocina",
    tag: "Cocinas a Medida",
  },
  {
    id: 2,
    title: "DORMITORIOS",
    description: "Modernos y elegantes que unen diseño, confort y calidad.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769123783/dormitorio_ig6v5k.webp",
    link: "/dormitorio",
    tag: "Nuevos diseños",
  },
  {
    id: 3,
    title: "SALA",
    description: "Muebles de sala para cada espacio de tu hogar.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769124357/sala_jgxncz.webp",
    link: "/sala",
    tag: "Decoración de sala",
  },
  {
    id: 4,
    title: "OFICINA",
    description:
      "Muebles de oficina para home office y espacios profesionales.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769126235/oficina_rzbif0.webp",
    link: "/oficina",
    tag: "Home Office",
  },
];
