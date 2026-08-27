import { getPrompts, getSummaryStats, getCategories, getAllTagNames } from "@/lib/prompts";
import { parsePromptSearchParams } from "@/lib/validation";
import { PromptList } from "@/components/prompts/prompt-list";
import { FilterBar } from "@/components/prompts/filter-bar";
import { DEFAULT_SORT } from "@/lib/constants";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AllPromptsPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const parsed = parsePromptSearchParams(rawParams);
  const hasActiveFilters = Boolean(parsed.q || parsed.category || parsed.favorite || parsed.tag);

  const filters = {
    q: parsed.q,
    categorySlug: parsed.category,
    favoriteOnly: parsed.favorite === "1",
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
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Todos os Prompts</h1>

      <FilterBar categories={categories} tags={tags} />

      <PromptList prompts={prompts} hasAnyPrompts={stats.total > 0} hasActiveFilters={hasActiveFilters} />
    </div>
  );
}
