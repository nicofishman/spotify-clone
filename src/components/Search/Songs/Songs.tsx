import ThreeDotsButtons from '@/components/Search/Songs/ThreeDotsButton/ThreeDotsButtons';
import { type RouterOutputs, api } from '@/utils/api';
import { millisToMinutesAndSeconds } from '@/utils/time';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SongsProps {
	songs: SpotifyApi.TrackObjectFull[];
}

const Songs = ({ songs }: SongsProps) => {
	const {
		data: playlistListToAddTracksTo = {} as RouterOutputs['me']['playlists']['get'],
	} = api.me.playlists.get.useQuery();

	return (
		<div>
			{songs.map((song) => (
				<div
					className='group flex h-14 w-full items-center justify-between rounded-[4px] px-4 transition-colors hover:bg-white/10'
					key={song.id}
				>
					<div className='flex items-center'>
						<Image
							className='mr-4 aspect-square w-10'
							src={
								song.album.images[0]?.url ??
								`https://via.placeholder.com/${
									song.album.images[0]?.width ?? 40
								}${song.album.images[0]?.height ?? 40}`
							}
							width={song.album.images[0]?.width}
							height={song.album.images[0]?.height}
							alt={song.album.name}
						/>
						<div className='flex flex-col'>
							<h3>{song.name}</h3>
							<p>
								{song.artists.map((artist, index) => {
									return (
										<Link
											className='text-sm text-gray-text group-hover:text-white'
											href={`/artist/${artist.id}`}
											key={artist.id}
										>
											<span className='hover:underline'>
												{artist.name}
											</span>
											{index !== song.artists.length - 1
												? ', '
												: ''}
										</Link>
									);
								})}
							</p>
						</div>
					</div>
					<div className='flex items-center'>
						<p className='mr-4 text-sm text-gray-text'>
							{millisToMinutesAndSeconds(song.duration_ms)}
						</p>
						<div className='opacity-0 group-hover:opacity-100'>
							<ThreeDotsButtons
								trackId={song.id}
								playlists={playlistListToAddTracksTo.items}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Songs;
