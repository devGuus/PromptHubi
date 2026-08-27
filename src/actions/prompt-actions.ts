"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { promptFormSchema } from "@/lib/validation";
import type { PromptFormState } from "@/types";

function revalidatePromptSurfaces(id?: string) {
  revalidatePath("/");
  revalidatePath("/prompts");
  revalidatePath("/favorites");
  revalidatePath("/categories");
  if (id) revalidatePath(`/prompts/${id}`);
}

function extractFormValues(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    categoryId: String(formData.get("categoryId") ?? ""),
    content: String(formData.get("content") ?? ""),
    tags: formData.getAll("tags").map(String),
  };
}

export async function createPrompt(
  _prevState: PromptFormState,
  formData: FormData,
): Promise<PromptFormState> {
  const parsed = promptFormSchema.safeParse(extractFormValues(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, message: "Corrija os erros abaixo." };
  }

  let newId: string;
  try {
    const { tags, ...rest } = parsed.data;
    const prompt = await prisma.prompt.create({
      data: {
        ...rest,
        tags: { connectOrCreate: tags.map((name) => ({ where: { name }, create: { name } })) },
      },
    });
    newId = prompt.id;
  } catch {
    return { message: "Erro ao salvar o prompt. Tente novamente." };
  }

  revalidatePromptSurfaces(newId);
  redirect(`/prompts/${newId}`);
}

export async function updatePrompt(
  id: string,
  _prevState: PromptFormState,
  formData: FormData,
): Promise<PromptFormState> {
  const parsed = promptFormSchema.safeParse(extractFormValues(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, message: "Corrija os erros abaixo." };
  }

  try {
    const { tags, ...rest } = parsed.data;
    await prisma.prompt.update({
      where: { id },
      data: {
        ...rest,
        tags: {
          set: [],
          connectOrCreate: tags.map((name) => ({ where: { name }, create: { name } })),
        },
      },
    });
  } catch {
    return { message: "Erro ao salvar as alterações. Tente novamente." };
  }

  revalidatePromptSurfaces(id);
  redirect(`/prompts/${id}`);
}

export type DeleteState = { message?: string };

export async function deletePrompt(
  id: string,
  _prevState: DeleteState,
  _formData: FormData,
): Promise<DeleteState> {
  try {
    await prisma.prompt.delete({ where: { id } });
  } catch {
    return { message: "Erro ao excluir o prompt. Tente novamente." };
  }

  revalidatePromptSurfaces();
  redirect("/prompts");
}

export async function duplicatePrompt(id: string) {
  const original = await prisma.prompt.findUnique({ where: { id }, include: { tags: true } });
  if (!original) return;

  const duplicate = await prisma.prompt.create({
    data: {
      title: `${original.title} (cópia)`,
      description: original.description,
      content: original.content,
      categoryId: original.categoryId,
      favorite: false,
      tags: { connect: original.tags.map((tag) => ({ id: tag.id })) },
    },
  });

  revalidatePromptSurfaces(duplicate.id);
  redirect(`/prompts/${duplicate.id}`);
}

export async function toggleFavorite(id: string) {
  const prompt = await prisma.prompt.findUnique({ where: { id }, select: { favorite: true } });
  if (!prompt) return;

  await prisma.prompt.update({ where: { id }, data: { favorite: !prompt.favorite } });
  revalidatePromptSurfaces(id);
}
