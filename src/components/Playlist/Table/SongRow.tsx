import { LikeSongButton } from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import ThreeDotsButton from '@/components/Playlist/Table/ThreeDotsSongRow';
import Icon from '@/components/UI/Icon';
import { TableCell, TableRow } from '@/components/UI/Table';
import { RouterOutputs } from '@/utils/api';
import { millisToMinutesAndSeconds } from '@/utils/time';
import Image from 'next/image';
import Link from 'next/link';
import { type useRouter } from 'next/router';

interface SongRowProps {
	song: SpotifyApi.PlaylistTrackObject;
	isLiked: boolean;
	index: number;
	router: ReturnType<typeof useRouter>;
	playlistsToAdd: RouterOutputs['me']['playlists']['get'];
}

const SongRow = ({
	song: { track, added_at },
	index,
	isLiked,
	router,
	playlistsToAdd,
}: SongRowProps) => {
	return (
		<TableRow className='group h-14 rounded-2xl border-b-0 hover:bg-white/10'>
			<TableCell className='w-5 text-center'>
				<Icon
					name='play'
					className='mx-auto hidden fill-white group-hover:block'
				/>
				<span className='block font-normal tabular-nums group-hover:hidden'>
					{index + 1}
				</span>
			</TableCell>
			<TableCell className='mr-2 grid grid-cols-[40px_1fr] gap-x-4 overflow-hidden'>
				<Image
					loading='lazy'
					src={track?.album?.images[0]?.url ?? ''}
					width={40}
					height={40}
					alt={`Cover art for ${track?.name ?? ''}`}
					className='aspect-square object-cover'
				/>
				<div className='flex flex-col truncate'>
					<span className='truncate font-bold text-stone-300'>
						{track?.name ?? ''}
					</span>
					<p>
						{track?.artists?.map((artist) => (
							<>
								<Link
									href={`/artist/${artist.id}`}
									key={artist.id}
								>
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
							</>
						))}
					</p>
				</div>
			</TableCell>
			<TableCell className='overflow-hidden'>
				<Link href={`/album/${track?.album?.id ?? ''}`}>
					<span className='truncate text-stone-400 hover:underline group-hover:text-white'>
						{track?.album?.name ?? ''}
					</span>
				</Link>
			</TableCell>
			<TableCell className='h-0 '>
				<div className='flex h-full items-center justify-between'>
					<span className='flex flex-1 text-stone-400 group-hover:text-stone-300'>
						{new Date(added_at).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</span>
					<picture className='hidden group-hover:block'>
						<LikeSongButton
							tooltip={false}
							isLiked={isLiked}
							trackId={track?.id ?? ''}
						/>
					</picture>
				</div>
			</TableCell>
			<TableCell className='h-0'>
				<div className='flex h-full items-center justify-between'>
					<span className='ml-4 text-stone-400 group-hover:text-stone-300'>
						{millisToMinutesAndSeconds(track?.duration_ms ?? 0)}
					</span>
					<picture className='my-auto hidden group-hover:block'>
						<ThreeDotsButton
							playlistsToAdd={playlistsToAdd}
							isLiked={isLiked}
							router={router}
							track={track}
						/>
					</picture>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default SongRow;
