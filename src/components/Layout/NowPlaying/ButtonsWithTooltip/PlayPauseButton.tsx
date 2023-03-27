import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';

interface PlayPauseButtonProps {
	isPlaying: boolean;
}

export const PlayPauseButton = ({ isPlaying }: PlayPauseButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={() => {
						console.log();
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
