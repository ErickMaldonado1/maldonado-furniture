const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AVAILABLE_COLORS = [
  "Artiko",
  "Bardolino",
  "Wengué",
  "Bellota",
  "Capri",
  "Caramelo",
  "Blanco",
  "Negro",
  "Coñac",
  "Duna",
  "Fumé",
  "Lino",
  "Macadamia",
  "Nacar",
  "Niebla",
  "Panela",
  "Rovere",
  "Tivoli",
  "Alaska",
  "Catania",
  "Cedro Merak",
  "Nogal Paris",
  "Roble Natural",
  "Tintoretto",
  "Carvalo",
  "Cava",
  "Cedro",
  "Fibra",
  "Magma",
];

async function main() {
  console.log("Seeding colors...");
  for (const colorName of AVAILABLE_COLORS) {
    try {
      await prisma.color.upsert({
        where: { name: colorName },
        update: {},
        create: { name: colorName },
      });
      console.log(`Ensured color: ${colorName}`);
    } catch (err) {
      console.error(`Error with ${colorName}:`, err.message);
    }
  }
  console.log("Done seeding colors.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
