import { notFound } from "next/navigation";
import { getPromptById } from "@/lib/prompts";
import { PromptDetail } from "@/components/prompts/prompt-detail";

type PageProps = { params: Promise<{ id: string }> };

export default async function PromptDetailPage({ params }: PageProps) {
  const { id } = await params;
  const prompt = await getPromptById(id);

  if (!prompt) notFound();

  return <PromptDetail prompt={prompt} />;
}
