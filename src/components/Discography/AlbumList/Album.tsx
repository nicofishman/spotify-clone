import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/time';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import tracksStore from '@/stores/tracksStore';
import LikeAlbumButton from '@/components/Album/LikeAlbumButton';
import ThreeDotsDiscography from '@/components/Discography/AlbumList/ThreeDotsDiscography';
import AlbumTable from '@/components/Album/AlbumTable';
import { api } from '@/utils/api';

interface PlaylistProps {
	album: SpotifyApi.AlbumObjectSimplified;
}

const Album = ({ album }: PlaylistProps) => {
	const [currentPlaying] = tracksStore.use('currentlyPlaying');
	const { data: tracks = {} as SpotifyApi.AlbumTracksResponse } =
		api.album.getTracks.useQuery(album.id);

	return (
		<div>
			<div className='flex gap-x-6 pb-8 pt-16'>
				<Image
					className='aspect-square h-36 w-36'
					src={album.images[0]?.url ?? ''}
					width={album.images[0]?.width ?? 0}
					height={album.images[0]?.height ?? 0}
					alt={album.name}
				/>
				<div className='flex w-4/5 flex-col justify-between gap-y-2'>
					<Link href={`/album/${album.id}`}>
						<span className='line-clamp-1 truncate text-[2rem] font-bold hover:underline'>
							{album.name}
						</span>
					</Link>
					<p className='text-gray-200/80'>
						<span className='capitalize'>{album.album_type}</span>
						<span className='before:mx-1.5 before:align-middle before:text-[0.75rem] before:leading-4 before:content-["•"]'>
							{formatDate(album.release_date, 'year')}
						</span>
						<span className='before:mx-1.5 before:align-middle before:text-[0.75rem] before:leading-4 before:content-["•"]'>
							{album.total_tracks}{' '}
							{album.total_tracks === 1 ? 'song' : 'songs'}
						</span>
					</p>
					<div className='flex items-center gap-x-4'>
						<PlayPauseButton
							isPlaying={
								currentPlaying?.context?.uri ===
								`spotify:album:${album.id}`
							}
							className='scale-75 bg-white'
						/>
						<LikeAlbumButton
							className='scale-150'
							albumId={album.id}
						/>
						<ThreeDotsDiscography tracks={tracks} album={album} />
					</div>
				</div>
			</div>
			<AlbumTable
				showImage={false}
				albumId={album.id}
				className='pl-0 pr-0'
			/>
		</div>
	);
};

export default Album;
