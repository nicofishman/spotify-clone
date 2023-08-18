import AddToPlaylistSubMenu from '@/components/Playlist/Table/ThreeDots/AddToPlaylistSubMenu';
import PlaylistSearchSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistSearchSubContent';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import { type DropdownItem } from '@/types/UI';
import { openSpotify } from '@/utils/spotifyClient';

interface ThreeDotsButtonsProps {
	trackId: string;
	playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse['items'];
}

const ThreeDotsButtons = ({ trackId, playlists }: ThreeDotsButtonsProps) => {
	const items: DropdownItem[] = [
		{
			name: 'Add to queue',
		},
		{
			separator: true,
		},
		{
			name: 'Go to song radio',
		},
		{
			name: 'Go to artist',
		},
		{
			name: 'Go to album',
		},
		{
			name: 'Show credits',
		},
		{
			separator: true,
		},
		{
			name: 'Save to your Liked Songs',
		},
		{
			sub: true,
			name: 'Add to playlist',
			// content: <PlaylistSearchSubContent trackId={trackId} />,
			content: (
				<AddToPlaylistSubMenu trackId={trackId} playlists={playlists} />
			),
		},
		{
			separator: true,
		},
		{
			sub: true,
			name: 'Share',
			content: <PlaylistShareSubContent trackId={trackId} />,
		},
		{
			separator: true,
		},
		{
			name: 'Open in desktop app',
			onClick: () => openSpotify(trackId),
		},
	];
	return <ThreeDotsButtonLayout items={items} />;
};

export default ThreeDotsButtons;
