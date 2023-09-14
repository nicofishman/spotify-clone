import AddToPlaylistSubMenu from '@/components/Playlist/Table/ThreeDots/AddToPlaylistSubMenu';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton/PlaylistShareSubContent';
import ThreeDotsButtonLayout from '@/components/UI/ThreeDotsButtonLayout';
import { type DropdownItem } from '@/types/UI';
import { openSpotify } from '@/utils/spotifyClient';
import { type useRouter } from 'next/router';

interface ThreeDotsButtonsProps {
	track: SpotifyApi.TrackObjectSimplified;
	router: ReturnType<typeof useRouter>;
}

const ThreeDotsButtonsSearchSong = ({
  router,
  track,
}: ThreeDotsButtonsProps) => {
  const items: DropdownItem[] = [
    {
      name: 'Add to queue',
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
          track?.artists[0]?.id
            ? `/artist/${track?.artists[0]?.id}`
            : '/'
        ),
    },
    {
      name: 'Go to album',
    },
    {
      name: 'Show credits',
    },
    {
      separator: true,
    },
    {
      name: 'Save to your Liked Songs',
    },
    {
      sub: true,
      name: 'Add to playlist',
      content: <AddToPlaylistSubMenu tracksId={track.id} />,
    },
    {
      separator: true,
    },
    {
      sub: true,
      name: 'Share',
      content: (
        <PlaylistShareSubContent type={track.type} trackId={track.id} />
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

export default ThreeDotsButtonsSearchSong;
