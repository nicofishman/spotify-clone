import { DropdownMenuItem } from '@/components/UI/Dropdown';
import React from 'react';

async function copyLink(id: string, type: string) {
  await navigator.clipboard.writeText(`https://open.spotify.com/${type}/${id}`);
}

interface PlaylistShareSubContentProps {
  trackId: string;
  type: string;
}

const PlaylistShareSubContent = ({
  trackId,
  type,
}: PlaylistShareSubContentProps) => {
  return (
    <ul className='py-2'>
      <DropdownMenuItem onClick={() => copyLink(trackId, type)}>
        Copy Link
      </DropdownMenuItem>
      <DropdownMenuItem>Embed</DropdownMenuItem>
    </ul>
  );
};

export default PlaylistShareSubContent;
