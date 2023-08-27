import Image from 'next/image';
import Link from 'next/link';
import formatDistance from 'date-fns/formatDistance';
import { DEFAULT_PLAYLISTORALBUM_IMAGE, DEFAULT_USER_IMAGE } from '@/consts';

interface PlaylistTitleProps {
	type: 'playlist' | 'album';
	name: string;
	artistOrOwnerImage: string | undefined;
	artistOrOwnerName: string;
	artistOrOwnerId: string;
	artistOrOwnerType: 'artist' | 'user';
	secondText: string;
	total_tracks: number;
	totalDuration: number;
	playlistOrAlbumImage: string | undefined;
	description?: string | null;
}

export const PlaylistOrAlbumTitle = ({
	playlistOrAlbumImage,
	artistOrOwnerImage,
	artistOrOwnerName,
	artistOrOwnerId,
	artistOrOwnerType,
	name,
	secondText,
	totalDuration,
	total_tracks,
	type,
	description,
}: PlaylistTitleProps) => {
	return (
		<div className='mt-[calc(var(--contentSpacing)*2)] flex h-[30vh] px-[--contentSpacing] pb-[--contentSpacing]'>
			<div className='relative mr-[--contentSpacing] aspect-square w-full min-w-[150px] max-w-[232px]'>
				<Image
					width={232}
					height={232}
					className='absolute bottom-0 aspect-square transform cursor-pointer shadow-2xl drop-shadow-2xl transition-all duration-300 ease-in-out hover:scale-105'
					alt={`Cover art for ${name ?? ''}`}
					src={playlistOrAlbumImage ?? DEFAULT_PLAYLISTORALBUM_IMAGE}
					loading='eager'
				/>
			</div>
			<div className='flex w-fit flex-1 flex-col justify-end space-y-2'>
				<span className='font-bold capitalize'>{type}</span>
				<span className='overflow-hidden break-words font-black sm:text-4xl md:text-5xl lg:text-7xl'>
					{name ?? ''}
				</span>
				{description && (
					<p className='line-clamp-3 max-h-[74px] w-full truncate text-sm text-white/70'>
						{description}
					</p>
				)}
				<div className='flex items-center'>
					<div className='flex'>
						<Image
							width={100}
							height={100}
							className='aspect-square h-6 w-6 rounded-full object-cover'
							alt={`Cover art for ${artistOrOwnerName ?? ''}`}
							src={artistOrOwnerImage ?? DEFAULT_USER_IMAGE}
						/>
					</div>
					<span className='ml-2 font-bold hover:underline'>
						<Link
							href={`/${artistOrOwnerType}/${
								artistOrOwnerId ?? 'nicourifishman'
							}`}
						>
							{artistOrOwnerName ?? ''}
						</Link>
					</span>
					<span className='text-sm font-normal before:mx-1 before:text-xxs before:content-["•"] after:mx-1 after:text-xxs after:content-["•"]'>
						{secondText}
					</span>
					<span>
						{total_tracks} song{total_tracks > 1 ? 's' : ''},{' '}
					</span>
					<span className='text-gray-200/80'>
						&nbsp;
						{formatDistance(new Date(0), new Date(totalDuration))}
					</span>
				</div>
			</div>
		</div>
	);
};
