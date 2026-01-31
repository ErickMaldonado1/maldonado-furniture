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
    title: "Cocina High Gloss Blanco",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899061/cocina-13_o7lfle.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899067/cocina-12_xznbzg.webp",
    ],
  },
  {
    id: 2,
    title: "Cocina High Gloss Negro",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899212/cocina-2_qx9ukx.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899215/cocina-2a_aniwk7.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899211/cocina-1_f70jox.webp",
    ],
  },
  {
    id: 3,
    title: "Cocina Alaska RH",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899366/cocina7a_og5set.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899365/cocina-7_h2vkxi.webp",
    ],
  },
  {
    id: 4,
    title: "Cocina modular Blanco",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899437/cocina-6_nx4cx7.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899436/cocina-5_xrzzqt.webp",
    ],
  },
  {
    id: 5,
    title: "Mobiliario Cocina Nacar y Alaska",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899500/cocina-4_ewzxo3.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899503/cocina-4a_prwpcb.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899504/cocina-9_ctguia.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899500/cocina-3_fqulao.webp",
    ],
  },
  {
    id: 6,
    title: "Cocina Minimalista Ceniza",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769898876/cocina-10_lkkqrb.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769898883/cocina-11_mmdftw.webp",
    ],
  },
  {
    id: 7,
    title: "Muebles de Baño a medida",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899696/mueble-ba%C3%B1o-1_tscub3.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899694/mueble-ba%C3%B1o_ynmcfr.webp",
    ],
  },

  // --- DORMITORIOS ---
  {
    id: 8,
    title: "Cama lineal M101",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899825/cama-lineal-1_f1zutq.webp",
    gallery: [],
  },
  {
    id: 9,
    title: "Cama lineal M105",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899885/cama-lineal-2_lf1qib.webp",
    gallery: [],
  },
  {
    id: 10,
    title: "Walking Closet a medida",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899947/closet-4_i77msn.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899950/closet-5a_kxsvzo.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899949/closet-5_jye7fg.webp",
    ],
  },
  {
    id: 11,
    title: "Closet Carvalo",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900116/closet-6a_mvpwxv.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900101/closet-6_rics1f.webp",
    ],
  },
  {
    id: 12,
    title: "Closet estilo Moderno y Metálico",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900255/closet-9_lnrjyc.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900250/closet-8a_ouuecx.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900252/closet-8_ih3hij.webp",
    ],
  },
  {
    id: 13,
    title: "Closet modular Sahara",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900326/closet-7a_q8iguk.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900323/closet-7_t2jvjo.webp",
    ],
  },
  {
    id: 14,
    title: "Closet modular Coñac",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900398/closet-1_b2pnpw.webp",
    gallery: [],
  },
  {
    id: 15,
    title: "Litera a medida",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900439/litera_faqq52.webp",
    gallery: [],
  },

  // --- SALAS ---
  {
    id: 16,
    title: "Mueble de tv - Panel Blanco",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900575/mueble-tv-3_aq9bzu.webp",
    gallery: [],
  },
  {
    id: 17,
    title: "Mueble de tv grande",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900567/mueble-tv-2_jzkve5.webp",
    gallery: [],
  },
  {
    id: 18,
    title: "Mueble de Tv Manzano con luz led",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900631/mueble-tv-1_zumg0q.webp",
    gallery: [],
  },
  {
    id: 19,
    title: "Panel de Tv Rovere y Wengué",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900624/sala-1_nlzj95.webp",
    gallery: [],
  },
  {
    id: 20,
    title: "Mueble de tv panel Gales Poro",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900627/mueble-tv-4_zfzjon.webp",
    gallery: [],
  },
  {
    id: 21,
    title: "Mueble decorativo",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900775/bar_asgeqw.webp",
    gallery: [],
  },
  {
    id: 22,
    title: "Repisas flotante tipo bar",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900834/repisa_yu5ywx.webp",
    gallery: [],
  },

  // --- OFICINAS ---
  {
    id: 23,
    title: "Escritorio Corporativo",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900873/oficina-1_fokkrg.webp",
    gallery: [],
  },
  {
    id: 24,
    title: "Muebles de Local Comercial",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900864/muebles-local_n5gayy.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900867/muebles-local-1_wgto03.webp",
    ],
  },
  {
    id: 25,
    title: "Decorativo de Pared modular con luces",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900982/mueble-pared_fqqf7d.webp",
    gallery: [],
  },
];
