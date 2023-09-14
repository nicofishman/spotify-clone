import { DropdownMenuItem } from '@/components/UI/Dropdown';
import Link from 'next/link';
import React from 'react';

interface GoToArtistSubMenuProps {
	artists: SpotifyApi.ArtistObjectSimplified[];
}

const GoToArtistSubMenu = ({ artists }: GoToArtistSubMenuProps) => {
  return (
    <ul className='max-h-[50vw] overflow-y-scroll bg-gray-border py-2'>
      {artists.map((artist) => (
        <Link href={`/artist/${artist.id}`} key={artist.id}>
          <DropdownMenuItem key={artist.id}>
            {artist.name}
          </DropdownMenuItem>
        </Link>
      ))}
    </ul>
  );
};

export default GoToArtistSubMenu;
