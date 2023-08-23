import SongRow from '@/components/Playlist/Table/SongRow';
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

interface PlaylistTableProps {
	playlistId: string;
	isOwner: boolean;
}

const PlaylistTable = ({ playlistId, isOwner }: PlaylistTableProps) => {
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
		data: songs,
		refetch: refetchGetTracks,
		isFetching,
	} = api.playlist.getTracks.useQuery(playlistId, {
		onSettled: () => {
			if (!songs) {
				void refetchGetTracks();
			}

			tracksStore.set('tracks', songs?.tracks.items ?? []);
		},
		enabled: !!playlistId,
	});

	const router = useRouter();
	const [tracks] = tracksStore.use('tracks');
	const [likedTracks] = tracksStore.use('likedTracks');

	return (
		<div className='pl-[--contentSpacing] pr-3 text-gray-300'>
			<Table className='table-fixed'>
				<TableHeader>
					<TableRow className='border-b-gray-400/50 [&>th]:fill-gray-300 [&>th]:font-normal [&>th]:text-gray-300'>
						<TableHead className='w-10 text-center'>#</TableHead>
						<TableHead className='flex-1'>Title</TableHead>
						<TableHead className='flex-1'>Album</TableHead>
						<TableHead className='w-1/6'>Date added</TableHead>
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
						{tracks.map((song, index) => (
							<SongRow
								isOwner={isOwner}
								key={`${song.track?.id ?? ''}__${index}`}
								playlistsToAdd={playlistsToAdd}
								router={router}
								index={index}
								song={song}
								isLiked={likedTracks.includes(
									song.track?.id ?? ''
								)}
							/>
						))}
					</TableBody>
				) : (
					<TableBody>
						<TableRow>
							<TableCell colSpan={5}>
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

export default PlaylistTable;
