import { type RouterOutputs } from '@/utils/api';
import { cn } from '@/utils/cn';
import React from 'react';

interface ArtistTitleProps {
  artist: RouterOutputs['artist']['get'];
}

const ArtistTitle = ({ artist }: ArtistTitleProps) => {
  return (
    <div className='z-10 flex h-[40vh] w-full flex-col justify-end px-[--contentSpacing] pb-[--contentSpacing]'>
      <h1
        className={cn(
          'line-clamp-2 w-full overflow-hidden text-ellipsis whitespace-break-spaces font-black',
          artist.name.length <= 15
            ? 'text-8xl'
            : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
        )}
      >
        {artist.name}
      </h1>
      <span className='ml-1 mt-1'>
        {artist.followers.total.toLocaleString() + ' followers'}
      </span>
    </div>
  );
};

export default ArtistTitle;
