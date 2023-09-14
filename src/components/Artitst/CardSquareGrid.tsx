import { SquaredPlaylistsLoading } from '@/components/Index/FeaturedPlaylists';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { cn } from '@/utils/cn';
import React, { useMemo } from 'react';

interface CardSquareGridProps {
  isLoading: boolean;
  children: ({ columnCount }: { columnCount: number }) => React.ReactNode;
  className?: string;
}

const CardSquareGrid = ({
  isLoading,
  children,
  className,
}: CardSquareGridProps) => {
  const [width] = mainSizeStore.use('width');

  const [columnCount, columnWidth] = useMemo(() => {
    const count =
      width > 1700
        ? 8
        : width > 1550
        ? 7
        : width > 1250
        ? 6
        : width > 1070
        ? 5
        : width > 950
        ? 4
        : width > 690
        ? 3
        : width > 450
        ? 2
        : 1;

    return [count, width / count];
  }, [width]);

  return (
    <div
      className={cn(
        'featuredGrid grid w-full min-w-[384px] gap-x-4 overflow-x-hidden py-2',
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, ${columnWidth - 24}px)`,
        width: 'calc(100%-2*(var(--contentSpacing)))',
      }}
    >
      {isLoading ? (
        <SquaredPlaylistsLoading columnCount={columnCount} />
      ) : (
        children({ columnCount })
      )}
    </div>
  );
};

export default CardSquareGrid;
