"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type RouteErrorProps = {
  reset: () => void;
  title?: string;
  description?: string;
};

export function RouteError({
  reset,
  title = "Algo deu errado",
  description = "Não foi possível carregar esta página. Tente novamente.",
}: RouteErrorProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
      <AlertTriangle className="h-8 w-8 text-danger" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      <Button onClick={() => reset()} variant="secondary">
        Tentar novamente
      </Button>
    </div>
  );
}
