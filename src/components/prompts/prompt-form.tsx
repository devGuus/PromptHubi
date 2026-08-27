"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createPrompt, updatePrompt } from "@/actions/prompt-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TagInput } from "@/components/prompts/tag-input";
import { SubmitButton } from "@/components/ui/submit-button";
import { buttonClasses } from "@/components/ui/button";
import type { PromptFormState } from "@/types";
import type { Category } from "@/generated/prisma/client";
import type { PromptWithRelations } from "@/types";

type PromptFormProps = {
  categories: Category[];
  prompt?: PromptWithRelations;
};

const INITIAL_STATE: PromptFormState = {};

export function PromptForm({ categories, prompt }: PromptFormProps) {
  const isEditing = Boolean(prompt);
  const action = isEditing ? updatePrompt.bind(null, prompt!.id) : createPrompt;
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground">
          Título
        </label>
        <Input
          id="title"
          name="title"
          required
          maxLength={200}
          defaultValue={prompt?.title}
          placeholder="Ex: Descrição profissional de produto"
          aria-invalid={Boolean(state.errors?.title)}
        />
        {state.errors?.title ? <p className="mt-1 text-xs text-danger">{state.errors.title[0]}</p> : null}
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          rows={2}
          maxLength={500}
          defaultValue={prompt?.description}
          placeholder="Explique rapidamente para que esse prompt serve."
        />
        {state.errors?.description ? (
          <p className="mt-1 text-xs text-danger">{state.errors.description[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="categoryId" className="mb-1.5 block text-sm font-medium text-foreground">
            Categoria
          </label>
          <Select id="categoryId" name="categoryId" required defaultValue={prompt?.categoryId ?? ""}>
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {state.errors?.categoryId ? (
            <p className="mt-1 text-xs text-danger">{state.errors.categoryId[0]}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Tags</label>
          <TagInput defaultTags={prompt?.tags.map((tag) => tag.name) ?? []} />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-foreground">
          Prompt
        </label>
        <Textarea
          id="content"
          name="content"
          required
          rows={14}
          defaultValue={prompt?.content}
          placeholder="Cole ou escreva o conteúdo completo do prompt aqui..."
          className="font-mono text-[13px] leading-relaxed"
          aria-invalid={Boolean(state.errors?.content)}
        />
        {state.errors?.content ? <p className="mt-1 text-xs text-danger">{state.errors.content[0]}</p> : null}
      </div>

      {state.message ? <p className="text-sm text-danger">{state.message}</p> : null}

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel="Salvando...">Salvar Prompt</SubmitButton>
        <Link
          href={isEditing ? `/prompts/${prompt!.id}` : "/prompts"}
          className={buttonClasses("secondary", "md")}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
