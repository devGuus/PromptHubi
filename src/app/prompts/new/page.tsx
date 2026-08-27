import { getCategories } from "@/lib/prompts";
import { PromptForm } from "@/components/prompts/prompt-form";

export default async function NewPromptPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Novo Prompt</h1>
      <PromptForm categories={categories} />
    </div>
  );
}
