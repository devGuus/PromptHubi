import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getPromptCountByCategory,
  getPrompts,
  getAllTagNames,
} from "@/lib/prompts";
import { parsePromptSearchParams } from "@/lib/validation";
import { PromptList } from "@/components/prompts/prompt-list";
import { FilterBar } from "@/components/prompts/filter-bar";
import { DEFAULT_SORT } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPromptsPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const rawParams = await searchParams;
  const parsed = parsePromptSearchParams(rawParams);
  const hasActiveFilters = Boolean(parsed.q || parsed.favorite || parsed.tag);

  const filters = {
    q: parsed.q,
    categorySlug: slug,
    favoriteOnly: parsed.favorite === "1",
    tag: parsed.tag,
    sort: parsed.sort ?? DEFAULT_SORT,
  };

  const [prompts, tags, totalInCategory] = await Promise.all([
    getPrompts(filters),
    getAllTagNames(),
    getPromptCountByCategory(category.id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">{category.name}</h1>

      <FilterBar categories={[]} tags={tags} showCategoryFilter={false} />

      <PromptList
        prompts={prompts}
        hasAnyPrompts={totalInCategory > 0}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
