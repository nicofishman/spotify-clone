import Image from 'next/image';
import Link from 'next/link';

interface InnerCardProps {
	image: SpotifyApi.ImageObject;
	name: string;
	artists: SpotifyApi.ArtistObjectSimplified[];
	type: 'album' | 'track' | 'playlist' | 'artist' | 'show' | 'episode';
}

export const InnerCard = ({ image, name, artists, type }: InnerCardProps) => {
	return (
		<div className='flex flex-col gap-[20px]'>
			<Image
				src={image.url}
				alt={name}
				width={image?.width ?? 100}
				height={image?.height ?? 100}
				className='aspect-square w-24 rounded-md shadow-lg'
			/>
			<div className='w-full truncate'>
				<h2 className='truncate pb-1 text-[2rem] font-bold'>{name}</h2>
				<div className='truncate text-sm text-gray-text'>
					{type !== 'playlist' && type !== 'artist'
						? artists.map((artist, index) => {
								return (
									<Link
										className=''
										href={`/artist/${artist.id}`}
										key={artist.id}
									>
										<span className=' hover:underline'>
											{artist.name}
										</span>
										{index < artists.length - 1 ? ', ' : ''}
									</Link>
								);
						  })
						: undefined}
					{type === 'playlist' && (
						<span>By {artists[0]?.name ?? 'Unknown'}</span>
					)}
					<span className='min-h-[30px] rounded-full bg-black/20 px-3 py-1.5 text-sm font-bold text-white'>
						{(() => {
							switch (type) {
								case 'track':
									return 'Song';
								case 'album':
									return 'Album';
								case 'artist':
									return 'Artist';
								case 'playlist':
									return 'Playlist';
								case 'show':
									return 'Podcast';
							}
						})()}
					</span>
				</div>
			</div>
		</div>
	);
};
