import { type RouterOutputs } from '@/utils/api';
import React from 'react';

interface ArtistTitleProps {
	artist: RouterOutputs['artist']['get'];
}

const ArtistTitle = ({ artist }: ArtistTitleProps) => {
	return (
		<div className='z-10 flex w-full flex-col pb-[--contentSpacing] pl-[--contentSpacing]'>
			<h1 className='line-clamp-3 w-full truncate text-8xl font-black'>
				{artist.name}
			</h1>
			<span className='ml-1 mt-1'>
				{artist.followers.total.toLocaleString() + ' followers'}
			</span>
		</div>
	);
};

export default ArtistTitle;
