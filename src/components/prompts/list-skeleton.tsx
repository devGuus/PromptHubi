export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex animate-pulse flex-col gap-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-24 rounded-xl border border-border bg-card p-4">
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="mt-2.5 h-3 w-2/3 rounded bg-muted" />
          <div className="mt-3 h-3 w-1/4 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
