import { PlaylistOrAlbumTitle } from '@/components/shared/PlaylistOrAlbumTitle';
import { api } from '@/utils/api';
import React from 'react';

interface PlaylistTitleProps {
  playlist: SpotifyApi.PlaylistObjectFull;
}

const PlaylistTitle = ({ playlist }: PlaylistTitleProps) => {
  const { data: owner } = api.user.get.useQuery(playlist?.owner?.id ?? '', {
    enabled: !!playlist.owner.id,
  });

  const totalDuration = playlist?.tracks?.items.reduce((acc, curr) => {
    return acc + (curr.track?.duration_ms ?? 0);
  }, 0);

  return (
    <PlaylistOrAlbumTitle
      artistOrOwnerId={playlist?.owner?.id ?? ''}
      artistOrOwnerImage={owner?.images?.[0]?.url}
      artistOrOwnerName={playlist?.owner?.display_name ?? ''}
      artistOrOwnerType={owner?.type ?? 'user'}
      name={playlist?.name ?? ''}
      secondText={`${playlist.followers.total} likes`}
      totalDuration={totalDuration}
      type={playlist.type}
      total_tracks={playlist.tracks.total}
      playlistOrAlbumImage={playlist?.images?.[0]?.url}
      description={playlist?.description}
      playlistOrAlbumId={playlist?.id ?? ''}
    />
  );
};

export default PlaylistTitle;
