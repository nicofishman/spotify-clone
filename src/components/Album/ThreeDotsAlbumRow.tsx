import AddToPlaylistSubMenu from '@/components/Playlist/Table/ThreeDots/AddToPlaylistSubMenu';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import tracksStore from '@/stores/tracksStore';
import { type DropdownItem } from '@/types/UI';
import { api } from '@/utils/api';
import { openSpotify } from '@/utils/spotifyClient';
import { type useRouter } from 'next/router';
import { useMemo } from 'react';

interface ThreeDotsAlbumRowProps {
	router: ReturnType<typeof useRouter>;
	track: SpotifyApi.TrackObjectSimplified;
	isLiked: boolean;
	albumId: string | undefined;
}

const ThreeDotsAlbumRow = ({
  isLiked,
  router,
  track,
  albumId,
}: ThreeDotsAlbumRowProps) => {
  const utils = api.useContext();

  const likeSong = api.me.tracks.saved.add.useMutation({
    onSuccess: async () => {
      await utils.me.tracks.saved.get.invalidate();
    },
    onMutate: () => {
      tracksStore.set('likedTracks', (prev) => [
        ...prev,
        track?.id ?? '',
      ]);
    },
  });
  const dislikeSong = api.me.tracks.saved.remove.useMutation({
    onSuccess: async () => {
      await utils.me.tracks.saved.get.invalidate();
    },
    onMutate: () => {
      tracksStore.set('likedTracks', (prev) =>
        prev.filter((likedTrack) => likedTrack !== track?.id)
      );
    },
  });

  const itemLiked: DropdownItem = useMemo(
    () => ({
      name: isLiked
        ? 'Remove from your Liked Songs'
        : 'Save to your Liked Songs',
      onClick: isLiked
        ? () => dislikeSong.mutate(track?.id ?? '', {})
        : () => likeSong.mutate(track?.id ?? '', {}),
    }),
    [dislikeSong, isLiked, likeSong, track?.id]
  );

  const items: DropdownItem[] = [
    {
      name: 'Add to Playlist',
      sub: true,
      content: <AddToPlaylistSubMenu tracksId={track.id} />,
    },
    itemLiked,
    {
      name: 'Add to Queue',
    },
    {
      separator: true,
    },
    {
      name: 'Go to song radio',
      disabled: true,
    },
    {
      name: 'Go to artist',
      onClick: () =>
        router.push(
          track.artists[0]?.id
            ? `/artist/${track.artists[0]?.id}`
            : `/`
        ),
    },
    {
      name: 'Go to album',
      onClick: () => router.push(albumId ? `/album/${albumId}` : `/`),
    },
    {
      name: 'Show credits',
    },
    {
      separator: true,
    },
    {
      name: 'Share',
      sub: true,
      content: (
        <PlaylistShareSubContent
          type={'track'}
          trackId={track.id ?? ''}
        />
      ),
    },
    {
      separator: true,
    },
    {
      name: 'Open in desktop app',
      onClick: () => openSpotify(`spotify:track:${track.id}`),
    },
  ];
  return <ThreeDotsButtonLayout items={items} />;
};

export default ThreeDotsAlbumRow;
