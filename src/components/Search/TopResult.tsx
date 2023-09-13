import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import { InnerCard } from '@/components/Search/TopResultCard/InnerCard';
import { type TopResultProps, getArtist } from '@/utils/spotifyClient';
import { useRouter } from 'next/router';

const TopResult = ({ topResult }: TopResultProps) => {
	const images =
		'images' in topResult ? topResult.images : topResult.album.images;

	const artists = getArtist(topResult);
	const router = useRouter();

	return (
		<div
			className='cursor-pointer'
			onClick={() => router.push(`/${topResult.type}/${topResult.id}`)}
		>
			<div className='group relative h-[90%] w-full rounded-sm bg-gray-bg p-5 shadow-lg shadow-black/50 transition-colors hover:bg-gray-border'>
				<InnerCard
					image={images[0]}
					artists={artists}
					name={topResult.name}
					type={topResult.type}
				/>
				<PlayPauseButton
					isPlaying={false}
					className='absolute bottom-0 right-5 opacity-0 transition-all duration-300 hover:scale-105 group-hover:bottom-5 group-hover:flex group-hover:opacity-100'
				/>
			</div>
		</div>
	);
};

export default TopResult;
