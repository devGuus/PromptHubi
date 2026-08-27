function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Returns a short relative label ("hoje", "ontem", "há 3 dias") or a dd/mm/yyyy date for anything older. */
export function formatRelativeDate(date: Date): string {
  const diffDays = Math.round(
    (startOfDay(new Date()).getTime() - startOfDay(date).getTime()) / 86_400_000,
  );

  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "ontem";
  if (diffDays > 1 && diffDays < 7) return `há ${diffDays} dias`;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatFullDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
