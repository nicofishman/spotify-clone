import AddToPlaylistSubMenu from '@/components/Playlist/Table/ThreeDots/AddToPlaylistSubMenu';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import { likedAlbumsStore } from '@/stores/albumLiked';
import { type DropdownItem } from '@/types/UI';
import { api, type RouterOutputs } from '@/utils/api';

interface ThreeDotsButtonAlbumTitleProps {
	iconClassName?: string;
	album: RouterOutputs['album']['get'];
}

const ThreeDotsButtonAlbumTitle = ({
	album,
	iconClassName,
}: ThreeDotsButtonAlbumTitleProps) => {
	const [albumsLiked] = likedAlbumsStore.use('albumsLiked');
	const isLiked = albumsLiked.includes(album.id);

	const { mutate: add } = api.me.album.add.useMutation({
		onSuccess: () => {
			likedAlbumsStore.set('albumsLiked', [
				...likedAlbumsStore.get('albumsLiked'),
				album.id,
			]);
		},
	});

	const { mutate: remove } = api.me.album.remove.useMutation({
		onSuccess: () => {
			likedAlbumsStore.set(
				'albumsLiked',
				likedAlbumsStore
					.get('albumsLiked')
					.filter((id) => id !== album.id)
			);
		},
	});

	const items: DropdownItem[] = [
		{
			name: isLiked ? 'Remove from your library' : 'Add to your library',
			onClick: () => {
				if (!isLiked) {
					add([album.id]);
				} else {
					remove([album.id]);
				}
			},
		},
		{
			name: 'Add to your queue',
		},
		{
			name: 'Go to artist radio',
		},
		{
			separator: true,
		},
		{
			name: 'Add to playlist',
			sub: true,
			content: (
				<AddToPlaylistSubMenu
					tracksId={album.tracks.items.map((item) => item.id)}
				/>
			),
		},
	];

	return (
		<ThreeDotsButtonLayout iconClassName={iconClassName} items={items} />
	);
};

export default ThreeDotsButtonAlbumTitle;
