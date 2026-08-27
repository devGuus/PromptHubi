import { ListSkeleton } from "@/components/prompts/list-skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-7 w-40 animate-pulse rounded bg-muted" />
      <ListSkeleton rows={6} />
    </div>
  );
}
