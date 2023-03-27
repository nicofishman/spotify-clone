import {
	ConnectButton,
	FullscreenButton,
	LyricsButton,
	MuteButton,
	QueueButton,
} from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import { Slider } from '@/components/UI/Slider';
import React, { useState } from 'react';

interface ControlsProps {}

const Controls = ({}: ControlsProps) => {
	const [volume, setVolume] = useState(50);

	return (
		<div className='flex w-1/3 min-w-[180px] justify-end'>
			<LyricsButton />
			<QueueButton />
			<ConnectButton />
			<MuteButton />
			<Slider
				className='max-w-[100px]'
				defaultValue={[volume]}
				max={100}
				min={0}
			/>
			<FullscreenButton />
		</div>
	);
};

export default Controls;
