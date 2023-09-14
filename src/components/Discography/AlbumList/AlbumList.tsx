import Album from '@/components/Discography/AlbumList/Album';
import tracksStore from '@/stores/tracksStore';
import { api, type RouterOutputs } from '@/utils/api';
import React from 'react';

interface PlaylistsListProps {
  albums: RouterOutputs['artist']['getAlbums']['items'];
}

const AlbumsList = ({ albums }: PlaylistsListProps) => {
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

  return (
    <section>
      {albums.map((album) => {
        return <Album key={album.id} album={album} />;
      })}
    </section>
  );
};

export default AlbumsList;
