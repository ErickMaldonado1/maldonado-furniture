export function getProductHighlights(
  category?: string | null,
  subcategory?: string | null,
  description?: string | null,
): string[] {
  const normCat = (category || "").toLowerCase().trim();
  const normSub = (subcategory || "").toLowerCase().trim();

  if (normCat.includes("dormitorio") || normCat.includes("bedroom")) {
    if (normSub.includes("camas-lineales") || normSub.includes("lineal")) {
      return [
        "Estructura de madera maciza reforzada con gran durabilidad",
        "Diseño elegante ideal para optimizar el descanso en el dormitorio",
      ];
    }
    if (normSub.includes("juvenil") || normSub.includes("camas-juveniles")) {
      return [
        "Diseño funcional y ergonómico adaptado para jóvenes y niños",
        "Acabados duraderos de alta resistencia y fácil limpieza",
        "Maximización de espacio en habitaciones juveniles",
      ];
    }
    if (normSub.includes("litera")) {
      return [
        "Estructura de alta resistencia con barreras de seguridad integradas",
        "Aprovechamiento máximo del espacio vertical en dormitorios",
        "Escalera reforzada de seguro acceso",
      ];
    }
    if (normSub.includes("closet") || normSub.includes("armario")) {
      return [
        "Gran capacidad de almacenamiento con compartimentos organizados",
        "Herrajes metálicos de alta durabilidad y suave deslizamiento",
        "Diseño moderno y elegante que complementa la habitación",
      ];
    }
    if (normSub.includes("comoda") || normSub.includes("cómoda")) {
      return [
        "Cajones con rieles telescópicos de apertura suave y silenciosa",
        "Diseño compacto y versátil ideal para prendas y accesorios",
        "Superficie superior amplia para objetos decorativos",
      ];
    }
    if (normSub.includes("velador") || normSub.includes("mesita")) {
      return [
        "Acceso cómodo y rápido al costado de la cama",
        "Cajones auxiliares para organización personal de noche",
        "Acabado protector resistente al uso diario",
      ];
    }
    return [
      "Diseño ergonómico diseñado para un descanso reparador",
      "Materiales seleccionados de alta calidad y durabilidad",
      "Acabados elegantes que realzan el estilo de tu dormitorio",
    ];
  }

  if (normCat.includes("sala") || normCat.includes("living")) {
    if (normSub.includes("aparador") || normSub.includes("buffet")) {
      return [
        "Amplio almacenamiento interno con repisas ajustables",
        "Estética contemporánea ideal para salones y comedores",
        "Acabados de lujo en melamina y maderas",
      ];
    }
    if (normSub.includes("comedor") || normSub.includes("mesa-comedor")) {
      return [
        "Mesa robusta con superficie de fácil mantenimiento y protección",
        "Estructura firme para reuniones familiares diarias",
      ];
    }
    if (normSub.includes("tv") || normSub.includes("centro-entretenimiento")) {
      return [
        "Pasacables integrados para una instalación limpia y organizada",
        "Compartimentos especiales para consolas, decodificadores y audio",
        "Soporte estructural y resistente para televisores de gran formato",
      ];
    }
    if (normSub.includes("centro") || normSub.includes("mesas-centro")) {
      return [
        "Diseño geométrico elegante que se convierte en el centro del salón",
        "Superficie tratada resistente a rayones y derrames",
        "Estructura estable de larga vida útil",
      ];
    }
    if (normSub.includes("recibidor") || normSub.includes("hall")) {
      return [
        "Diseño estilizado de bajo perfil ideal para entradas",
        "Superficie y estantes auxiliares para llaves y accesorios",
        "Acabados modernos que brindan una cálida bienvenida",
      ];
    }
    return [
      "Diseño contemporáneo que eleva la estética del hogar",
      "Construcción sólida y confort asegurado para el día a día",
      "Materiales prémium resistentes al desgaste",
    ];
  }

  if (normCat.includes("cocina") || normCat.includes("kitchen")) {
    if (normSub.includes("modular") || normSub.includes("modulares")) {
      return [
        "Módulos adaptables a cualquier distribución de cocina",
        "Bisagras y rieles con cierre suave anti-golpe",
        "Materiales resistentes a la humedad y vapor",
      ];
    }
    if (normSub.includes("auxiliar") || normSub.includes("auxiliares")) {
      return [
        "Estantes y carritos multifuncionales de rápida organización",
        "Espacio extra de almacenamiento para despensa y electrodomésticos",
        "Superficies de fácil desinfección y mantenimiento",
      ];
    }
    return [
      "Mueble funcional diseñado para optimizar las labores de cocina",
      "Superficies higiénicas y resistentes al uso constante",
      "Almacenamiento inteligente para utencilios y electrodomésticos",
    ];
  }

  if (normCat.includes("oficina") || normCat.includes("office")) {
    if (normSub.includes("archivador")) {
      return [
        "Rieles de carga pesada aptos para carpetas colgantes",
        "Construcción metálica/madera reforzada",
      ];
    }
    if (normSub.includes("escritorio")) {
      return [
        "Superficie ergonómica de trabajo con amplio espacio",
        "Gestión integrada de cables y soporte para monitores",
      ];
    }
    if (normSub.includes("librero") || normSub.includes("estanteria")) {
      return [
        "Repisas de alta capacidad de carga para libros y carpetas",
        "Diseño modular que se adapta a oficinas y despachos",
      ];
    }
    return [
      "Ergonomía y productividad para tu espacio de trabajo",
      "Materiales de alta durabilidad para uso profesional",
      "Diseño ordenado para optimizar la concentración",
    ];
  }
  return [
    "Diseño exclusivo fabricado con materiales de primera calidad",
    "Garantía directa de fábrica y soporte de servicio",
    "Estructura sólida pensada para el máximo confort y durabilidad",
  ];
}
