import { LoginForm } from "@/components/auth/login-form";

type PageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-lg font-semibold text-foreground">PromptHubi</span>
        <p className="text-sm text-muted-foreground">Biblioteca de prompts da Hubi Happiness</p>
      </div>
      <LoginForm redirectTo={from ?? "/"} />
    </div>
  );
}
