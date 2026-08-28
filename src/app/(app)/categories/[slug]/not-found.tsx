import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

export default function CategoryNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
      <FileQuestion className="h-8 w-8 text-muted-foreground" />
      <h1 className="text-lg font-semibold text-foreground">Categoria não encontrada</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Essa categoria não existe ou o link está incorreto.
      </p>
      <Link href="/categories" className={buttonClasses("secondary", "md")}>
        Voltar para Categorias
      </Link>
    </div>
  );
}
