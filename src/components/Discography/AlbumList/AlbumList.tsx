import Album from '@/components/Discography/AlbumList/Album';
import tracksStore from '@/stores/tracksStore';
import { api, type RouterOutputs } from '@/utils/api';
import React from 'react';

interface PlaylistsListProps {
	playlists: RouterOutputs['artist']['getAlbums']['items'];
}

const PlaylistsList = ({ playlists }: PlaylistsListProps) => {
	const { data: likedSongs, refetch: refetchSaved } =
		api.me.tracks.saved.get.useQuery(undefined, {
			onSettled: () => {
				if (!likedSongs) {
					void refetchSaved();
				}
				tracksStore.set(
					'likedTracks',
					likedSongs?.items.map((item) => item.track.id) ?? []
				);
			},
		});

	return (
		<section>
			{playlists.map((playlist) => {
				return <Album key={playlist.id} album={playlist} />;
			})}
		</section>
	);
};

export default PlaylistsList;
