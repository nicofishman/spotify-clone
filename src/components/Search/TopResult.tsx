import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import { InnerCard } from '@/components/Search/TopResultCard/InnerCard';
import Link from 'next/link';

function getArtist(item: TopResultProps['topResult']) {
	return 'artists' in item
		? item.artists
		: 'owner' in item
		? ([
				{ name: item.owner.display_name ?? 'Unknown' },
		  ] as SpotifyApi.ArtistObjectSimplified[])
		: 'publisher' in item
		? ([{ name: item.publisher }] as SpotifyApi.ArtistObjectSimplified[])
		: ([
				{
					name: 'Unknown',
				},
		  ] as SpotifyApi.ArtistObjectSimplified[]);
}

interface TopResultProps {
	topResult:
		| SpotifyApi.PlaylistObjectSimplified
		| SpotifyApi.TrackObjectFull
		| SpotifyApi.AlbumObjectSimplified
		| SpotifyApi.ArtistObjectFull
		| SpotifyApi.ShowObjectSimplified
		| SpotifyApi.EpisodeObjectSimplified;
}

const TopResult = ({ topResult }: TopResultProps) => {
	const images =
		'images' in topResult ? topResult.images : topResult.album.images;

	const artists = getArtist(topResult);

	return (
		<Link href={`/${topResult.type}/${topResult.id}`}>
			<div className='group relative h-[90%] w-full rounded-sm bg-gray-bg p-5 shadow-lg shadow-black/50 transition-colors hover:bg-gray-border'>
				<InnerCard
					image={
						images[0] ?? {
							url: 'https://via.placeholder.com/100x100',
							width: 100,
							height: 100,
						}
					}
					artists={artists}
					name={topResult.name}
					type={topResult.type}
				/>
				<PlayPauseButton
					isPlaying={false}
					className='absolute bottom-0 right-5 opacity-0 transition-all duration-300 hover:scale-105 group-hover:bottom-5 group-hover:flex group-hover:opacity-100'
				/>
			</div>
		</Link>
	);
};

export default TopResult;
