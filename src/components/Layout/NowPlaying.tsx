import Controls from '@/components/Layout/NowPlaying/Controls';
import CurrentSong from '@/components/Layout/NowPlaying/CurrentSong';
import Player from '@/components/Layout/NowPlaying/Player';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import { useState } from 'react';

export const NowPlaying = () => {
  const [additionalTypes, setAdditionalTypes] = useState<
		'episode' | 'track' | null
	>(null);

  const { data: currentPlaying } = api.me.player.currentlyPlaying.useQuery(
    { type: additionalTypes },
    {
      refetchInterval: 1000,
      onSuccess: (data) => {
        const { available, currently_playing_type } = data;
        if (available) {
          setAdditionalTypes(
						currently_playing_type as 'episode' | 'track' | null
          );
        } else {
          setAdditionalTypes(null);
        }

        if (available) {
          tracksStore.set('currentlyPlaying', data);
        } else {
          tracksStore.set(
            'currentlyPlaying',
            tracksStore.get('currentlyPlaying')
          );
        }
      },
    }
  );

  return (
    <div className='flex h-24 items-center justify-between border-t border-gray-border bg-gray-bg px-4 grid-in-now-playing-bar'>
      {currentPlaying?.available ? (
        <>
          <CurrentSong playing={currentPlaying} />
          <Player playing={currentPlaying} />
          <Controls playing={currentPlaying} />
        </>
      ) : undefined}
    </div>
  );
};
