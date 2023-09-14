import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/UI/Dropdown';
import Icon from '@/components/UI/Icon';
import { api } from '@/utils/api';
import React, { useState } from 'react';

interface PlaylistSearchProps {
  tracksId: string | string[];
}

const AddToPlaylistSubMenu = ({ tracksId }: PlaylistSearchProps) => {
  const {
    data: playlistsToAdd = {
      items: [] as SpotifyApi.PlaylistObjectSimplified[],
    } as SpotifyApi.ListOfUsersPlaylistsResponse,
  } = api.me.playlists.get.useQuery();

  const [searchInput, setSearchInput] = useState('');

  const addToPlaylist = api.playlist.addTrack.useMutation();

  function handleAddToPlaylist(playlistId: string) {
    addToPlaylist.mutate({
      playlistId,
      tracksId: Array.isArray(tracksId) ? tracksId : [tracksId],
    });
  }

  return (
    <ul className='relative max-h-[50vh] min-w-[250px] pb-2'>
      <div className='sticky top-0 z-10 bg-gray-border px-1 py-2'>
        <div className='relative flex h-7 items-center rounded-md bg-[#3e3e3e] p-2'>
          <Icon
            width={16}
            height={16}
            name='searchDefault'
            className='mr-2 inline-block h-4 w-4 fill-gray-text'
          />
          <input
            type='text'
            className='h-fit flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-text'
            placeholder='Find a playlist'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput.length > 0 && (
            <button
              onClick={() => setSearchInput('')}
              className='absolute right-2'
            >
              <Icon
                width={16}
                height={16}
                name='cross'
                className='h-4 w-4 fill-gray-text'
              />
            </button>
          )}
        </div>
        <DropdownMenuItem className='mt-2'>Create playlist</DropdownMenuItem>
        <DropdownMenuSeparator />
      </div>
      {playlistsToAdd?.items
        ?.filter((pl) =>
          pl.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
        )
        .map((playlist) => (
          <DropdownMenuItem
            key={playlist.id}
            className='justify-between gap-x-4'
            onClick={() => handleAddToPlaylist(playlist.id)}
          >
            {playlist.name}
            {playlist.collaborative && (
              <Icon
                width={16}
                height={16}
                name='collaborative'
                className='h-4 w-4 fill-gray-text'
              />
            )}
          </DropdownMenuItem>
        ))}
    </ul>
  );
};

export default AddToPlaylistSubMenu;
