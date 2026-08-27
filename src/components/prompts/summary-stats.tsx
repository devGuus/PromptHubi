export function SummaryStats({
  total,
  favorites,
  categories,
}: {
  total: number;
  favorites: number;
  categories: number;
}) {
  const items = [
    { label: "prompts", value: total },
    { label: "favoritos", value: favorites },
    { label: "categorias", value: categories },
  ];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
      {items.map((item) => (
        <span key={item.label}>
          <span className="font-semibold text-foreground">{item.value}</span> {item.label}
        </span>
      ))}
    </div>
  );
}
