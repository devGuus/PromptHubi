import { getCategoriesWithCounts } from "@/lib/prompts";
import { CategoryGrid } from "@/components/categories/category-grid";

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Categorias</h1>
      <CategoryGrid categories={categories} />
    </div>
  );
}
