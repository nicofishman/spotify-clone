import ThreeDotsAlbumRow from '@/components/Album/ThreeDotsAlbumRow';
import TableRowLayout from '@/components/shared/TableRowLayout';
import { type useRouter } from 'next/router';

interface AlbumRowProps {
  index: number;
  isLiked: boolean;
  router: ReturnType<typeof useRouter>;
  track: SpotifyApi.TrackObjectSimplified;
  albumImage: string | undefined;
  albumId: string | undefined;
  showImage?: boolean;
}

const AlbumRow = ({
  index,
  isLiked,
  router,
  track,
  albumImage,
  albumId,
  showImage = true,
}: AlbumRowProps) => {
  return (
    <TableRowLayout
      threeDotsButton={
        <ThreeDotsAlbumRow
          albumId={albumId}
          isLiked={isLiked}
          router={router}
          track={track}
        />
      }
      isLiked={isLiked}
      index={index}
      track={track}
      image={albumImage}
      showImage={showImage}
    />
  );
};

export default AlbumRow;
