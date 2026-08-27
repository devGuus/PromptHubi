import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "accent";

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-muted text-muted-foreground",
  accent: "bg-accent-soft text-accent-soft-foreground",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
