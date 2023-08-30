import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import { cn } from '@/utils/cn';

interface PlaylistOrAlbumCardSquareProps {
	id: string;
	imageUrl: string;
	name: string;
	type: 'playlist' | 'album' | 'artist';
	description: string;
}

const PlaylistOrAlbumCardSquare = ({
	id,
	imageUrl,
	name,
	type,
	description,
}: PlaylistOrAlbumCardSquareProps) => {
	return (
		<Link
			href={`/${type}/${id}`}
			className='group flex aspect-[23/32] w-full min-w-[158px] max-w-[230px] flex-col rounded-md bg-gray-bg p-4 transition-all hover:bg-gray-border'
		>
			<div className='relative mb-4 aspect-square w-full'>
				<Image
					className={cn(
						'w-full shadow-xl shadow-black/40',
						type === 'artist' ? 'rounded-full' : 'rounded-md'
					)}
					src={imageUrl}
					alt={`${name}'s image`}
					width={158}
					height={158}
				/>
				<PlayPauseButton
					isPlaying={false}
					className='absolute bottom-0 right-2 opacity-0 transition-all duration-300 hover:scale-105 group-hover:bottom-2 group-hover:flex group-hover:opacity-100'
				/>
			</div>
			<h2 className='truncate pb-0.5 font-bold text-white'>{name}</h2>
			<p className='line-clamp-2 text-sm text-gray-text'>{description}</p>
		</Link>
	);
};

export default PlaylistOrAlbumCardSquare;