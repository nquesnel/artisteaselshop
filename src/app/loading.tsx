import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-warm-white px-4">
      {/* Logo placeholder */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48" />
      </div>
      {/* Content skeleton */}
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
