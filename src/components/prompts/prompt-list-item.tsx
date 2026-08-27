import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/prompts/favorite-button";
import { formatRelativeDate } from "@/lib/format";
import type { PromptWithRelations } from "@/types";

const VISIBLE_TAGS = 3;

export function PromptListItem({ prompt }: { prompt: PromptWithRelations }) {
  const visibleTags = prompt.tags.slice(0, VISIBLE_TAGS);
  const extraTagCount = prompt.tags.length - visibleTags.length;

  return (
    <li className="group relative flex gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40">
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-foreground">
          <Link href={`/prompts/${prompt.id}`} className="after:absolute after:inset-0 focus:outline-none">
            {prompt.title}
          </Link>
        </h3>

        {prompt.description ? (
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{prompt.description}</p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge variant="accent">{prompt.category.name}</Badge>
          {visibleTags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
          {extraTagCount > 0 ? <Badge>+{extraTagCount}</Badge> : null}
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Atualizado {formatRelativeDate(prompt.updatedAt)}
        </p>
      </div>

      <div className="relative z-10 shrink-0">
        <FavoriteButton id={prompt.id} favorite={prompt.favorite} size="sm" />
      </div>
    </li>
  );
}
