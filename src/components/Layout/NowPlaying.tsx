import Controls from '@/components/Layout/NowPlaying/Controls';
import CurrentSong from '@/components/Layout/NowPlaying/CurrentSong';
import Player from '@/components/Layout/NowPlaying/Player';
import { api } from '@/utils/api';
import React, { useEffect, useState } from 'react';

export const NowPlaying = () => {
	const [currentSong, setCurrentSong] =
		useState<SpotifyApi.CurrentlyPlayingResponse | null>(null);

	const {
		data: currentPlaying,
		error,
		refetch,
	} = api.me.player.currentlyPlaying.useQuery();

	useEffect(() => {
		const interval = setInterval(async () => {
			// await refetch();
		}, 1000);
		return () => clearInterval(interval);
	}, [refetch]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
		if (currentPlaying) {
			setCurrentSong(currentPlaying);
		}
	}, [currentPlaying, error]);

	return (
		<footer className='flex h-24 items-center justify-between border-t border-gray-border bg-gray-bg px-4 grid-in-now-playing-bar'>
			{currentSong ? (
				<>
					<CurrentSong playing={currentSong} />
					<Player playing={currentSong} />
					<Controls />
				</>
			) : undefined}
		</footer>
	);
};
