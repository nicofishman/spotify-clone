import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import tracksStore from '@/stores/tracksStore';
import { type DropdownItem } from '@/types/UI';
import { api } from '@/utils/api';
import { openSpotify } from '@/utils/spotifyClient';
import React from 'react';

interface ThreeDotsArtistProps {
  artistId: string;
}

const ThreeDotsArtist = ({ artistId }: ThreeDotsArtistProps) => {
  const [followingArtists] = tracksStore.use('followingArtists');
  const { mutate: follow } = api.me.following.followArtists.useMutation({
    onSuccess: () => {
      tracksStore.set('followingArtists', [
        ...tracksStore.get('followingArtists'),
        artistId,
      ]);
    },
  });
  const { mutate: unfollow } = api.me.following.unfollowArtists.useMutation({
    onSuccess: () => {
      tracksStore.set(
        'followingArtists',
        tracksStore.get('followingArtists').filter((id) => id !== artistId)
      );
    },
  });

  const items: DropdownItem[] = [
    {
      name: followingArtists?.includes(artistId) ? 'Unfollow' : 'Follow',
      onClick: () => {
        if (followingArtists?.includes(artistId)) {
          unfollow([artistId]);
        } else {
          follow([artistId]);
        }
      },
    },
    {
      name: 'Go to artist radio',
      disabled: true,
    },
    {
      name: 'Report',
      disabled: true,
    },
    {
      name: 'Share',
      sub: true,
      content: <PlaylistShareSubContent trackId={artistId} type='artist' />,
    },
    {
      separator: true,
    },
    {
      name: 'Open in desktop app',
      onClick: () => openSpotify(`spotify:artist:${artistId}`),
    },
  ];
  return <ThreeDotsButtonLayout iconClassName='scale-150' items={items} />;
};

export default ThreeDotsArtist;
