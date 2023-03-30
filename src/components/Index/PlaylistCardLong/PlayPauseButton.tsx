import Icon from '@/components/UI/Icon';
import React from 'react';

interface PlayPauseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	isPlaying: boolean;
}

const PlayPauseButton = ({ isPlaying, ...props }: PlayPauseButtonProps) => {
	return (
		<button
			{...props}
			className='flex h-12 w-12 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-2xl drop-shadow-xl'
		>
			{isPlaying ? <Icon name='pause' /> : <Icon name='play' />}
		</button>
	);
};

export default PlayPauseButton;
