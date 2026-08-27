"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { X } from "lucide-react";

export function TagInput({
  name = "tags",
  defaultTags = [],
}: {
  name?: string;
  defaultTags?: string[];
}) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [draft, setDraft] = useState("");

  function addTag(raw: string) {
    const value = raw.trim();
    if (!value) return;
    setTags((current) => (current.includes(value) ? current : [...current, value]));
    setDraft("");
  }

  function removeTag(tag: string) {
    setTags((current) => current.filter((existing) => existing !== tag));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(draft);
    } else if (event.key === "Backspace" && !draft && tags.length > 0) {
      setTags((current) => current.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-input bg-card px-2.5 py-2 focus-within:ring-2 focus-within:ring-ring">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            aria-label={`Remover tag ${tag}`}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
          <input type="hidden" name={name} value={tag} />
        </span>
      ))}
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(draft)}
        placeholder={tags.length === 0 ? "Digite uma tag e pressione Enter" : "Adicionar tag..."}
        className="min-w-32 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
