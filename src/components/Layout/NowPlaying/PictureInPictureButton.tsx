import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import React from 'react';

const PictureInPictureButton = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Icon
						name='pictureInPicture'
						className='h-4 w-4 fill-gray-text transition-colors hover:fill-white'
					/>
				</TooltipTrigger>
				<TooltipContent className='mb-4' sideOffset={4}>
					<p>Picture in picture</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default PictureInPictureButton;
