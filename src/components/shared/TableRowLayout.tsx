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
	showArtists?: boolean;
	styles?: {
		firstColumn?: string;
		secondColumn?: string;
		lastColumn?: string;
	};
}

const TableRowLayout = ({
	index,
	track,
	isLiked,
	threeDotsButton,
	image,
	children,
	styles = {},
	showArtists = true,
}: TableRowLayoutProps) => {
	return (
		<TableRow className='group h-14 rounded-2xl border-b-0 hover:bg-white/10'>
			<TableCell
				className={cn('w-5 truncate text-center', styles.firstColumn)}
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
					loading='lazy'
					src={image ?? DEFAULT_PLAYLISTORALBUM_IMAGE}
					width={40}
					height={40}
					alt={`Cover art for ${track?.name ?? ''}`}
					className='aspect-square object-cover'
				/>
				<div
					className={cn(
						'flex flex-col truncate',
						!showArtists && 'justify-center'
					)}
				>
					<span className='truncate font-normal text-white'>
						{track?.name ?? ''}
					</span>
					<p>
						{!showArtists && track.artists.length > 1 && (
							<span className='truncate font-light text-stone-400 group-hover:text-white'>
								Ft.{' '}
							</span>
						)}
						{track?.artists
							.slice(showArtists ? 0 : 1)
							.map((artist) => (
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
};

export default TableRowLayout;
