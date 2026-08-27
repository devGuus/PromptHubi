"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** True only after the client has hydrated; avoids a setState-in-effect mount flag. */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
