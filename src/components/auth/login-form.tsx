"use client";

import { useActionState } from "react";
import { login } from "@/actions/site-auth-actions";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState(login, {});

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Senha de acesso
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          placeholder="Digite a senha"
        />
      </div>
      {state.error ? <p className="text-sm text-danger">{state.error}</p> : null}
      <SubmitButton className="w-full" pendingLabel="Entrando...">
        Entrar
      </SubmitButton>
    </form>
  );
}
