export default function CategoriesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-7 w-40 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-14 animate-pulse rounded-xl border border-border bg-card" />
        ))}
      </div>
    </div>
  );
}
