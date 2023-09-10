import PlaylistSearchSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistSearchSubContent';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import { type DropdownItem } from '@/types/UI';
import { api } from '@/utils/api';
import { openSpotify } from '@/utils/spotifyClient';

interface ThreeDotsButtonProps {
	playlistId: string;
	iconClassName?: string;
}

const ThreeDotsButtonPlaylistTitle = ({
	playlistId,
	iconClassName,
}: ThreeDotsButtonProps) => {
	const utils = api.useContext();
	const deleteMutation = api.user.playlists.unfollow.useMutation({
		onSuccess: () => {
			void utils.user.playlists.list.invalidate({
				me: true,
			});
		},
	});

	const items: DropdownItem[] = [
		{
			name: 'Add to queue',
		},
		{
			name: 'Remove from profile',
		},
		{
			separator: true,
		},
		{
			name: 'Edit details',
		},
		{
			name: 'Create similar playlist',
		},
		{
			name: 'Delete',
			onClick: () => deleteMutation.mutate(playlistId),
		},
		{
			name: 'Exclude from your taste profile',
		},
		{
			sub: true,
			name: 'Move to folder',
			content: <PlaylistSearchSubContent trackId={playlistId} />,
		},
		{
			separator: true,
		},
		{
			sub: true,
			name: 'Share',
			content: (
				<PlaylistShareSubContent
					type={'playlist'}
					trackId={playlistId}
				/>
			),
		},
		{
			separator: true,
		},
		{
			name: 'About recomendations',
		},
		{
			separator: true,
		},
		{
			name: 'Open in desktop app',
			onClick: () => openSpotify(`spotify:playlist:${playlistId}`),
		},
	];

	return (
		<ThreeDotsButtonLayout iconClassName={iconClassName} items={items} />
	);
};

export default ThreeDotsButtonPlaylistTitle;
