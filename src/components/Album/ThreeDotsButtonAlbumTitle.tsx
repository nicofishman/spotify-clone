import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import { albumLiked } from '@/stores/albumLiked';
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
	const [isLiked] = albumLiked.use('albumLiked');

	const { mutate: add } = api.me.album.add.useMutation({
		onSuccess: () => {
			albumLiked.set('albumLiked', true);
		},
	});

	const { mutate: remove } = api.me.album.remove.useMutation({
		onSuccess: () => {
			albumLiked.set('albumLiked', false);
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
	];

	return (
		<ThreeDotsButtonLayout iconClassName={iconClassName} items={items} />
	);
};

export default ThreeDotsButtonAlbumTitle;
