"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button, type ButtonSize } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function CopyButton({ content, size = "md" }: { content: string; size?: ButtonSize }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Não foi possível copiar. Copie o texto manualmente.", "error");
    }
  }

  return (
    <Button type="button" size={size} onClick={handleCopy}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copiado" : "Copiar Prompt"}
    </Button>
  );
}
