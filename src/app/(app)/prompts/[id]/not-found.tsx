import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

export default function PromptNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
      <FileQuestion className="h-8 w-8 text-muted-foreground" />
      <h1 className="text-lg font-semibold text-foreground">Prompt não encontrado</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Esse prompt pode ter sido excluído ou o link está incorreto.
      </p>
      <Link href="/prompts" className={buttonClasses("secondary", "md")}>
        Voltar para Todos os Prompts
      </Link>
    </div>
  );
}
