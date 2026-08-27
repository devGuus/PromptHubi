import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchInput } from "@/components/prompts/search-input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonClasses } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:px-6">
      <Link href="/" className="flex items-center gap-2 md:hidden">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
          P
        </span>
      </Link>

      <div className="flex-1">
        <Suspense fallback={<div className="h-10 max-w-md rounded-lg border border-input bg-card" />}>
          <SearchInput className="max-w-md" />
        </Suspense>
      </div>

      <ThemeToggle />

      <Link href="/prompts/new" className={buttonClasses("primary", "sm", "shrink-0")}>
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Novo Prompt</span>
      </Link>
    </header>
  );
}
