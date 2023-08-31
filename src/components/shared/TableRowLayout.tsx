import { LikeSongButton } from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import Icon from '@/components/UI/Icon';
import { TableCell, TableRow } from '@/components/UI/Table';
import { DEFAULT_PLAYLISTORALBUM_IMAGE } from '@/consts';
import { cn } from '@/utils/cn';
import { millisToMinutesAndSeconds } from '@/utils/time';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, forwardRef } from 'react';

interface TableRowLayoutProps {
	index: number;
	track: SpotifyApi.TrackObjectSimplified;
	isLiked: boolean;
	children?: React.ReactNode;
	image: string | undefined;
	threeDotsButton: React.ReactNode;
	showArtists?: boolean;
	styles?: {
		firstColumn?: string;
		secondColumn?: string;
		lastColumn?: string;
	};
	artistId?: string;
}

const TableRowLayout = forwardRef<HTMLTableRowElement, TableRowLayoutProps>(
	(
		{
			index,
			track,
			isLiked,
			threeDotsButton,
			image,
			children,
			styles = {},
			showArtists = true,
			artistId = '',
		},
		ref
	) => {
		const otherArtists = track?.artists.filter(
			(artist) => artist.id !== artistId
		);

		return (
			<TableRow
				ref={ref}
				className='group h-14 rounded-2xl border-b-0 hover:bg-white/10'
			>
				<TableCell
					className={cn(
						'w-5 truncate text-center',
						styles.firstColumn
					)}
				>
					<Icon
						name='play'
						className='mx-auto hidden fill-white group-hover:block'
					/>
					<span className='block font-normal tabular-nums group-hover:hidden'>
						{index + 1}
					</span>
				</TableCell>
				<TableCell
					className={cn(
						'mr-2 grid grid-cols-[40px_1fr] gap-x-4 truncate',
						styles.secondColumn
					)}
				>
					<Image
						loading='eager'
						src={image ?? DEFAULT_PLAYLISTORALBUM_IMAGE}
						width={40}
						height={40}
						alt={`Cover art for ${track?.name ?? ''}`}
						className='aspect-square object-cover'
					/>
					<div
						className={cn('flex flex-col justify-center truncate')}
					>
						<span className='truncate font-normal text-white'>
							{track?.name ?? ''}
						</span>
						<p className='truncate text-stone-400 group-hover:text-white'>
							{!showArtists && track.artists.length > 1 && (
								<span className='font-light'>Ft. </span>
							)}

							{(showArtists
								? track?.artists.slice(showArtists ? 0 : 1)
								: otherArtists
							).map((artist) => (
								<Fragment key={artist.id}>
									<Link href={`/artist/${artist.id}`}>
										<span className='truncate font-light text-stone-400 hover:underline group-hover:text-white'>
											{artist.name}
										</span>
									</Link>
									{artist !==
										otherArtists[
											otherArtists.length - 1
										] && (
										<span className='font-light text-stone-400'>
											,{' '}
										</span>
									)}
								</Fragment>
							))}
						</p>
					</div>
				</TableCell>
				{children}
				<TableCell
					className={cn(
						'relative hidden h-0 truncate sm:table-cell',
						styles.lastColumn
					)}
				>
					<div className='grid h-full w-full grid-cols-[16px_1fr_32px]'>
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
	}
);

TableRowLayout.displayName = 'TableRowLayout';

export default TableRowLayout;
