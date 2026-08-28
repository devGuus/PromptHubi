import { getPrompts, getSummaryStats, getCategories, getAllTagNames } from "@/lib/prompts";
import { parsePromptSearchParams } from "@/lib/validation";
import { PromptList } from "@/components/prompts/prompt-list";
import { FilterBar } from "@/components/prompts/filter-bar";
import { DEFAULT_SORT } from "@/lib/constants";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FavoritesPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const parsed = parsePromptSearchParams(rawParams);
  const hasActiveFilters = Boolean(parsed.q || parsed.category || parsed.tag);

  const filters = {
    q: parsed.q,
    categorySlug: parsed.category,
    favoriteOnly: true,
    tag: parsed.tag,
    sort: parsed.sort ?? DEFAULT_SORT,
  };

  const [prompts, stats, categories, tags] = await Promise.all([
    getPrompts(filters),
    getSummaryStats(),
    getCategories(),
    getAllTagNames(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Favoritos</h1>

      <FilterBar categories={categories} tags={tags} showFavoriteFilter={false} />

      <PromptList
        prompts={prompts}
        hasAnyPrompts={stats.favorites > 0}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
