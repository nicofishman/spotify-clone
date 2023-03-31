import { Slider } from '@/components/UI/Slider';
import { api } from '@/utils/api';
import { millisToMinutesAndSeconds } from '@/utils/time';
import { useState, useEffect } from 'react';

interface TimeBarProps {
	playing: SpotifyApi.CurrentlyPlayingResponse;
}

const TimeBar = ({ playing }: TimeBarProps) => {
	const [localTime, setLocalTime] = useState(playing.progress_ms);

	useEffect(() => {
		setLocalTime(playing.progress_ms);
	}, [playing.progress_ms]);

	const seekMutation = api.me.player.seek.useMutation({
		onMutate: (newTime) => {
			setLocalTime(newTime);
		},
	});

	if (!playing || !playing.item) return null;

	return (
		<div className='flex w-full items-center justify-between gap-x-2'>
			<div className='min-w-[40px] text-right'>
				<span className='text-xxs text-[#a7a7a7]'>
					{millisToMinutesAndSeconds(localTime ?? 0)}
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
					value={[localTime ?? 0]}
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
