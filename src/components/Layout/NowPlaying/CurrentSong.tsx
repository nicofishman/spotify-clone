import {
	PictureInPictureButton,
	LikeSongButton,
} from '@/components/Layout/NowPlaying/ButtonsWithTooltip';
import Image from 'next/image';
import Link from 'next/link';

interface CurrentSongProps {
	playing: SpotifyApi.CurrentlyPlayingResponse | null;
}

const CurrentSong = ({ playing }: CurrentSongProps) => {
	const song = playing?.item;
	const fromPlaylist = playing?.context?.uri.split(':')[2];
	return (
		<div className='w-1/3 min-w-[180px] justify-self-center'>
			{song ? (
				<div className='flex items-center justify-start'>
					<Link href={`/playlist/${fromPlaylist ?? ''}`}>
						<Image
							src={
								song.album.images[0]?.url ?? '/images/album.jpg'
							}
							alt={song.name}
							width={56}
							className='h-14 w-auto '
							height={56}
						/>
					</Link>
					<div className='mx-[14px] flex flex-col justify-center'>
						<Link href={`/playlist/${song.album.id}`}>
							<p className='text-sm font-normal text-white hover:underline'>
								{song.name}
							</p>
						</Link>
						<p className='text-xs font-normal text-gray-400'>
							{song.artists.map((art, i) => (
								<Link
									key={art.id}
									href={`/artist/${art.id ?? ''}`}
								>
									<span className='inline hover:text-white hover:underline'>
										{art.name}
									</span>
									{i !== song.artists.length - 1 ? (
										<span className='inline'>{', '}</span>
									) : undefined}
								</Link>
							))}
						</p>
					</div>
					<div className='hidden sm:flex'>
						<LikeSongButton
							trackId={playing.item?.id ?? ''}
							isLiked={false}
						/>
						<PictureInPictureButton />
					</div>
				</div>
			) : undefined}
		</div>
	);
};

export default CurrentSong;
