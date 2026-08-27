import type { Category, Prompt, Tag } from "@/generated/prisma/client";
import type { SortOption } from "@/lib/constants";
import type { PromptFormValues } from "@/lib/validation";

export type PromptWithRelations = Prompt & {
  category: Category;
  tags: Tag[];
};

export type PromptFilters = {
  q?: string;
  categorySlug?: string;
  favoriteOnly?: boolean;
  tag?: string;
  sort: SortOption;
  take?: number;
};

export type PromptFormState = {
  errors?: Partial<Record<keyof PromptFormValues, string[]>>;
  message?: string;
};
