import { LikeSongButton } from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import Icon from '@/components/UI/Icon';
import { TableCell, TableRow } from '@/components/UI/Table';
import { DEFAULT_PLAYLISTORALBUM_IMAGE } from '@/consts';
import { cn } from '@/utils/cn';
import { millisToMinutesAndSeconds } from '@/utils/time';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

interface TableRowLayoutProps {
	index: number;
	track: SpotifyApi.TrackObjectSimplified;
	isLiked: boolean;
	children?: React.ReactNode;
	image: string | undefined;
	threeDotsButton: React.ReactNode;
}

const TableRowLayout = ({
	index,
	track,
	isLiked,
	threeDotsButton,
	image,
	children,
}: TableRowLayoutProps) => {
	return (
		<TableRow className='group h-14 rounded-2xl border-b-0 hover:bg-white/10'>
			<TableCell className='w-5 truncate text-center'>
				<Icon
					name='play'
					className='mx-auto hidden fill-white group-hover:block'
				/>
				<span className='block font-normal tabular-nums group-hover:hidden'>
					{index + 1}
				</span>
			</TableCell>
			<TableCell className='mr-2 grid grid-cols-[40px_1fr] gap-x-4 truncate'>
				<Image
					loading='lazy'
					src={image ?? DEFAULT_PLAYLISTORALBUM_IMAGE}
					width={40}
					height={40}
					alt={`Cover art for ${track?.name ?? ''}`}
					className='aspect-square object-cover'
				/>
				<div className='flex flex-col truncate'>
					<span className='truncate font-bold text-white'>
						{track?.name ?? ''}
					</span>
					<p>
						{track?.artists?.map((artist) => (
							<Fragment key={artist.id}>
								<Link href={`/artist/${artist.id}`}>
									<span className='truncate font-light text-stone-400 hover:underline group-hover:text-white'>
										{artist.name}
									</span>
								</Link>
								{artist !== track?.artists?.slice(-1)[0] ? (
									<span className='truncate font-light text-stone-400 group-hover:text-white'>
										,{' '}
									</span>
								) : (
									''
								)}
							</Fragment>
						))}
					</p>
				</div>
			</TableCell>
			{children}
			<TableCell className='relative h-0 truncate'>
				<div
					className={cn(
						'grid h-full w-full grid-cols-[16px_1fr_32px]'
					)}
				>
					<picture
						className={cn(
							isLiked
								? 'flex items-center'
								: 'hidden items-center group-hover:flex'
						)}
					>
						<LikeSongButton
							tooltip={false}
							isLiked={isLiked}
							trackId={track?.id ?? ''}
						/>
					</picture>
					<span className='col-start-2 flex items-center justify-center text-stone-400 group-hover:mr-0 group-hover:text-stone-300'>
						{millisToMinutesAndSeconds(track?.duration_ms ?? 0)}
					</span>
					<picture className='my-auto hidden group-hover:block'>
						{threeDotsButton}
					</picture>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default TableRowLayout;
