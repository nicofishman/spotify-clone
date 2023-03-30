import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { api } from '@/utils/api';

interface PlayPauseButtonProps {
	isPlaying: boolean;
}

export const PlayPauseButton = ({ isPlaying }: PlayPauseButtonProps) => {
	const utils = api.useContext();
	const invalidate = {
		onSuccess: () => utils.me.player.currentlyPlaying.invalidate(),
	};
	const playMutation = api.me.player.play.useMutation(invalidate);
	const pauseMutation = api.me.player.pause.useMutation(invalidate);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={() => {
						isPlaying
							? pauseMutation.mutate()
							: playMutation.mutate();
					}}
					className='flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform hover:scale-110'
				>
					<Icon name={isPlaying ? 'pause' : 'play'} />
				</TooltipTrigger>
				<TooltipContent>
					<p>{isPlaying ? 'Pause' : 'Play'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
