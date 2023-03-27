import { Slider } from '@/components/UI/Slider';
import { api } from '@/utils/api';
import { millisToMinutesAndSeconds } from '@/utils/time';

interface TimeBarProps {
	playing: SpotifyApi.CurrentlyPlayingResponse;
}

const TimeBar = ({ playing }: TimeBarProps) => {
	const seekMutation = api.me.player.seek.useMutation();

	if (!playing || !playing.item) return null;

	return (
		<div className='flex w-full items-center justify-between gap-x-2'>
			<div className='min-w-[40px] text-right'>
				<span className='text-xxs text-[#a7a7a7]'>
					{millisToMinutesAndSeconds(playing.progress_ms ?? 0)}
				</span>
			</div>
			<div className='h-4 w-full'>
				<Slider
					onValueChange={(value) => {
						const num = value[0];
						seekMutation.mutate(num ?? 0);
					}}
					min={0}
					max={playing.item.duration_ms}
					className='top-1/2 h-1'
					onChange={(value) => {
						console.log(value);
					}}
					value={[playing.progress_ms ?? 0]}
				/>
			</div>
			<div className='min-w-[40px] text-left'>
				<span className='text-xxs text-[#a7a7a7]'>
					{millisToMinutesAndSeconds(playing.item.duration_ms)}
				</span>
			</div>
		</div>
	);
};

export default TimeBar;
