import ThreeDotsSongRow from '@/components/Playlist/Table/ThreeDotsSongRow';
import { TableCell } from '@/components/UI/Table';
import TableRowLayout from '@/components/shared/TableRowLayout';
import Link from 'next/link';
import { type useRouter } from 'next/router';
import { forwardRef } from 'react';

interface SongRowProps {
	song: SpotifyApi.PlaylistTrackObject;
	isLiked: boolean;
	index: number;
	router: ReturnType<typeof useRouter>;
	isOwner: boolean;
}

const SongRow = forwardRef<HTMLTableRowElement, SongRowProps>(
	({ song: { track, added_at }, index, isLiked, router, isOwner }, ref) => {
		return (
			track && (
				<TableRowLayout
					ref={ref}
					isLiked={isLiked}
					index={index}
					track={track as SpotifyApi.TrackObjectSimplified}
					image={track?.album?.images[0]?.url}
					threeDotsButton={
						<ThreeDotsSongRow
							isOwner={isOwner}
							isLiked={isLiked}
							router={router}
							track={track}
						/>
					}
				>
					<TableCell className='truncate'>
						<Link href={`/album/${track?.album?.id ?? ''}`}>
							<span className='truncate text-stone-400 hover:underline group-hover:text-white'>
								{track?.album?.name ?? ''}
							</span>
						</Link>
					</TableCell>
					<TableCell className='h-0'>
						<div className='flex h-full items-center justify-between'>
							<span className='flex flex-1 text-stone-400 group-hover:text-stone-300'>
								{new Date(added_at).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'short',
										day: 'numeric',
									}
								)}
							</span>
						</div>
					</TableCell>
				</TableRowLayout>
			)
		);
	}
);

SongRow.displayName = 'SongRow';

export default SongRow;
