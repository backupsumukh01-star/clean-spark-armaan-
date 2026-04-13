import Skeleton from "@/components/shared/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-24">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
