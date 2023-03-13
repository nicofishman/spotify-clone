import Icon from '@/components/UI/Icon';
import React from 'react';

const LikedSongsIcon = () => {
	return (
		<div className='flex h-6 w-6 shrink-0 items-center justify-center overflow-visible rounded-sm bg-liked-songs-bg fill-white p-1'>
			<Icon name='heart' />
		</div>
	);
};

export default LikedSongsIcon;
