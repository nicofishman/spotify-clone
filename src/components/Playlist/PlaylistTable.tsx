import SongRow from '@/components/Playlist/Table/SongRow';
import Icon from '@/components/UI/Icon';
import { Skeleton } from '@/components/UI/Skeleton';
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
import { useEffect, useMemo, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

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
		data: res,
		refetch: refetchGetTracks,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = api.playlist.getTracks.useInfiniteQuery(
		{ playlistId },
		{
			onSettled: () => {
				if (!res) {
					void refetchGetTracks();
				}
			},
			getNextPageParam: (lastPage) => lastPage.next ?? null,
			enabled: !!playlistId,
		}
	);

	const router = useRouter();
	const [likedTracks] = tracksStore.use('likedTracks');

	const lastRowRef = useRef<HTMLTableRowElement | null>(null);
	const entry = useIntersectionObserver(lastRowRef, {
		threshold: 0.5,
		rootMargin: '0px',
	});

	useEffect(() => {
		if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
			void fetchNextPage();
		}
	}, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

	const _tracks = useMemo(() => {
		return res?.pages.flatMap((page) => page.items) ?? [];
	}, [res?.pages]);
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
				{isFetching && !isFetchingNextPage ? (
					<TableBody className='before:block before:leading-4 before:content-["\200C"]'>
						{Array.from({ length: 5 }).map((_, index) => (
							<LoadingRow key={index} />
						))}
					</TableBody>
				) : (
					<TableBody
						id='playlistBody'
						className='before:block before:leading-4 before:content-["\200C"]'
					>
						{_tracks.map((song, index) => {
							if (index === _tracks.length - 2) {
								return (
									<SongRow
										isOwner={isOwner}
										key={`${
											song.track?.id ?? ''
										}__${index}`}
										playlistsToAdd={playlistsToAdd}
										router={router}
										index={index}
										song={song}
										isLiked={likedTracks.includes(
											song.track?.id ?? ''
										)}
										ref={lastRowRef}
									/>
								);
							}
							return (
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
							);
						})}
						{isFetchingNextPage &&
							Array.from({ length: 5 }).map((_, index) => (
								<LoadingRow key={index} />
							))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default PlaylistTable;

const LoadingRow = () => (
	<TableRow className='h-14 border-b-0  [&>td>div]:w-full [&>td>div]:rounded-md [&>td]:h-[inherit] [&>td]:animate-pulse [&>td]:items-center [&>td]:px-1 [&>td]:py-2'>
		<TableCell>
			<Skeleton />
		</TableCell>
		<TableCell>
			<Skeleton />
		</TableCell>
		<TableCell>
			<Skeleton />
		</TableCell>
		<TableCell>
			<Skeleton />
		</TableCell>
		<TableCell>
			<Skeleton />
		</TableCell>
	</TableRow>
);
