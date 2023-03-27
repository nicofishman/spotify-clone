import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { api } from '@/utils/api';
import React from 'react';

export const PreviousButton = () => {
	const previousMutation = api.me.player.previous.useMutation();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					className='flex h-8 w-8 items-center justify-center'
					onClick={() => {
						previousMutation.mutate();
					}}
				>
					<Icon
						name='previous'
						className='fill-white/70 transition-colors hover:fill-white'
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>Previous</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
