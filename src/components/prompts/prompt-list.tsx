import Link from "next/link";
import { Inbox, PlusCircle, SearchX } from "lucide-react";
import { PromptListItem } from "@/components/prompts/prompt-list-item";
import { EmptyState } from "@/components/prompts/empty-state";
import { buttonClasses } from "@/components/ui/button";
import type { PromptWithRelations } from "@/types";

type PromptListProps = {
  prompts: PromptWithRelations[];
  hasAnyPrompts: boolean;
  hasActiveFilters: boolean;
};

export function PromptList({ prompts, hasAnyPrompts, hasActiveFilters }: PromptListProps) {
  if (prompts.length === 0) {
    if (!hasAnyPrompts) {
      return (
        <EmptyState
          icon={Inbox}
          title="Você ainda não possui prompts."
          description="Crie o primeiro prompt para começar a organizar a biblioteca da Hubi Happiness."
          action={
            <Link href="/prompts/new" className={buttonClasses("primary", "md")}>
              <PlusCircle className="h-4 w-4" />
              Criar primeiro prompt
            </Link>
          }
        />
      );
    }

    return (
      <EmptyState
        icon={SearchX}
        title="Nenhum prompt encontrado"
        description={hasActiveFilters ? "Tente ajustar a busca ou os filtros aplicados." : undefined}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {prompts.map((prompt) => (
        <PromptListItem key={prompt.id} prompt={prompt} />
      ))}
    </ul>
  );
}
