"use client";

import { useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useQueryParam } from "@/lib/hooks/use-query-param";
import { getSearchTargetPath, cn } from "@/lib/utils";

export function SearchInput({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const targetPath = getSearchTargetPath(pathname);
  const setParam = useQueryParam(targetPath);
  const onTargetPage = pathname === targetPath;
  const urlValue = onTargetPage ? (searchParams.get("q") ?? "") : "";

  const [value, setValue] = useState(urlValue);
  const [syncedUrlValue, setSyncedUrlValue] = useState(urlValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep the field in sync when the URL's `q` changes from outside this input
  // (e.g. browser back/forward), without a setState-in-effect round trip.
  if (urlValue !== syncedUrlValue) {
    setSyncedUrlValue(urlValue);
    setValue(urlValue);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setValue(next);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setParam("q", next.trim() ? next : null);
    }, 300);
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Buscar prompts..."
        aria-label="Buscar prompts"
        className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}
