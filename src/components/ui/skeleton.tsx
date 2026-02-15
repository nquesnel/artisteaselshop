type SkeletonProps = {
  className?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded-lg ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
