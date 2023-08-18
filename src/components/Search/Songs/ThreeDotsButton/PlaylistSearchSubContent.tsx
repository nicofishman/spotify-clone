import {
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/UI/Dropdown';
import Icon from '@/components/UI/Icon';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';

interface PlaylistSearchSubContentProps {
	trackId: string;
}

const PlaylistSearchSubContent = ({
	trackId,
}: PlaylistSearchSubContentProps) => {
	const { data: session } = useSession();
	const { data: playlistsData } = api.user.playlists.list.useQuery({
		me: true,
	});
	const addToPlaylistMutation = api.playlist.addTrack.useMutation();

	const playlists = useMemo(() => {
		const myPlaylists = playlistsData?.items.filter((playlist) => {
			return (
				playlist.collaborative ||
				playlist.owner.display_name === session?.user.name
			);
		});
		return myPlaylists;
	}, [playlistsData?.items, session?.user.name]);
	const [searchInput, setSearchInput] = useState('');

	return (
		<ul className='max-h-[50vh] min-w-[250px]'>
			<div className='sticky top-0 z-10 bg-gray-border px-1 py-2'>
				<div className='relative flex h-7 items-center rounded-md bg-[#3e3e3e] p-2'>
					<Icon
						width={16}
						height={16}
						name='searchDefault'
						className='mr-2 inline-block h-4 w-4 fill-gray-text'
					/>
					<input
						type='text'
						className='h-fit flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-text'
						placeholder='Find a playlist'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					{searchInput.length > 0 && (
						<button
							onClick={() => setSearchInput('')}
							className='absolute right-2'
						>
							<Icon
								width={16}
								height={16}
								name='cross'
								className='h-4 w-4 fill-gray-text'
							/>
						</button>
					)}
				</div>
				<DropdownMenuItem className='mt-2 '>
					Create playlist
				</DropdownMenuItem>
				<DropdownMenuSeparator />
			</div>
			{playlists?.map((playlist) => (
				<DropdownMenuItem
					onClick={() =>
						addToPlaylistMutation.mutate({
							playlistId: playlist.id,
							trackId: trackId,
						})
					}
					key={playlist.id}
					className='justify-between gap-x-4'
				>
					{playlist.name}
					{playlist.collaborative && (
						<Icon
							width={16}
							height={16}
							name='collaborative'
							className='h-4 w-4 fill-gray-text'
						/>
					)}
				</DropdownMenuItem>
			))}
		</ul>
	);
};

export default PlaylistSearchSubContent;
