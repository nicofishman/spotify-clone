import {
	ShuffleButton,
	PreviousButton,
	PlayPauseButton,
	NextButton,
	RepeatButton,
} from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import TimeBar from '@/components/Layout/NowPlaying/TimeBar';
import React from 'react';

interface PlayerProps {
	playing: SpotifyApi.CurrentlyPlayingResponse;
}

const Player = ({ playing }: PlayerProps) => {
	return (
		<div className='flex w-2/5 max-w-[722px] flex-col'>
			<div className='mb-2 flex items-center gap-x-4'>
				<div className='flex flex-1 items-center justify-end gap-x-2'>
					<ShuffleButton />
					<PreviousButton />
				</div>
				<PlayPauseButton />
				<div className='flex flex-1 items-center justify-start gap-x-2'>
					<NextButton />
					<RepeatButton />
				</div>
			</div>
			<TimeBar playing={playing} />
		</div>
	);
};

export default Player;
