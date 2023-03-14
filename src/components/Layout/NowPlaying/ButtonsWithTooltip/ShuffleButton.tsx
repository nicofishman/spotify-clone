import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';

export const ShuffleButton = () => {
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<button className='flex h-8 w-8 items-center justify-center'>
						<Icon
							onClick={() => setIsEnabled(!isEnabled)}
							name='shuffle'
							className={cn(
								'hover:brightness-125',
								isEnabled
									? 'fill-spotify-green after:bottom-0 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full'
									: 'fill-white/70'
							)}
						/>
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{isEnabled ? 'Disable shuffle' : 'Enable shuffle'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
