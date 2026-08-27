"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type" | "disabled"> & {
  pendingLabel?: string;
};

export function SubmitButton({ children, pendingLabel, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (pendingLabel ?? "Salvando...") : children}
    </Button>
  );
}
