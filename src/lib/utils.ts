type ClassValue = string | number | null | undefined | false | Record<string, boolean | null | undefined>;

export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (!value) continue;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      continue;
    }

    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) classes.push(key);
    }
  }

  return classes.join(" ");
}

const LIST_CAPABLE_PATHS = new Set(["/", "/prompts", "/favorites"]);

export function getSearchTargetPath(pathname: string): string {
  if (LIST_CAPABLE_PATHS.has(pathname)) return pathname;
  if (pathname.startsWith("/categories/")) return pathname;
  return "/prompts";
}
