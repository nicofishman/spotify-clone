import React from 'react';
import Image from 'next/image';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import Link from 'next/link';
import { api } from '@/utils/api';

interface PlaylistCardLongProps {
  playlist: SpotifyApi.PlaylistObjectFull;
  isCurrentlyPlaying?: boolean;
  currentlyPlaying?: SpotifyApi.CurrentPlaybackResponse;
  shuffle?: boolean;
}

const PlaylistCardLong = ({
  playlist,
  isCurrentlyPlaying,
  currentlyPlaying,
  shuffle = false,
}: PlaylistCardLongProps) => {
  const utils = api.useContext();
  const invalidate = {
    onSuccess: async () => {
      await utils.me.player.currentlyPlaying.invalidate();
    },
  };
  const pauseMutation = api.me.player.pause.useMutation(invalidate);
  const playMutation = api.me.player.play.useMutation(invalidate);
  const nextMutation = api.me.player.next.useMutation(invalidate);
  const addToQueueMutation = api.me.player.addToQueue.useMutation(invalidate);

  function addPlaylistToQueue(
    tracks: SpotifyApi.PlaylistTrackObject[],
    shuffle: boolean
  ) {
    const uris = tracks.map(({ track }) => track?.uri).filter(Boolean);
    if (shuffle) {
      uris.sort(() => Math.random() - 0.5);
    }

    addToQueueMutation.mutate(uris);
    setTimeout(() => {
      nextMutation.mutate();
    }, 1000);
  }

  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className='group flex rounded-[4px] bg-white/10 transition-colors hover:bg-white/20'
    >
      <Image
        className='rounded-l-[4px]'
        src={playlist.images[0]?.url ?? ''}
        alt={`${playlist.name}'s image`}
        width={80}
        height={80}
      />
      <div className='flex flex-1 items-center justify-between px-4'>
        <p className='flex-1 truncate whitespace-normal text-base font-bold text-white'>
          {playlist.name}
        </p>
        {currentlyPlaying &&
          (isCurrentlyPlaying ? (
            <div className='ml-2'>
              <PlayPauseButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  pauseMutation.mutate();
                }}
                isPlaying={true}
              />
            </div>
          ) : (
            <div className='ml-2 opacity-0 transition-all group-hover:opacity-100'>
              <PlayPauseButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (currentlyPlaying?.context?.uri === playlist.uri) {
                    playMutation.mutate();
                  } else {
                    // TODO: clear queue and then play the playlist with the given uri (keep in mind shuffling can be enabled)
                    addPlaylistToQueue(playlist.tracks.items, shuffle);
                  }
                }}
                isPlaying={false}
              />
            </div>
          ))}
      </div>
    </Link>
  );
};

export default PlaylistCardLong;
