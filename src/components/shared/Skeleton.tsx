export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-border/40 ${className}`}
      aria-hidden
    />
  );
}
