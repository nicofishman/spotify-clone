import ThreeDotsButtonsSearchSong from '@/components/Search/Songs/ThreeDotsButton/ThreeDotsButtonsSearchSong';
import { DEFAULT_PLAYLISTORALBUM_IMAGE } from '@/consts';
import { millisToMinutesAndSeconds } from '@/utils/time';
import Image from 'next/image';
import Link from 'next/link';
import { type useRouter } from 'next/router';

interface SongsProps {
	songs: SpotifyApi.TrackObjectFull[];
	router: ReturnType<typeof useRouter>;
}

const Songs = ({ songs, router }: SongsProps) => {
  return (
    <div>
      {songs.map((song) => (
        <div
          className='group flex h-14 w-full items-center justify-between rounded-[4px] px-4 transition-colors hover:bg-white/10'
          key={song.id}
        >
          <div className='flex items-center'>
            <Image
              className='mr-4 aspect-square w-10'
              src={
                song.album.images[0]?.url ??
								DEFAULT_PLAYLISTORALBUM_IMAGE
              }
              width={song.album.images[0]?.width}
              height={song.album.images[0]?.height}
              alt={song.album.name}
            />
            <div className='flex flex-col'>
              <h3>{song.name}</h3>
              <p>
                {song.artists.map((artist, index) => {
                  return (
                    <Link
                      className='text-sm text-gray-text group-hover:text-white'
                      href={`/artist/${artist.id}`}
                      key={artist.id}
                    >
                      <span className='hover:underline'>
                        {artist.name}
                      </span>
                      {index !== song.artists.length - 1
                        ? ', '
                        : ''}
                    </Link>
                  );
                })}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <p className='mr-4 text-sm text-gray-text'>
              {millisToMinutesAndSeconds(song.duration_ms)}
            </p>
            <div className='opacity-0 group-hover:opacity-100'>
              <ThreeDotsButtonsSearchSong
                router={router}
                track={song}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Songs;
