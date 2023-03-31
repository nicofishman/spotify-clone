import PlaylistCardSquare from '@/components/Index/PlaylistCardSquare/PlaylistCardSquare';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { api } from '@/utils/api';
import { useMemo } from 'react';

const FeaturedPlaylists = () => {
	const { data: featuredPlaylists, isLoading } =
		api.user.playlists.featured.useQuery();

	const [width] = mainSizeStore.use('width');

	const [columnCount, columnWidth] = useMemo(() => {
		const count =
			width > 1024
				? 5
				: width > 815
				? 4
				: width > 605
				? 3
				: width > 394
				? 2
				: 1;

		return [count, width / count];
	}, [width]);

	if (isLoading) return null;

	return (
		<section className='w-full'>
			<h2 className='cursor-pointer text-4xl font-bold text-white hover:underline'>
				{featuredPlaylists?.message}
			</h2>
			<div
				className='featuredGrid grid w-full min-w-[384px] gap-6 overflow-x-auto py-2'
				style={{
					gridTemplateColumns: `repeat(${columnCount}, ${
						columnWidth - 24
					}px)`,
					width: width,
				}}
			>
				{featuredPlaylists?.playlists.items
					.slice(0, columnCount)
					.map((playlist) => {
						return (
							<PlaylistCardSquare
								key={playlist.id}
								playlist={playlist}
							/>
						);
					})}
			</div>
		</section>
	);
};

export default FeaturedPlaylists;
