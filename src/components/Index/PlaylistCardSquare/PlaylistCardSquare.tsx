import Image from 'next/image';
import React from 'react';

interface PlaylistCardSquareProps {
	playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistCardSquare = ({ playlist }: PlaylistCardSquareProps) => {
	return (
		<div className='flex aspect-[32/23] w-full min-w-[158px] max-w-[230px] flex-col rounded-md bg-gray-bg p-4'>
			<div className='mb-4'>
				<Image
					className='w-full rounded-md shadow-xl shadow-black/50'
					src={playlist.images[0]?.url ?? ''}
					alt={`${playlist.name}'s image`}
					width={158}
					height={158}
				/>
			</div>
			<h2 className='truncate pb-0.5 font-bold text-white'>
				{playlist.name}
			</h2>
			<p className='line-clamp-2 text-sm text-gray-text'>
				{playlist.description}
			</p>
		</div>
	);
};

export default PlaylistCardSquare;
