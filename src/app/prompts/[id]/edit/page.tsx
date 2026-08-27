import { notFound } from "next/navigation";
import { getPromptById, getCategories } from "@/lib/prompts";
import { PromptForm } from "@/components/prompts/prompt-form";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditPromptPage({ params }: PageProps) {
  const { id } = await params;
  const [prompt, categories] = await Promise.all([getPromptById(id), getCategories()]);

  if (!prompt) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Editar Prompt</h1>
      <PromptForm categories={categories} prompt={prompt} />
    </div>
  );
}
