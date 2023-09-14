import {
  PictureInPictureButton,
  LikeSongButton,
} from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import Image from 'next/image';
import Link from 'next/link';

interface CurrentSongProps {
  playing: SpotifyApi.CurrentlyPlayingResponse | null;
}

const CurrentSong = ({ playing }: CurrentSongProps) => {
  const playingItem = playing?.item;
  const fromPlaylist = playing?.context?.uri.split(':')[2];

  const isTrack = playingItem?.type === 'track';

  const imageSrc = isTrack
    ? playingItem?.album.images[0]?.url ?? '/images/album.jpg'
    : playingItem?.images[0]?.url ?? '/images/album.jpg';

  const redirectId = playingItem
    ? isTrack
      ? playingItem?.album.id
      : playingItem?.id
    : '';

  return (
    <div className='w-1/3 min-w-[180px] justify-self-center'>
      {playingItem ? (
        <div className='flex items-center justify-start'>
          <Link href={`/playlist/${fromPlaylist ?? ''}`}>
            <Image
              src={imageSrc}
              alt={playingItem.name}
              width={56}
              className='h-14 w-auto '
              height={56}
            />
          </Link>
          <div className='mx-[14px] flex flex-col justify-center'>
            <Link href={`/${playingItem.type}/${redirectId}`}>
              <p className='text-sm font-normal text-white hover:underline'>
                {playingItem.name}
              </p>
            </Link>
            <p className='text-xs font-normal text-gray-400'>
              {isTrack ? (
                playingItem.artists.map((art, i) => (
                  <Link key={art.id} href={`/artist/${art.id}`}>
                    <span className='inline hover:text-white hover:underline'>
                      {art.name}
                    </span>
                    {i !== playingItem.artists.length - 1 ? (
                      <span className='inline'>{', '}</span>
                    ) : undefined}
                  </Link>
                ))
              ) : (
                <Link
                  key={playingItem.show.id}
                  href={`/${playingItem.show.type}/${playingItem.show.id}`}
                >
                  <span className='inline hover:text-white hover:underline'>
                    {playingItem.show.name}
                  </span>
                </Link>
              )}
            </p>
          </div>
          <div className='hidden sm:flex'>
            <LikeSongButton trackId={playing.item?.id ?? ''} isLiked={false} />
            <PictureInPictureButton />
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default CurrentSong;
