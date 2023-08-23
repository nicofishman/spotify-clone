import AddToPlaylistSubMenu from '@/components/Playlist/Table/ThreeDots/AddToPlaylistSubMenu';
import GoToArtistSubMenu from '@/components/Playlist/Table/ThreeDots/GoToArtistSubMenu';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import tracksStore from '@/stores/tracksStore';
import { type DropdownItem } from '@/types/UI';
import { api, type RouterOutputs } from '@/utils/api';
import { openSpotify } from '@/utils/spotifyClient';
import { type useRouter } from 'next/router';
import { useMemo } from 'react';

interface ThreeDotsSongRowProps {
	router: ReturnType<typeof useRouter>;
	track: SpotifyApi.PlaylistTrackObject['track'];
	isLiked: boolean;
	playlistsToAdd: RouterOutputs['me']['playlists']['get'];
	isOwner: boolean;
}

const ThreeDotsSongRow = ({
	isOwner,
	track,
	router,
	playlistsToAdd,
}: ThreeDotsSongRowProps) => {
	const utils = api.useContext();
	const [likedSongs] = tracksStore.use('likedTracks');

	const isLiked = useMemo(() => {
		return likedSongs.some((likedTrack) => likedTrack === track?.id);
	}, [likedSongs, track?.id]);

	const removeTrackFromPlaylist = api.playlist.removeTrack.useMutation({
		onMutate: ({ trackId }) => {
			tracksStore.set('tracks', (prev) =>
				prev.filter((track) => track.track?.id !== trackId)
			);
		},
	});
	const likeSong = api.me.tracks.saved.add.useMutation({
		onSuccess: async () => {
			await utils.me.tracks.saved.get.invalidate();
		},
		onMutate: () => {
			tracksStore.set('likedTracks', (prev) => [
				...prev,
				track?.id ?? '',
			]);
		},
	});
	const dislikeSong = api.me.tracks.saved.remove.useMutation({
		onSuccess: async () => {
			await utils.me.tracks.saved.get.invalidate();
		},
		onMutate: () => {
			tracksStore.set('likedTracks', (prev) =>
				prev.filter((likedTrack) => likedTrack !== track?.id)
			);
		},
	});

	const itemLiked: DropdownItem = useMemo(
		() => ({
			name: isLiked
				? 'Remove from your Liked Songs'
				: 'Save to your Liked Songs',
			onClick: isLiked
				? () => dislikeSong.mutate(track?.id ?? '', {})
				: () => likeSong.mutate(track?.id ?? '', {}),
		}),
		[dislikeSong, isLiked, likeSong, track?.id]
	);

	function handleRemove() {
		removeTrackFromPlaylist.mutate({
			playlistId: router.query.playlistId as string,
			trackId: track?.id ?? '',
		});
	}

	const items: DropdownItem[] = [
		{
			name: 'Add to playlist',
			sub: true,
			content: (
				<AddToPlaylistSubMenu
					tracksId={track?.id ?? ''}
					playlists={
						playlistsToAdd?.items ??
						([] as SpotifyApi.ListOfCurrentUsersPlaylistsResponse['items'])
					}
				/>
			),
		},
		isOwner
			? {
					name: 'Remove from this playlist',
					onClick: () => handleRemove(),
			  }
			: undefined,
		itemLiked,
		{
			name: 'Add to queue',
		},
		{
			separator: true,
		},
		{
			name: 'Go to song radio',
			disabled: true,
		},
		getItemArtists(track?.artists ?? [], router),
		{
			name: 'Go to album',
			onClick: () => router.push(`/album/${track?.album?.id ?? ''}`),
		},
		{
			name: 'Show credits',
		},
		{
			separator: true,
		},
		{
			name: 'Share',
			sub: true,
			content: (
				<PlaylistShareSubContent
					type={track?.type ?? 'track'}
					trackId={track?.id ?? ''}
				/>
			),
		},
		{
			separator: true,
		},
		{
			name: 'Open in desktop app',
			onClick: () => openSpotify(`spotify:track:${track?.id ?? ''}`),
		},
	].filter(Boolean) as DropdownItem[];

	return <ThreeDotsButtonLayout items={items} />;
};

export default ThreeDotsSongRow;

function getItemArtists(
	artists: SpotifyApi.ArtistObjectSimplified[],
	router: ReturnType<typeof useRouter>
) {
	const itemArtists: DropdownItem = {
		name: 'Go to artist',
	};

	if ((artists?.length ?? 0) > 1) {
		Object.assign(itemArtists, {
			sub: true,
			content: (
				<GoToArtistSubMenu
					artists={
						artists ?? ([] as SpotifyApi.ArtistObjectSimplified[])
					}
				/>
			),
		});
	} else {
		const artId = artists[0]?.id;
		Object.assign(itemArtists, {
			onClick: () => router.push(artId ? `/artist/${artId}` : `/`),
		});
	}

	return itemArtists;
}
