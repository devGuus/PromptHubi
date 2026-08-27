import Link from "next/link";
import { getPrompts, getSummaryStats, getCategories, getAllTagNames } from "@/lib/prompts";
import { parsePromptSearchParams } from "@/lib/validation";
import { PromptList } from "@/components/prompts/prompt-list";
import { SummaryStats } from "@/components/prompts/summary-stats";
import { FilterBar } from "@/components/prompts/filter-bar";
import { DEFAULT_SORT, LIST_PAGE_SIZE_DASHBOARD } from "@/lib/constants";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const parsed = parsePromptSearchParams(rawParams);
  const hasActiveFilters = Boolean(parsed.q || parsed.category || parsed.favorite || parsed.tag);

  const filters = {
    q: parsed.q,
    categorySlug: parsed.category,
    favoriteOnly: parsed.favorite === "1",
    tag: parsed.tag,
    sort: parsed.sort ?? DEFAULT_SORT,
    take: hasActiveFilters ? undefined : LIST_PAGE_SIZE_DASHBOARD,
  };

  const [prompts, stats, categories, tags] = await Promise.all([
    getPrompts(filters),
    getSummaryStats(),
    getCategories(),
    getAllTagNames(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Dashboard</h1>
        <div className="mt-2">
          <SummaryStats total={stats.total} favorites={stats.favorites} categories={stats.categories} />
        </div>
      </div>

      <FilterBar categories={categories} tags={tags} />

      {!hasActiveFilters && stats.total > LIST_PAGE_SIZE_DASHBOARD ? (
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Prompts recentes</h2>
          <Link href="/prompts" className="text-sm font-medium text-accent hover:underline">
            Ver todos
          </Link>
        </div>
      ) : null}

      <PromptList prompts={prompts} hasAnyPrompts={stats.total > 0} hasActiveFilters={hasActiveFilters} />
    </div>
  );
}
