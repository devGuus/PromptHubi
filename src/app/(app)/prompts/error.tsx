"use client";

import { RouteError } from "@/components/ui/route-error";

export default function PromptsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteError reset={reset} title="Não foi possível carregar os prompts" />;
}
