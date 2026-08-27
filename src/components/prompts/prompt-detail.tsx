import Link from "next/link";
import { Pencil, Files } from "lucide-react";
import { CopyButton } from "@/components/prompts/copy-button";
import { FavoriteButton } from "@/components/prompts/favorite-button";
import { DeleteDialog } from "@/components/prompts/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatFullDateTime } from "@/lib/format";
import { duplicatePrompt } from "@/actions/prompt-actions";
import type { PromptWithRelations } from "@/types";

export function PromptDetail({ prompt }: { prompt: PromptWithRelations }) {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">{prompt.title}</h1>
          {prompt.description ? (
            <p className="mt-1.5 text-sm text-muted-foreground">{prompt.description}</p>
          ) : null}
        </div>
        <FavoriteButton id={prompt.id} favorite={prompt.favorite} />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="accent">{prompt.category.name}</Badge>
        {prompt.tags.map((tag) => (
          <Badge key={tag.id}>{tag.name}</Badge>
        ))}
      </div>

      <dl className="grid max-w-sm grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Criado em</dt>
          <dd className="mt-0.5 text-foreground">{formatFullDateTime(prompt.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Atualizado em</dt>
          <dd className="mt-0.5 text-foreground">{formatFullDateTime(prompt.updatedAt)}</dd>
        </div>
      </dl>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Prompt
          </span>
          <CopyButton content={prompt.content} />
        </div>
        <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-border bg-muted p-4 font-mono text-[13px] leading-relaxed text-foreground">
          {prompt.content}
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
        <Link href={`/prompts/${prompt.id}/edit`} className={buttonClasses("secondary", "md")}>
          <Pencil className="h-4 w-4" />
          Editar
        </Link>

        <form action={duplicatePrompt.bind(null, prompt.id)}>
          <SubmitButton variant="secondary" pendingLabel="Duplicando...">
            <Files className="h-4 w-4" />
            Duplicar
          </SubmitButton>
        </form>

        <DeleteDialog id={prompt.id} promptTitle={prompt.title} />
      </div>
    </div>
  );
}
