import { Progress } from '@/components/UI/Progress';
import { millisToMinutesAndSeconds } from '@/utils/time';
import React from 'react';

interface TimeBarProps {
	playing: SpotifyApi.CurrentlyPlayingResponse;
}

const TimeBar = ({ playing }: TimeBarProps) => {
	return (
		<div className='flex w-full items-center justify-between gap-x-2'>
			<div className='min-w-[40px] text-right'>
				<span className='text-xxs text-[#a7a7a7]'>
					{millisToMinutesAndSeconds(playing.progress_ms!)}
				</span>
			</div>
			<div className='h-4 w-full'>
				<Progress
					className='top-1/2 h-1'
					value={
						(playing.progress_ms! / playing.item!.duration_ms) * 100
					}
				/>
			</div>
			<div className='min-w-[40px] text-left'>
				<span className='text-xxs text-[#a7a7a7]'>
					{millisToMinutesAndSeconds(playing.item!.duration_ms)}
				</span>
			</div>
		</div>
	);
};

export default TimeBar;
