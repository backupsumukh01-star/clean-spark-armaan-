export default function ChartSkeleton() {
  return (
    <div className="h-[120px] w-full overflow-hidden rounded-lg border border-border bg-card">
      <div className="h-full w-full animate-pulse bg-gradient-to-r from-border/40 via-border/20 to-border/40" />
    </div>
  );
}
