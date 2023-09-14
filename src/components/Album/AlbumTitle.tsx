import { PlaylistOrAlbumTitle } from '@/components/shared/PlaylistOrAlbumTitle';
import { type RouterOutputs } from '@/utils/api';
import React from 'react';

interface AlbumTitleProps {
  album: RouterOutputs['album']['get'];
}

const AlbumTitle = ({ album }: AlbumTitleProps) => {
  const releaseDate = new Date(album.release_date).getFullYear().toString();

  const totalDuration = album?.tracks?.items.reduce((acc, curr) => {
    return acc + curr.duration_ms;
  }, 0);

  return (
    <PlaylistOrAlbumTitle
      artistOrOwnerId={album.artists[0]?.id ?? ''}
      artistOrOwnerImage={album.artists[0]?.images[0]?.url}
      artistOrOwnerName={album.artists[0]?.name ?? ''}
      artistOrOwnerType={album.artists[0]?.type ?? 'artist'}
      name={album.name}
      playlistOrAlbumImage={album.images[0]?.url ?? ''}
      type={album.type}
      total_tracks={album.total_tracks}
      secondText={releaseDate}
      totalDuration={totalDuration}
      playlistOrAlbumId={album.id}
    />
  );
};

export default AlbumTitle;
