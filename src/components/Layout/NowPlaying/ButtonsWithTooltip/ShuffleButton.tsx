import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface ShuffleButtonProps {
	shuffle: boolean;
}

export const ShuffleButton = ({ shuffle }: ShuffleButtonProps) => {
	const [localShuffle, setLocalShuffle] = useState(shuffle);
	const shuffleMutation = api.me.player.shuffle.useMutation({
		onMutate: (newShuffle) => {
			setLocalShuffle(newShuffle);
		},
	});

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
					<Icon
						onClick={() => {
							shuffleMutation.mutate(!localShuffle);
						}}
						name='shuffle'
						className={cn(
							'hover:brightness-125',
							localShuffle
								? 'fill-spotify-green after:bottom-0 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full'
								: 'fill-white/70'
						)}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>{localShuffle ? 'Disable shuffle' : 'Enable shuffle'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
