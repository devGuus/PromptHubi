import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="flex max-w-lg flex-col gap-8">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Configurações</h1>

      <section className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <div>
          <h2 className="text-sm font-medium text-foreground">Aparência</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Alternar entre tema claro e escuro.
          </p>
        </div>
        <ThemeToggle />
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-medium text-foreground">Sobre</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          PromptHubi — biblioteca interna de prompts da Hubi Happiness.
        </p>
      </section>
    </div>
  );
}
