export interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tag: string;
  categoryChip?: string;
  whatsappText?: string;
}

export const slides: SlideData[] = [
  {
    id: 0,
    title: "DISEÑAMOS ESPACIOS",
    description: "Muebles a medida con diseño moderno y tableros de alta durabilidad para tu hogar.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1792795094/banner1_xfmpwl.webp",
    link: "/productos?discount=true",
    tag: "Creamos soluciones",
    categoryChip: "A Medida",
    whatsappText: "Hola Muebles Maldonado, me gustaría cotizar un mueble a medida para mi hogar.",
  },
  {
    id: 1,
    title: "COCINAS MODERNAS",
    description: "Diseño ergonómico, distribución inteligente y acabados duraderos fabricados a medida.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781539487/cocina1_of01fb.webp",
    link: "/cocina",
    tag: "Cocinas a Medida",
    categoryChip: "Cocinas",
    whatsappText: "Hola Muebles Maldonado, quiero cotizar el diseño y fabricación de una cocina a medida.",
  },
  {
    id: 2,
    title: "PELÍKANO 2026",
    description: "Nueva Colección Tiempo de Sentir: texturas sincronizadas y calidez europea.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1784327140/Fondo_Colores_Nueva_Coleccio%CC%81n_2025_-_Peli%CC%81kano_jqrtui.webp",
    link: "/catalogo-colores?marca=pelikano",
    tag: "Nuevos Colores & Texturas",
    categoryChip: "Pelíkano",
    whatsappText: "Hola Muebles Maldonado, me interesa ver el muestrario de la colección Pelíkano 2026.",
  },
  {
    id: 3,
    title: "CLOSETS & VESTIDORES",
    description: "Distribución personalizada que une diseño, confort y máxima capacidad de almacenaje.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1786233952/bedroom_yoik6m.webp",
    link: "/closets",
    tag: "Nuevos Diseños",
    categoryChip: "Clósets",
    whatsappText: "Hola Muebles Maldonado, quisiera cotizar un clóset o walking clóset a medida.",
  },
  {
    id: 4,
    title: "DORMITORIOS",
    description: "Camas lineales modernas con veladores flotantes y estructuras reforzadas.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781540970/dormitorio2_bs2vfn.webp",
    link: "/dormitorio",
    tag: "Confort y Estilo",
    categoryChip: "Dormitorio",
    whatsappText: "Hola Muebles Maldonado, me interesa cotizar una cama o mobiliario para dormitorio.",
  },
  {
    id: 5,
    title: "CENTROS DE TV Y SALA",
    description: "Paneles flotantes, repisas lineales y acabados contemporáneos para tu sala.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781542056/muebletv1_zgzn5p.webp",
    link: "/sala",
    tag: "Decoración de Sala",
    categoryChip: "Sala",
    whatsappText: "Hola Muebles Maldonado, quiero cotizar un centro de entretenimiento o panel de TV.",
  },
  {
    id: 6,
    title: "OFICINA & HOME OFFICE",
    description: "Estaciones de trabajo, escritorios y libreros funcionales para tu productividad.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1781542733/oficina1_nninpw.webp",
    link: "/oficina",
    tag: "Home Office",
    categoryChip: "Oficina",
    whatsappText: "Hola Muebles Maldonado, me interesa cotizar un escritorio o mobiliario de oficina.",
  },
  {
    id: 7,
    title: "EDIMCA 2026",
    description: "Colección Momento: sincronía natural y resistencia superior en tableros decorativos.",
    image:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1784329076/momento-2026_exgddo.webp",
    link: "/catalogo-colores?marca=edimca",
    tag: "Sincronía Natural",
    categoryChip: "Edimca",
    whatsappText: "Hola Muebles Maldonado, me gustaría conocer la nueva colección Edimca 2026.",
  },
];
