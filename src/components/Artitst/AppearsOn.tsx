import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import { api } from '@/utils/api';
import Link from 'next/link';
import React from 'react';

interface FeaturingProps {
	artistId: string;
}

const AppearsOn = ({ artistId }: FeaturingProps) => {
  const { data: featuring, isLoading } = api.artist.getAlbums.useQuery(
    {
      artistId,
      include_groups: ['appears_on'],
    },
    {
      enabled: !!artistId,
    }
  );

  return (
    <>
      {(featuring?.items.length ?? 0) > 0 ? (
        <section>
          <h2 className='flex justify-between'>
            <Link href={`/artist/${artistId}/featuring`}>
              <span className='text-2xl font-bold hover:underline'>
								Appears on
              </span>
            </Link>
            <Link
              className='hidden sm:block'
              href={`/artist/${artistId}/featuring`}
            >
              <span className='text-sm font-bold text-zinc-400 hover:underline'>
								Show all
              </span>
            </Link>
          </h2>
          <CardSquareGrid isLoading={isLoading}>
            {({ columnCount }) =>
              featuring?.items
                .slice(0, columnCount)
                .map((album) => (
                  <AlbumCardSquare
                    key={album.id}
                    album={album}
                  />
                ))
            }
          </CardSquareGrid>
        </section>
      ) : undefined}
    </>
  );
};

export default AppearsOn;
