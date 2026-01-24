export interface Proyecto {
  id: number;
  title: string;
  category: "Cocina" | "Dormitorio" | "Sala" | "Oficina";
  mainImg: string;
  gallery: string[];
}

export const categorias = [
  "Todos",
  "Cocina",
  "Dormitorio",
  "Sala",
  "Oficina",
] as const;

export const proyectos: Proyecto[] = [
  // --- COCINAS ---
  {
    id: 1,
    title: "Cocina Minimalista White",
    category: "Cocina",
    mainImg:
      "https://images.unsplash.com/photo-1556912177-f5133322749a?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556912177-f5133322749a?q=80&w=1200",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200",
    ],
  },
  {
    id: 2,
    title: "Isla Central en Roble",
    category: "Cocina",
    mainImg:
      "https://images.unsplash.com/photo-1556912167-750f08a665a7?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556912167-750f08a665a7?q=80&w=1200",
    ],
  },
  {
    id: 3,
    title: "Gabinete RH Antihumedad",
    category: "Cocina",
    mainImg:
      "https://images.unsplash.com/photo-1565183248280-ca871162bce9?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565183248280-ca871162bce9?q=80&w=1200",
    ],
  },
  {
    id: 4,
    title: "Cocina Concepto Abierto",
    category: "Cocina",
    mainImg:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200",
    ],
  },
  {
    id: 5,
    title: "Alacena Vertical Extraíble",
    category: "Cocina",
    mainImg:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200",
    ],
  },
  {
    id: 6,
    title: "Mobiliario Negro Mate",
    category: "Cocina",
    mainImg:
      "https://images.unsplash.com/photo-1539139102612-f158f2130b6b?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1539139102612-f158f2130b6b?q=80&w=1200",
    ],
  },

  // --- DORMITORIOS ---
  {
    id: 7,
    title: "Walk-in Closet Luxury",
    category: "Dormitorio",
    mainImg:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
    ],
  },
  {
    id: 8,
    title: "Cama Flotante con LED",
    category: "Dormitorio",
    mainImg:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200",
    ],
  },
  {
    id: 9,
    title: "Escritorio Integrado",
    category: "Dormitorio",
    mainImg:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200",
    ],
  },
  {
    id: 10,
    title: "Veladores en Madera Real",
    category: "Dormitorio",
    mainImg:
      "https://images.unsplash.com/photo-1617331140180-e8262094733a?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617331140180-e8262094733a?q=80&w=1200",
    ],
  },
  {
    id: 11,
    title: "Closet Moderno de Pared",
    category: "Dormitorio",
    mainImg:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200",
    ],
  },
  {
    id: 12,
    title: "Tocador con Espejo",
    category: "Dormitorio",
    mainImg:
      "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1200",
    ],
  },

  // --- SALAS ---
  {
    id: 13,
    title: "Panel de TV Madera Nogal",
    category: "Sala",
    mainImg:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1200",
    ],
  },
  {
    id: 14,
    title: "Repisas Flotantes Minimal",
    category: "Sala",
    mainImg:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200",
    ],
  },
  {
    id: 15,
    title: "Consola de Entrada",
    category: "Sala",
    mainImg:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200",
    ],
  },
  {
    id: 16,
    title: "Mesa de Centro Roble",
    category: "Sala",
    mainImg:
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=1200",
    ],
  },
  {
    id: 17,
    title: "Aparador Moderno",
    category: "Sala",
    mainImg:
      "https://images.unsplash.com/photo-1595428774754-3480ff99d284?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1595428774754-3480ff99d284?q=80&w=1200",
    ],
  },
  {
    id: 18,
    title: "Biblioteca Empotrada",
    category: "Sala",
    mainImg:
      "https://images.unsplash.com/photo-1594620302200-9a7622d4a13c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594620302200-9a7622d4a13c?q=80&w=1200",
    ],
  },

  // --- OFICINAS ---
  {
    id: 19,
    title: "Escritorio Corporativo",
    category: "Oficina",
    mainImg:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200",
    ],
  },
  {
    id: 20,
    title: "Home Office Moderno",
    category: "Oficina",
    mainImg:
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=1200",
    ],
  },
  {
    id: 21,
    title: "Estación de Trabajo Dual",
    category: "Oficina",
    mainImg:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
    ],
  },
  {
    id: 22,
    title: "Librero de Oficina",
    category: "Oficina",
    mainImg:
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=1200",
    ],
  },
  {
    id: 23,
    title: "Escritorio de Melamina Premium",
    category: "Oficina",
    mainImg:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
    ],
  },
  {
    id: 24,
    title: "Mueble de Archivo",
    category: "Oficina",
    mainImg:
      "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=1200",
    ],
  },
];
