import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import React from 'react';

interface LikeSongButtonProps {
	isLiked: boolean;
}

export const LikeSongButton = ({ isLiked }: LikeSongButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className='flex h-8 w-8 items-center justify-center'>
						<Icon
							name='likeDefault'
							className='h-4 w-4 fill-gray-text transition-colors hover:fill-white'
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent className='mb-4' sideOffset={4}>
					<p>Save to your Library</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
