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
	playing: SpotifyApi.CurrentPlaybackResponse;
}

const Player = ({ playing }: PlayerProps) => {
	return (
		<div className='flex flex-1 flex-col sm:w-2/5 sm:max-w-[722px] sm:flex-none'>
			<div className='mb-2 flex items-center gap-x-4'>
				<div className='flex flex-1 items-center justify-end gap-x-2'>
					<ShuffleButton shuffle={playing.shuffle_state} />
					<PreviousButton />
				</div>
				<PlayPauseButton isPlaying={playing.is_playing} />
				<div className='flex flex-1 items-center justify-start gap-x-2'>
					<NextButton />
					<RepeatButton
						isRepeating={
							playing.repeat_state === 'off' ? false : true
						}
					/>
				</div>
			</div>
			<TimeBar playing={playing} />
		</div>
	);
};

export default Player;
