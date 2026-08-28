import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Marketing", slug: "marketing" },
  { name: "Atendimento", slug: "atendimento" },
  { name: "E-commerce", slug: "e-commerce" },
  { name: "Imagem", slug: "imagem" },
  { name: "Vídeo", slug: "video" },
  { name: "Texto", slug: "texto" },
  { name: "Comunicação", slug: "comunicacao" },
  { name: "Produtividade", slug: "produtividade" },
  { name: "Programação", slug: "programacao" },
  { name: "Outros", slug: "outros" },
];

async function main() {
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
  }

  console.log(`Seeded ${CATEGORIES.length} categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
