import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PlaylistCardSquareProps {
	playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistCardSquare = ({ playlist }: PlaylistCardSquareProps) => {
	return (
		<Link
			href={`/playlist/${playlist.id}`}
			className='group flex aspect-[23/32] w-full min-w-[158px] max-w-[230px] flex-col rounded-md bg-gray-bg p-4 transition-all hover:bg-gray-border'
		>
			<div className='relative mb-4 aspect-square w-full'>
				<Image
					className='w-full rounded-md shadow-xl shadow-black/40'
					src={playlist.images[0]?.url ?? ''}
					alt={`${playlist.name}'s image`}
					width={158}
					height={158}
				/>
				<PlayPauseButton
					isPlaying={false}
					className='absolute bottom-0 right-2 opacity-0 transition-all duration-300 hover:scale-105 group-hover:bottom-2 group-hover:flex group-hover:opacity-100'
				/>
			</div>
			<h2 className='truncate pb-0.5 font-bold text-white'>
				{playlist.name}
			</h2>
			<p className='line-clamp-2 text-sm text-gray-text'>
				{playlist.description}
			</p>
		</Link>
	);
};

export default PlaylistCardSquare;
