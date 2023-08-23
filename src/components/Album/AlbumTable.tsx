import AlbumRow from '@/components/Album/AlbumRow';
import Icon from '@/components/UI/Icon';
import Spinner from '@/components/UI/Spinner';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/UI/Table';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import React from 'react';

interface AlbumTableProps {
	albumId: string;
	albumImage: string | undefined;
}

const AlbumTable = ({ albumId, albumImage }: AlbumTableProps) => {
	const { data: likedSongs, refetch: refetchSaved } =
		api.me.tracks.saved.get.useQuery(undefined, {
			onSettled: () => {
				if (!likedSongs) {
					void refetchSaved();
				}
				tracksStore.set(
					'likedTracks',
					likedSongs?.items.map((item) => item.track.id) ?? []
				);
			},
		});

	const {
		data: playlistsToAdd = {
			items: [] as SpotifyApi.PlaylistObjectSimplified[],
		} as SpotifyApi.ListOfUsersPlaylistsResponse,
	} = api.me.playlists.get.useQuery();

	const {
		data: albumTracks,
		refetch: refetchGetTracks,
		isFetching,
	} = api.album.getTracks.useQuery(albumId, {
		onSettled: () => {
			if (!albumTracks) {
				void refetchGetTracks();
			}
		},
		enabled: !!albumId,
	});

	const router = useRouter();
	const [likedTracks] = tracksStore.use('likedTracks');

	return (
		<div className='pl-[--contentSpacing] pr-3 text-gray-300'>
			<Table className='table-fixed'>
				<TableHeader>
					<TableRow className='border-b-gray-400/50 [&>th]:fill-gray-300 [&>th]:font-normal [&>th]:text-gray-300'>
						<TableHead className='w-10 text-center'>#</TableHead>
						<TableHead className='flex-1'>Title</TableHead>
						<TableHead className='mr-4 w-32'>
							<Icon
								name='clock'
								className='mx-auto -translate-x-1/2'
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				{!isFetching ? (
					<TableBody className='before:block before:leading-4 before:content-["\200C"]'>
						{albumTracks?.items.map((item, index) => (
							<AlbumRow
								albumId={albumId}
								albumImage={albumImage}
								key={item.id}
								index={index}
								isLiked={likedTracks.includes(item.id)}
								router={router}
								playlistsToAdd={playlistsToAdd}
								track={item}
							/>
						))}
					</TableBody>
				) : (
					<TableBody>
						<TableRow>
							<TableCell colSpan={3}>
								<div className='mt-2 flex w-full justify-center'>
									<Spinner />
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default AlbumTable;
