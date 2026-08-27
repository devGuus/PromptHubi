"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/** Returns a setter that updates one URL search param (via router.replace, no history spam) on the current path. */
export function useQueryParam(targetPathname?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      const path = targetPathname ?? pathname;
      const query = params.toString();
      router.replace(query ? `${path}?${query}` : path, { scroll: false });
    },
    [router, pathname, searchParams, targetPathname],
  );
}
