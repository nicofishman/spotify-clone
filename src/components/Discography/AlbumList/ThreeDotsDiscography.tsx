import AddToPlaylistSubMenu from '@/components/Playlist/Table/ThreeDots/AddToPlaylistSubMenu';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import { likedAlbumsStore } from '@/stores/albumLiked';
import { type DropdownItem } from '@/types/UI';
import { api } from '@/utils/api';
import { openSpotify } from '@/utils/spotifyClient';
import React from 'react';

interface ThreeDotsDiscographyProps {
  album: SpotifyApi.AlbumObjectSimplified;
  tracks: SpotifyApi.AlbumTracksResponse;
}

const ThreeDotsDiscography = ({ album, tracks }: ThreeDotsDiscographyProps) => {
  const [albumsLiked] = likedAlbumsStore.use('albumsLiked');

  const { mutate: add } = api.me.album.add.useMutation({
    onSuccess: () => {
      likedAlbumsStore.set('albumsLiked', [
        ...likedAlbumsStore.get('albumsLiked'),
        album.id,
      ]);
    },
  });

  const { mutate: remove } = api.me.album.remove.useMutation({
    onSuccess: () => {
      likedAlbumsStore.set(
        'albumsLiked',
        likedAlbumsStore.get('albumsLiked').filter((id) => id !== album.id)
      );
    },
  });

  const isLiked = albumsLiked.includes(album.id);

  const items: DropdownItem[] = [
    {
      name: isLiked ? 'Remove from your library' : 'Add to your library',
      onClick: () => {
        if (!isLiked) {
          add([album.id]);
        } else {
          remove([album.id]);
        }
      },
    },
    {
      name: 'Add to your queue',
    },
    {
      name: 'Go to artist radio',
      disabled: true,
    },
    {
      separator: true,
    },
    {
      name: 'Add to playlist',
      sub: true,
      content: (
        <AddToPlaylistSubMenu
          tracksId={tracks?.items?.map((item) => item.id) ?? []}
        />
      ),
    },
    {
      separator: true,
    },
    {
      name: 'Share',
      sub: true,
      content: <PlaylistShareSubContent type={album.type} trackId={album.id} />,
    },
    {
      separator: true,
    },
    {
      name: 'Open in desktop app',
      onClick: () => openSpotify(`spotify:album:${album.id}`),
    },
  ];

  return <ThreeDotsButtonLayout items={items} />;
};

export default ThreeDotsDiscography;
