import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { albumLiked } from '@/stores/albumLiked';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import React from 'react';

interface LikeAlbumButtonProps {
	albumId: string;
}

const LikeAlbumButton = ({ albumId }: LikeAlbumButtonProps) => {
	const [isLiked] = albumLiked.use('albumLiked');

	const { mutate: add } = api.me.album.add.useMutation({
		onMutate: () => {
			albumLiked.set('albumLiked', true);
		},
	});
	const { mutate: remove } = api.me.album.remove.useMutation({
		onMutate: () => {
			albumLiked.set('albumLiked', false);
		},
	});

	function likeAlbum() {
		if (isLiked) {
			remove([albumId]);
		}
		if (!isLiked) {
			add([albumId]);
		}
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className='grid h-8 w-8 place-content-center'>
					<Icon
						onClick={likeAlbum}
						name={isLiked ? 'likeActive' : 'likeDefault'}
						height={16}
						width={16}
						className={cn(
							'scale-[2] transition-colors hover:fill-white',
							isLiked ? 'fill-spotify-green' : 'fill-gray-text'
						)}
					/>
				</TooltipTrigger>
				<TooltipContent align='start' side='top'>
					<p>
						{isLiked
							? 'Remove from your library'
							: 'Add to your library'}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default LikeAlbumButton;
