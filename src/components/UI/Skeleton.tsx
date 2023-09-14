import { cn } from '@/utils/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'h-5 animate-pulse rounded-md bg-[hsla(206,6%,76%,75%)]',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
