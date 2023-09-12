import {
	ConnectButton,
	FullscreenButton,
	LyricsButton,
	MuteButton,
	QueueButton,
} from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import { Slider } from '@/components/UI/Slider';
import React, { useState } from 'react';
import { api } from '@/utils/api';

interface ControlsProps {
	playing: SpotifyApi.CurrentPlaybackResponse;
}

const Controls = ({ playing }: ControlsProps) => {
	const [localVolume, setLocalVolume] = useState(
		playing.device?.volume_percent ?? 5
	);

	const setVolumeMutation = api.me.player.volume.useMutation({
		onMutate: (newVolume) => {
			setLocalVolume(newVolume);
		},
	});

	const isTrack = playing.item?.type === 'track';

	return (
		<div className='hidden w-1/3 min-w-[180px] justify-end sm:flex'>
			{isTrack && <LyricsButton />}
			<QueueButton />
			<ConnectButton />
			<MuteButton />
			<Slider
				onValueChange={(value) => {
					if (setVolumeMutation.isLoading) {
						return;
					}
					setVolumeMutation.mutate(value[0] ?? 50);
				}}
				className='max-w-[100px]'
				defaultValue={[localVolume ?? 50]}
				max={100}
				min={0}
			/>
			<FullscreenButton />
		</div>
	);
};

export default Controls;
