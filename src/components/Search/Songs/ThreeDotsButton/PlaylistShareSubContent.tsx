import { DropdownMenuItem } from '@/components/UI/Dropdown';
import React from 'react';

async function copyLink(trackId: string) {
	await navigator.clipboard.writeText(
		`https://open.spotify.com/track/${trackId}`
	);
}

interface PlaylistShareSubContentProps {
	trackId: string;
}

const PlaylistShareSubContent = ({ trackId }: PlaylistShareSubContentProps) => {
	return (
		<ul className='py-2'>
			<DropdownMenuItem onClick={() => copyLink(trackId)}>
				Copy Link
			</DropdownMenuItem>
			<DropdownMenuItem>Embed</DropdownMenuItem>
		</ul>
	);
};

export default PlaylistShareSubContent;
