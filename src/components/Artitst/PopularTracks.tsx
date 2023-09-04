import ThreeDotsSongRow from '@/components/Playlist/Table/ThreeDotsSongRow';
import Spinner from '@/components/UI/Spinner';
import { Table, TableBody } from '@/components/UI/Table';
import TableRowLayout from '@/components/shared/TableRowLayout';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface PopularTracksProps {
	artistId: string;
}

const PopularTracks = ({ artistId }: PopularTracksProps) => {
	const router = useRouter();

	const { data: tracks, isLoading } = api.artist.getTopTracks.useQuery(
		artistId,
		{
			enabled: !!artistId,
		}
	);
	const {
		data: playlistsToAdd = {
			items: [] as SpotifyApi.PlaylistObjectSimplified[],
		} as SpotifyApi.ListOfUsersPlaylistsResponse,
	} = api.me.playlists.get.useQuery();

	const [likedTracks] = tracksStore.use('likedTracks');

	const [showMore, setShowMore] = useState(false);

	return (
		<section className='w-full max-w-6xl'>
			<h2 className='text-2xl font-bold'>Popular</h2>
			{!isLoading && tracks ? (
				<Table>
					<TableBody>
						{tracks.tracks
							.slice(0, showMore ? 10 : 5)
							.map((track, i) => (
								<TableRowLayout
									showArtists={false}
									key={track.id}
									image={track.album.images[0]?.url}
									track={track}
									index={i}
									isLiked={
										likedTracks?.includes(track.id) ?? false
									}
									styles={{
										firstColumn: 'w-10',
										secondColumn: 'max-w-fit',
										lastColumn: 'w-[128px]',
									}}
									artistId={artistId}
									threeDotsButton={
										<ThreeDotsSongRow
											isLiked={
												likedTracks?.includes(
													track.id
												) ?? false
											}
											track={track}
											isOwner={false}
											playlistsToAdd={playlistsToAdd}
											router={router}
										/>
									}
								/>
							))}
					</TableBody>
				</Table>
			) : (
				<div className='flex min-h-[280px] items-center justify-center'>
					<Spinner />
				</div>
			)}
			<button
				className='p-4 text-sm font-bold text-white/70 transition hover:text-white hover:underline'
				onClick={() => setShowMore(!showMore)}
			>
				{showMore ? 'Show less' : 'See more'}
			</button>
		</section>
	);
};

export default PopularTracks;
