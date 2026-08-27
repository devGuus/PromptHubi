import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
      <FileQuestion className="h-8 w-8 text-muted-foreground" />
      <h1 className="text-lg font-semibold text-foreground">Página não encontrada</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        A página que você procura não existe ou foi movida.
      </p>
      <Link href="/" className={buttonClasses("secondary", "md")}>
        Voltar ao Dashboard
      </Link>
    </div>
  );
}
