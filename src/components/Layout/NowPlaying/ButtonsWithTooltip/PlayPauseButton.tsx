import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import React, { useState } from 'react';

export const PlayPauseButton = () => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<button
						onClick={() => setIsPlaying(!isPlaying)}
						className='flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform hover:scale-110'
					>
						<Icon name={isPlaying ? 'pause' : 'play'} />
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{isPlaying ? 'Pause' : 'Play'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
