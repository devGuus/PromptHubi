"use client";

import { RouteError } from "@/components/ui/route-error";

export default function PromptDetailError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteError reset={reset} title="Não foi possível carregar o prompt" />;
}
