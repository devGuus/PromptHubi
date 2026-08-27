export default function PromptDetailLoading() {
  return (
    <div className="flex max-w-3xl animate-pulse flex-col gap-6" aria-hidden="true">
      <div className="h-7 w-2/3 rounded bg-muted" />
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="h-40 rounded-xl bg-muted" />
    </div>
  );
}
