import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import { api } from '@/utils/api';
import Link from 'next/link';
import React from 'react';

interface MoreByProps {
  artistName: string;
  artistId: string;
}

const MoreBy = ({ artistId, artistName }: MoreByProps) => {
  const { data: moreBy, isLoading } = api.artist.getAlbums.useQuery(
    {
      artistId,
      include_groups: ['album'],
    },
    {
      enabled: !!artistId,
    }
  );

  return (
    <section className='mt-12 gap-y-3'>
      <h2 className='flex justify-between'>
        <Link href={`/artist/${artistId}/discography/all`}>
          <span className='text-2xl font-bold hover:underline'>
            More by {artistName}
          </span>
        </Link>
        <Link
          className='hidden sm:block'
          href={`/artist/${artistId}/discography/all`}
        >
          <span className='text-sm font-bold text-zinc-400 hover:underline'>
            Show all
          </span>
        </Link>
      </h2>
      <CardSquareGrid isLoading={isLoading}>
        {({ columnCount }) =>
          moreBy?.items
            .slice(0, columnCount)
            .map((album) => <AlbumCardSquare key={album.id} album={album} />)
        }
      </CardSquareGrid>
    </section>
  );
};

export default MoreBy;
