import Controls from '@/components/Layout/NowPlaying/Controls';
import CurrentSong from '@/components/Layout/NowPlaying/CurrentSong';
import Player from '@/components/Layout/NowPlaying/Player';
import { api } from '@/utils/api';

export const NowPlaying = () => {
	const { data: currentPlaying } = api.me.player.currentlyPlaying.useQuery(
		undefined,
		{
			refetchInterval: 1000,
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
