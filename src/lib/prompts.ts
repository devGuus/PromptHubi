import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import type { PromptFilters } from "@/types";

function buildWhere(filters: PromptFilters): Prisma.PromptWhereInput {
  const conditions: Prisma.PromptWhereInput[] = [];

  if (filters.q) {
    conditions.push({
      OR: [
        { title: { contains: filters.q } },
        { description: { contains: filters.q } },
        { content: { contains: filters.q } },
        { category: { name: { contains: filters.q } } },
        { tags: { some: { name: { contains: filters.q } } } },
      ],
    });
  }

  if (filters.categorySlug) {
    conditions.push({ category: { slug: filters.categorySlug } });
  }

  if (filters.favoriteOnly) {
    conditions.push({ favorite: true });
  }

  if (filters.tag) {
    conditions.push({ tags: { some: { name: filters.tag } } });
  }

  return conditions.length > 0 ? { AND: conditions } : {};
}

function buildOrderBy(filters: PromptFilters): Prisma.PromptOrderByWithRelationInput {
  switch (filters.sort) {
    case "oldest":
      return { updatedAt: "asc" };
    case "az":
      return { title: "asc" };
    case "za":
      return { title: "desc" };
    case "recent":
    default:
      return { updatedAt: "desc" };
  }
}

export async function getPrompts(filters: PromptFilters) {
  return prisma.prompt.findMany({
    where: buildWhere(filters),
    orderBy: buildOrderBy(filters),
    take: filters.take,
    include: { category: true, tags: true },
  });
}

export async function getPromptById(id: string) {
  return prisma.prompt.findUnique({
    where: { id },
    include: { category: true, tags: true },
  });
}

export async function getSummaryStats() {
  const [total, favorites, categories] = await Promise.all([
    prisma.prompt.count(),
    prisma.prompt.count({ where: { favorite: true } }),
    prisma.category.count(),
  ]);

  return { total, favorites, categories };
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getCategoriesWithCounts() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { prompts: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getPromptCountByCategory(categoryId: string) {
  return prisma.prompt.count({ where: { categoryId } });
}

export async function getAllTagNames() {
  const tags = await prisma.tag.findMany({
    where: { prompts: { some: {} } },
    orderBy: { name: "asc" },
    select: { name: true },
  });

  return tags.map((tag) => tag.name);
}
