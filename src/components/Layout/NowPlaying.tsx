import Controls from '@/components/Layout/NowPlaying/Controls';
import CurrentSong from '@/components/Layout/NowPlaying/CurrentSong';
import Player from '@/components/Layout/NowPlaying/Player';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';

export const NowPlaying = () => {
	const { data: currentPlaying } = api.me.player.currentlyPlaying.useQuery(
		undefined,
		{
			refetchInterval: 1000,
			onSuccess: (data) => {
				const { available, ...rest } = data;
				if (available) {
					tracksStore.set('nowPlayingArtist', {
						is_playing: rest.is_playing,
						artists: rest.item?.artists.map((art) => art.id) ?? [],
					});
				} else {
					tracksStore.set('nowPlayingArtist', null);
				}
			},
		}
	);

	return (
		<footer className='flex h-24 items-center justify-between border-t border-gray-border bg-gray-bg px-4 grid-in-now-playing-bar'>
			{currentPlaying?.available ? (
				<>
					<CurrentSong playing={currentPlaying} />
					<Player playing={currentPlaying} />
					<Controls playing={currentPlaying} />
				</>
			) : undefined}
		</footer>
	);
};
