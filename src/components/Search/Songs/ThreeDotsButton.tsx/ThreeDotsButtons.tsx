import PlaylistSearchSubContent from '@/components/Search/Songs/ThreeDotsButton.tsx/PlaylistSearchSubContent';
import PlaylistShareSubContent from '@/components/Search/Songs/ThreeDotsButton.tsx/PlaylistShareSubContent';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/UI/Dropdown';
import Icon from '@/components/UI/Icon';
import React from 'react';

function openSpotifyUri(trackId: string) {
	// open new tab
	window.open(`spotify:track:${trackId}`, '_blank');
}

interface ThreeDotsButtonsProps {
	trackId: string;
}

const ThreeDotsButtons = ({ trackId }: ThreeDotsButtonsProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<Icon name='threeDots' />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem>Add to queue</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Go to song radio</DropdownMenuItem>
				<DropdownMenuItem>Go to artist</DropdownMenuItem>
				<DropdownMenuItem>Go to album</DropdownMenuItem>
				<DropdownMenuItem>Show credits</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Save to your Liked Songs</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						Add to playlist
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent className='data-[align=start]'>
						<PlaylistSearchSubContent trackId={trackId} />
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
					<DropdownMenuSubContent className='data-[align=start]'>
						<PlaylistShareSubContent trackId={trackId} />
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => openSpotifyUri(trackId)}>
					Open in desktop app
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThreeDotsButtons;
