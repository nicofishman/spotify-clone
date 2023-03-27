import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';

interface RepeatButtonProps {
	isRepeating: boolean;
}

export const RepeatButton = ({ isRepeating }: RepeatButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
					<Icon
						onClick={() => {
							// setIsEnabled(!isEnabled);
						}}
						name='repeat'
						className={cn(
							'hover:brightness-125',
							isRepeating
								? 'fill-spotify-green after:bottom-0 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full'
								: 'fill-white/70'
						)}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>{isRepeating ? 'Disable repeat' : 'Enable repeat'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
