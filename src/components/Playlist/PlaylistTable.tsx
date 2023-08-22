import SongRow from '@/components/Playlist/Table/SongRow';
import Icon from '@/components/UI/Icon';
import Spinner from '@/components/UI/Spinner';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/UI/Table';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';

interface PlaylistTableProps {
	playlistId: string;
}

const PlaylistTable = ({ playlistId }: PlaylistTableProps) => {
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

	return !isFetching ? (
		<div className='flex-1 overflow-scroll pl-[--contentSpacing] pr-3 pt-[--contentSpacing] text-gray-300'>
			<Table className='table-fixed'>
				<TableHeader>
					<TableRow className='border-b-gray-400/50 [&>th]:fill-gray-300 [&>th]:font-normal [&>th]:text-gray-300'>
						<TableHead className='w-10 text-center'>#</TableHead>
						<TableHead className='flex-1'>Title</TableHead>
						<TableHead className='flex-1'>Album</TableHead>
						<TableHead className='w-1/6'>Date added</TableHead>
						<TableHead className='w-32'>
							<Icon
								name='clock'
								className='ml-4 translate-x-1/2'
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				{tracks.length > 0 ? (
					<TableBody className='before:block before:leading-4 before:content-["\200C"]'>
						{tracks.map((song, index) => (
							<SongRow
								playlistsToAdd={playlistsToAdd}
								router={router}
								key={`${song.track?.id ?? index}--${new Date(
									song.added_at
								).getTime()}`}
								index={index}
								song={song}
								isLiked={likedTracks.includes(
									song.track?.id ?? ''
								)}
							/>
						))}
					</TableBody>
				) : undefined}
			</Table>
		</div>
	) : (
		<>
			<Spinner className='mt-2 flex w-full justify-center' />
		</>
	);
};

export default PlaylistTable;
