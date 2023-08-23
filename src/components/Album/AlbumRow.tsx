import ThreeDotsAlbumRow from '@/components/Album/ThreeDotsAlbumRow';
import TableRowLayout from '@/components/shared/TableRowLayout';
import { type RouterOutputs } from '@/utils/api';
import { type useRouter } from 'next/router';

interface AlbumRowProps {
	index: number;
	isLiked: boolean;
	router: ReturnType<typeof useRouter>;
	playlistsToAdd: RouterOutputs['me']['playlists']['get'];
	track: SpotifyApi.TrackObjectSimplified;
	albumImage: string | undefined;
	albumId: string | undefined;
}

const AlbumRow = ({
	index,
	isLiked,
	playlistsToAdd,
	router,
	track,
	albumImage,
	albumId,
}: AlbumRowProps) => {
	return (
		<TableRowLayout
			threeDotsButton={
				<ThreeDotsAlbumRow
					albumId={albumId}
					playlistsToAdd={playlistsToAdd}
					isLiked={isLiked}
					router={router}
					track={track}
				/>
			}
			isLiked={isLiked}
			index={index}
			track={track}
			image={albumImage}
		/>
	);
};

export default AlbumRow;
