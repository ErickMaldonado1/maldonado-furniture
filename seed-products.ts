import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando inserción de productos de prueba...");

  // ==========================================
  // PRODUCTO 1: Velador Test
  // ==========================================
  console.log("Creando Producto 1: Velador Test...");
  const velador = await prisma.product.create({
    data: {
      name: "Velador Test - Diseño Moderno",
      sku: "VEL-TEST-001",
      description:
        "Velador de diseño moderno con múltiples opciones de color y tamaño. Ideal para dormitorios contemporáneos. Espacios optimizados y acabados de lujo.",
      price: 120.0,
      deliveryDays: 5,
      category: "Dormitorio",
      subcategory: "Veladores",
      colors: ["Macadamia", "Tivoli", "Rovere", "Wengue", "Blanco"],
      materials: ["Melamina", "Madera"],
      // 5 imágenes, una por cada color
      images: {
        create: [
          {
            url: "https://placehold.co/800x800/d4a373/fff?text=Macadamia",
            publicId: "velador_macadamia",
            color: "Macadamia",
          },
          {
            url: "https://placehold.co/800x800/8b5a2b/fff?text=Tivoli",
            publicId: "velador_tivoli",
            color: "Tivoli",
          },
          {
            url: "https://placehold.co/800x800/cd853f/fff?text=Rovere",
            publicId: "velador_rovere",
            color: "Rovere",
          },
          {
            url: "https://placehold.co/800x800/3e2723/fff?text=Wengue",
            publicId: "velador_wengue",
            color: "Wengue",
          },
          {
            url: "https://placehold.co/800x800/ffffff/000?text=Blanco",
            publicId: "velador_blanco",
            color: "Blanco",
          },
        ],
      },
      // Crearemos 10 variantes (2 tamaños x 5 colores)
      variants: {
        create: [
          // Opción A: 46x50x40 - $120
          ...["Macadamia", "Tivoli", "Rovere", "Wengue", "Blanco"].map(
            (color, index) => ({
              name: `Opción A - ${color}`,
              sku: `VEL-TEST-001-A-${index + 1}`,
              color: color,
              sizeLabel: "Opción A (Alto: 50cm)",
              price: 120.0,
              dimensions: {
                create: { width: 46, height: 50, depth: 40 },
              },
            })
          ),
          // Opción B: 46x55x40 - $135
          ...["Macadamia", "Tivoli", "Rovere", "Wengue", "Blanco"].map(
            (color, index) => ({
              name: `Opción B - ${color}`,
              sku: `VEL-TEST-001-B-${index + 1}`,
              color: color,
              sizeLabel: "Opción B (Alto: 55cm)",
              price: 135.0,
              dimensions: {
                create: { width: 46, height: 55, depth: 40 },
              },
            })
          ),
        ],
      },
    },
  });
  console.log(`✅ Producto 1 creado con ID: ${velador.id}`);

  // ==========================================
  // PRODUCTO 2: Cama (Producto de prueba)
  // ==========================================
  console.log("Creando Producto 2: Cama Test...");
  const cama = await prisma.product.create({
    data: {
      name: "Cama Contemporánea Test",
      sku: "CAM-TEST-002",
      description:
        "Cama de estilo moderno con variaciones de tamaño y opciones de color. Estructura robusta y acabados premium.",
      price: 250.0, // Precio base (1 plaza y media)
      deliveryDays: 10,
      category: "Dormitorio",
      subcategory: "Camas lineales",
      colors: ["Roble", "Gris Ceniza"],
      materials: ["Madera Sólida", "Melamina"],
      // 2 imágenes, una por cada color
      images: {
        create: [
          {
            url: "https://placehold.co/800x800/a0522d/fff?text=Roble",
            publicId: "cama_roble",
            color: "Roble",
          },
          {
            url: "https://placehold.co/800x800/808080/fff?text=Gris+Ceniza",
            publicId: "cama_gris",
            color: "Gris Ceniza",
          },
        ],
      },
      // Crearemos 6 variantes (3 tamaños x 2 colores)
      variants: {
        create: [
          // 1 plaza y media - $250
          ...["Roble", "Gris Ceniza"].map((color, index) => ({
            name: `1 Plaza y media - ${color}`,
            sku: `CAM-TEST-002-15-${index + 1}`,
            color: color,
            sizeLabel: "1 plaza y media",
            price: 250.0,
            dimensions: {
              create: { width: 105, height: 110, depth: 190 },
            },
          })),
          // 2 plazas - $300
          ...["Roble", "Gris Ceniza"].map((color, index) => ({
            name: `2 Plazas - ${color}`,
            sku: `CAM-TEST-002-20-${index + 1}`,
            color: color,
            sizeLabel: "2 plazas",
            price: 300.0,
            dimensions: {
              create: { width: 135, height: 110, depth: 190 },
            },
          })),
          // 3 plazas - $380
          ...["Roble", "Gris Ceniza"].map((color, index) => ({
            name: `3 Plazas - ${color}`,
            sku: `CAM-TEST-002-30-${index + 1}`,
            color: color,
            sizeLabel: "3 plazas",
            price: 380.0,
            dimensions: {
              create: { width: 200, height: 110, depth: 200 },
            },
          })),
        ],
      },
    },
  });
  console.log(`✅ Producto 2 creado con ID: ${cama.id}`);

  console.log("🎉 Proceso de inserción finalizado exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error al insertar productos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
