import PlaylistCardLong from '@/components/Index/PlaylistCardLong/PlaylistCardLong';
import { api } from '@/utils/api';
import { useState } from 'react';

const Last6Playlists = () => {
	const [last6Playlists, setLast6Playlists] = useState<
		Set<SpotifyApi.PlaylistObjectFull>
	>(new Set());

	const { data: recentlyPlayed } = api.me.player.recentlyPlayed.useQuery();
	const { data: currentlyPlaying } =
		api.me.player.currentlyPlaying.useQuery();

	const uris = (recentlyPlayed?.items ?? [])
		.map((item) => item.context?.uri ?? '')
		.filter((uri) => uri.startsWith('spotify:playlist:'))
		.map((uri) => uri.split(':')[2])
		.filter(Boolean);

	api.playlist.getMany.useQuery([...new Set(uris)], {
		enabled: uris.length > 0,
		onSuccess(data) {
			data.forEach((playlist) => {
				setLast6Playlists((last6Playlists) => {
					const newLast6Playlists = new Set(last6Playlists);
					newLast6Playlists.add(playlist);
					return newLast6Playlists;
				});
			});
		},
	});

	return (
		<section className='w-full'>
			<div className='mb-4 w-full'>
				<h2 className='text-4xl font-bold text-white'>Good Evening</h2>
			</div>
			<div className='playlistsGrid grid gap-x-6 gap-y-4'>
				{[...last6Playlists].map((playlist) => {
					return (
						<PlaylistCardLong
							key={playlist.id}
							isCurrentlyPlaying={
								currentlyPlaying?.is_playing &&
								currentlyPlaying?.context?.uri === playlist.uri
							}
							playlist={playlist}
							currentlyPlaying={currentlyPlaying}
							shuffle={!!currentlyPlaying?.shuffle_state}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default Last6Playlists;
