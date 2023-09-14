import AlbumTitle from '@/components/Album/AlbumTitle';
import Layout from '@/components/Layout/Layout';
import { api } from '@/utils/api';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AlbumTable from '@/components/Album/AlbumTable';
import LikeAlbumButton from '@/components/Album/LikeAlbumButton';
import ThreeDotsButtonAlbumTitle from '@/components/Album/ThreeDotsButtonAlbumTitle';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import tracksStore from '@/stores/tracksStore';
import { getGcAndSetVariable } from '@/utils/images';
import { useMemo } from 'react';

import MoreBy from '@/components/Album/MoreBy';
import TopBarContent from '@/components/Layout/TopBar/TopBarContent';
import { formatDate } from '@/utils/time';

const PlaylistPage = () => {
  const albumId = useRouter().query.albumId as string;

  const { data: album } = api.album.get.useQuery(albumId, {
    enabled: !!albumId,
    onSuccess: async (album) => {
      if (!album.images[0]?.url) return;
      await getGcAndSetVariable(album.images[0].url, '--top-bar-color');
    },
  });

  const [currentPlaying] = tracksStore.use('currentlyPlaying');

  const isPlaying = useMemo(
    () => currentPlaying?.context?.uri === `spotify:album:${albumId}`,
    [currentPlaying?.context?.uri, albumId]
  );

  return (
    <>
      <Head>
        <title>
          {album
            ? `${album?.name} - Album by ${
              album.artists
                .map((art) => art.name)
                .join(', ') ?? ''
						  }`
            : 'Loading...'}
        </title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Layout
        mainClassName='px-0 gap-y-0'
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(var(--top-bar-color), 0.8) 0%, #121212 100%)`,
        }}
        topBarContent={
          <TopBarContent
            isPlaying={isPlaying}
            name={album?.name ?? ''}
          />
        }
      >
        <>
          {album ? (
            <>
              <AlbumTitle album={album} />
              <div className='flex-1 bg-black/30 px-[--contentSpacing] pb-8'>
                <div className='flex items-center gap-x-8 py-[--contentSpacing]'>
                  <PlayPauseButton
                    isPlaying={isPlaying}
                    className='scale-110 hover:scale-125 '
                  />
                  <LikeAlbumButton
                    className='scale-150'
                    albumId={album.id}
                  />
                  <ThreeDotsButtonAlbumTitle
                    iconClassName='scale-150'
                    album={album}
                  />
                </div>
                <AlbumTable
                  className='pl-0 pr-0'
                  albumImage={album.images[0]?.url}
                  albumId={album.id}
                />
                <CopyrightSection
                  releaseDate={album.release_date}
                  datePrecision={album.release_date_precision}
                  copyrights={album.copyrights}
                />
                {album?.artists[0]?.id && (
                  <MoreBy
                    artistId={album?.artists[0].id}
                    artistName={album?.artists[0].name}
                  />
                )}
              </div>
            </>
          ) : undefined}
        </>
      </Layout>
    </>
  );
};

export default PlaylistPage;

const CopyrightSection = ({
  releaseDate,
  datePrecision,
  copyrights,
}: {
	releaseDate: string;
	datePrecision: SpotifyApi.AlbumObjectSimplified['release_date_precision'];
	copyrights: Array<{
		text: string;
	}>;
}) => {
  return (
    <div className='mt-8 text-zinc-400'>
      <p className='text-sm text-[inherit]'>
        {formatDate(releaseDate, datePrecision)}
      </p>
      {copyrights.map((copy, index) => (
        <p key={index} className='text-xxs text-[inherit]'>
          {copy.text}
        </p>
      ))}
    </div>
  );
};
