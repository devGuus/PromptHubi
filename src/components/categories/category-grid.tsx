import Link from "next/link";
import type { Category } from "@/generated/prisma/client";

type CategoryWithCount = Category & { _count: { prompts: number } };

export function CategoryGrid({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
        >
          <span className="text-sm font-medium text-foreground">{category.name}</span>
          <span className="text-sm text-muted-foreground">{category._count.prompts}</span>
        </Link>
      ))}
    </div>
  );
}
