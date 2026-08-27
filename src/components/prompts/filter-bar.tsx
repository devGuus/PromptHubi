"use client";

import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { useQueryParam } from "@/lib/hooks/use-query-param";
import { Select } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  categories: { name: string; slug: string }[];
  tags: string[];
  showCategoryFilter?: boolean;
  showFavoriteFilter?: boolean;
};

export function FilterBar({
  categories,
  tags,
  showCategoryFilter = true,
  showFavoriteFilter = true,
}: FilterBarProps) {
  const searchParams = useSearchParams();
  const setParam = useQueryParam();

  const category = searchParams.get("category") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const sort = searchParams.get("sort") ?? "recent";
  const favoriteOnly = searchParams.get("favorite") === "1";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showCategoryFilter && categories.length > 0 ? (
        <Select
          value={category}
          onChange={(event) => setParam("category", event.target.value || null)}
          className="w-auto min-w-36"
          aria-label="Filtrar por categoria"
        >
          <option value="">Todas categorias</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      ) : null}

      {tags.length > 0 ? (
        <Select
          value={tag}
          onChange={(event) => setParam("tag", event.target.value || null)}
          className="w-auto min-w-32"
          aria-label="Filtrar por tag"
        >
          <option value="">Todas tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      ) : null}

      {showFavoriteFilter ? (
        <button
          type="button"
          onClick={() => setParam("favorite", favoriteOnly ? null : "1")}
          aria-pressed={favoriteOnly}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors",
            favoriteOnly
              ? "border-accent bg-accent-soft text-accent-soft-foreground"
              : "border-input bg-card text-muted-foreground hover:text-foreground",
          )}
        >
          <Star className={cn("h-4 w-4", favoriteOnly && "fill-current")} />
          Favoritos
        </button>
      ) : null}

      <Select
        value={sort}
        onChange={(event) => setParam("sort", event.target.value)}
        className="w-auto min-w-36 sm:ml-auto"
        aria-label="Ordenar"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
