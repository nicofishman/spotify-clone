import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import React from 'react';

export const NextButton = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
					<Icon
						name='next'
						className='fill-white/70 transition-colors hover:fill-white'
					/>
				</TooltipTrigger>
				<TooltipContent>
					<span>Next</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
