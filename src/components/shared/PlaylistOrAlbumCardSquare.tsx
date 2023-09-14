import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import { cn } from '@/utils/cn';
import Icon from '@/components/UI/Icon';

interface PlaylistOrAlbumCardSquareProps {
	id: string;
	imageUrl: string | undefined;
	name: string;
	type: 'playlist' | 'album' | 'artist' | 'show' | 'episode';
	description: string | JSX.Element;
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
				{imageUrl ? (
					<Image
						className={cn(
							'aspect-square w-full object-cover shadow-xl shadow-black/40',
							type === 'artist' ? 'rounded-full' : 'rounded-md'
						)}
						src={imageUrl}
						alt={`${name}'s image`}
						width={158}
						height={158}
					/>
				) : (
					<div className='flex aspect-square w-full items-center justify-center rounded-full bg-[#333] object-cover shadow-xl shadow-black/40'>
						<Icon
							name='noArtist'
							className='fill-[rgb(179,179,179)]'
						/>
					</div>
				)}
				<PlayPauseButton
					isPlaying={false}
					className='absolute bottom-0 right-2 opacity-0 transition-all duration-300 hover:scale-105 group-hover:bottom-2 group-hover:flex group-hover:opacity-100'
				/>
			</div>
			<h2 className='truncate pb-0.5 font-bold text-white'>{name}</h2>
			<p className='line-clamp-2 text-sm capitalize text-gray-text'>
				{description}
			</p>
		</Link>
	);
};

export default PlaylistOrAlbumCardSquare;
