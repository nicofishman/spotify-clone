import { api } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';

interface PlaylistTitleProps {
	playlist: SpotifyApi.PlaylistObjectFull;
}

export const PlaylistTitle = ({ playlist }: PlaylistTitleProps) => {
	const { data: owner } = api.user.get.useQuery(playlist?.owner?.id ?? '', {
		enabled: !!playlist.owner.id,
	});

	const totalDuration = playlist?.tracks?.items.reduce((acc, curr) => {
		return acc + (curr.track?.duration_ms ?? 0);
	}, 0);

	return (
		<div className='flex h-[clamp(340px,30vh,400px)] px-[--contentSpacing] pb-[--contentSpacing]'>
			<div className='relative mr-[--contentSpacing] aspect-square w-full min-w-[150px] max-w-[232px]'>
				<Image
					width={232}
					height={232}
					className='absolute bottom-0 aspect-square shadow-2xl drop-shadow-2xl'
					alt={`Cover art for ${playlist?.name ?? ''}`}
					src={playlist?.images[0]?.url ?? ''}
					loading='eager'
				/>
			</div>
			<div className='flex w-fit flex-1 flex-col justify-end'>
				<span className='font-bold'>Playlist</span>
				<span className='mb-4 mt-2 overflow-hidden break-words font-black sm:text-4xl md:text-5xl lg:text-7xl'>
					{playlist?.name ?? ''}
				</span>
				<div className='flex items-center'>
					{owner ? (
						<div className='flex'>
							<Image
								width={100}
								height={100}
								className='aspect-square h-6 w-6 rounded-full object-cover'
								alt={`Cover art for ${
									playlist?.owner?.display_name ?? ''
								}`}
								src={owner?.images?.[0]?.url ?? ''}
							/>
						</div>
					) : undefined}
					<span className='ml-2 font-bold hover:underline'>
						<Link href={`/user/${owner?.id ?? 'nicourifishman'}`}>
							{playlist?.owner?.display_name ?? ''}
						</Link>
					</span>
					<span className='text-sm font-normal before:mx-1 before:text-xxs before:content-["•"] after:mx-1 after:text-xxs after:content-["•"]'>
						{playlist?.followers?.total} likes
					</span>
					<span>{playlist?.tracks?.total} songs, </span>
					<span className='text-gray-200/80'>
						&nbsp;
						{'about'}
						&nbsp;
						{((totalDuration ?? 0) / 3600000).toPrecision(1)} hr
					</span>
				</div>
			</div>
		</div>
	);
};
