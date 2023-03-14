import Icon from '@/components/UI/Icon';
import { type RouterOutputs } from '@/utils/api';
import Link from 'next/link';
import React from 'react';

interface LikedPlaylistsProps {
	playlists: RouterOutputs['user']['playlists']['list']['items'];
}

const LikedPlaylists = ({ playlists }: LikedPlaylistsProps) => {
	return (
		<ul className='h-full flex-1 py-2'>
			{playlists.map((playlist) => (
				<li
					key={playlist.id}
					className='group flex h-8 w-full justify-between px-6'
				>
					<Link className='w-full' href={`/playlist/${playlist.id}`}>
						<p className='truncate text-sm font-medium leading-8 text-gray-text transition-colors duration-200 hover:text-white'>
							{playlist.name}
						</p>
					</Link>
					{playlist.collaborative ? (
						<Icon
							name='collaborative'
							className='fill-gray-text transition-colors duration-200 group-hover:fill-white'
						/>
					) : null}
				</li>
			))}
		</ul>
	);
};

export default LikedPlaylists;
