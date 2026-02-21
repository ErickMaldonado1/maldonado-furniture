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
  {
    id: 8,
    title: "Muebles de Baño",
    category: "Cocina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534706/17_fh8cts.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534702/17-B_oh9wnc.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534700/17-A_gx12ys.webp",
    ],
  },

  // --- DORMITORIOS ---
  {
    id: 9,
    title: "Cama lineal M101",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899825/cama-lineal-1_f1zutq.webp",
    gallery: [],
  },

  {
    id: 10,
    title: "Cama lineal M105",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769899885/cama-lineal-2_lf1qib.webp",
    gallery: [],
  },
  {
    id: 11,
    title: "Cama lineal Moderna",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534265/10_hd9t9s.webp",
    gallery: [],
  },
  {
    id: 12,
    title: "Velador en madera",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534435/14_tyacxy.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534436/14-A_xexzhx.webp",
    ],
  },
  {
    id: 13,
    title: "Velador en melamina",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534441/8A_adzmp6.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534439/8_sqog1x.webp",
    ],
  },
  {
    id: 14,
    title: "Velador blanco",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534461/16_eqhojh.webp",
    gallery: [],
  },
  {
    id: 15,
    title: "Cama lacada con diseño",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534202/9A_wih5nm.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534201/9_dqde8u.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534198/9B_k3opyv.webp",
    ],
  },

  {
    id: 16,
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
    id: 17,
    title: "Closet corredizo",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533667/1_k1axnq.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533671/2_mxowug.webp",
    ],
  },
  {
    id: 18,
    title: "Closet a medida",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533741/3_dn4fom.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533744/3A_qa8bnf.webp",
    ],
  },
  {
    id: 19,
    title: "Closet color Luna",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533847/4_ffyuc7.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533844/4B_bxeavd.webp",
    ],
  },
  {
    id: 20,
    title: "Closet Roble Natural",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533965/6C_d7lbic.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533963/6_jxvrwr.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771533969/6E_cnjte0.webp",
    ],
  },
  {
    id: 21,
    title: "Closet Carvalo",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900116/closet-6a_mvpwxv.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900101/closet-6_rics1f.webp",
    ],
  },
  {
    id: 22,
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
    id: 23,
    title: "Closet modular Sahara",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900326/closet-7a_q8iguk.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900323/closet-7_t2jvjo.webp",
    ],
  },
  {
    id: 24,
    title: "Closet modular Coñac",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900398/closet-1_b2pnpw.webp",
    gallery: [],
  },
  {
    id: 25,
    title: "Litera a medida",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900439/litera_faqq52.webp",
    gallery: [],
  },
  {
    id: 26,
    title: "Cómoda a medida",
    category: "Dormitorio",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534888/7_zbcyqd.webp",
    gallery: [],
  },

  // --- SALAS ---
  {
    id: 27,
    title: "Mueble de tv - Panel Blanco",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900575/mueble-tv-3_aq9bzu.webp",
    gallery: [],
  },
  {
    id: 28,
    title: "Mueble de tv grande",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900567/mueble-tv-2_jzkve5.webp",
    gallery: [],
  },
  {
    id: 29,
    title: "Mueble de tv personalizado",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535008/15_qple6l.webp",
    gallery: [],
  },
  {
    id: 30,
    title: "Mueble de Tv Manzano con luz led",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900631/mueble-tv-1_zumg0q.webp",
    gallery: [],
  },
  {
    id: 31,
    title: "Panel de Tv Rovere y Wengué",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900624/sala-1_nlzj95.webp",
    gallery: [],
  },
  {
    id: 32,
    title: "Mueble de tv panel Gales Poro",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900627/mueble-tv-4_zfzjon.webp",
    gallery: [],
  },
  {
    id: 33,
    title: "Mueble decorativo",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900775/bar_asgeqw.webp",
    gallery: [],
  },
  {
    id: 34,
    title: "Repisas flotante tipo bar",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900834/repisa_yu5ywx.webp",
    gallery: [],
  },
  {
    id: 35,
    title: "Bancos madera Seike",
    category: "Sala",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771534993/13_fd9odi.webp",
    gallery: [],
  },

  // --- OFICINAS ---
  {
    id: 36,
    title: "Escritorio Corporativo",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900873/oficina-1_fokkrg.webp",
    gallery: [],
  },
  {
    id: 37,
    title: "Escritorio Lino",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771536209/ttamzsiwatzc4b6gn4na_gqd9ou.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771536209/vguonaczrlvire0a72x5_xr8uff.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771536208/fzmvtrxojvuxfkn3eqrw_n12yvj.webp",
    ],
  },
  {
    id: 38,
    title: "Escritorio a medida",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535121/11-A_mlo5k3.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535152/11_lnuwbz.webp",
    ],
  },
  {
    id: 39,
    title: "Escritorio personalizado",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535607/saavqpcbqikbsh1wclcf_fz4a1j.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535607/a7ieraltmnyegpe6zozy_xfs5pi.webp",
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535606/airmilplraoufvxx3fyi_vj7wrm.webp",
    ],
  },
  {
    id: 40,
    title: "Escritorio blanco y negro",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1771535607/hkk6n4cpkcc5daor6ku6_sgtc1d.webp",
    gallery: [],
  },

  {
    id: 41,
    title: "Muebles de Local Comercial",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900864/muebles-local_n5gayy.webp",
    gallery: [
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900867/muebles-local-1_wgto03.webp",
    ],
  },
  {
    id: 42,
    title: "Decorativo de Pared modular con luces",
    category: "Oficina",
    mainImg:
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769900982/mueble-pared_fqqf7d.webp",
    gallery: [],
  },
];
