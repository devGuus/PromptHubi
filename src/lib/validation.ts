import { z } from "zod";

export const promptFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título é obrigatório.")
    .max(200, "Título deve ter no máximo 200 caracteres."),
  description: z
    .string()
    .trim()
    .max(500, "Descrição deve ter no máximo 500 caracteres.")
    .default(""),
  categoryId: z.string().trim().min(1, "Selecione uma categoria."),
  content: z.string().trim().min(1, "O conteúdo do prompt é obrigatório."),
  tags: z
    .array(z.string().trim().min(1).max(40))
    .default([])
    .transform((tags) => Array.from(new Set(tags))),
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;

export const SORT_VALUES = ["recent", "oldest", "az", "za"] as const;

export const promptSearchParamsSchema = z.object({
  q: z.string().trim().min(1).optional(),
  category: z.string().trim().min(1).optional(),
  favorite: z.string().optional(),
  tag: z.string().trim().min(1).optional(),
  sort: z.enum(SORT_VALUES).optional(),
});

export type PromptSearchParamsInput = Record<string, string | string[] | undefined>;

export function parsePromptSearchParams(raw: PromptSearchParamsInput) {
  const single = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const result = promptSearchParamsSchema.safeParse({
    q: single(raw.q),
    category: single(raw.category),
    favorite: single(raw.favorite),
    tag: single(raw.tag),
    sort: single(raw.sort),
  });

  return result.success ? result.data : {};
}
