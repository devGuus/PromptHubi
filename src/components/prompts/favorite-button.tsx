"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleFavorite } from "@/actions/prompt-actions";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  id,
  favorite,
  size = "md",
}: {
  id: string;
  favorite: boolean;
  size?: "sm" | "md";
}) {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite);
      await toggleFavorite(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={optimisticFavorite}
      aria-label={optimisticFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
      )}
    >
      <Star
        className={cn(
          size === "sm" ? "h-4 w-4" : "h-5 w-5",
          optimisticFavorite && "fill-amber-400 text-amber-400",
        )}
      />
    </button>
  );
}
