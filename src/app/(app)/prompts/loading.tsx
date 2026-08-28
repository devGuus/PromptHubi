import { ListSkeleton } from "@/components/prompts/list-skeleton";

export default function PromptsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-7 w-48 animate-pulse rounded bg-muted" />
      <ListSkeleton rows={8} />
    </div>
  );
}
