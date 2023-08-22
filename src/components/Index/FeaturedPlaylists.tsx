import PlaylistCardSquare from '@/components/Index/PlaylistCardSquare/PlaylistCardSquare';
import { Skeleton } from '@/components/UI/Skeleton';
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

	return (
		<section className='w-full'>
			{isLoading ? (
				<Skeleton className='mb-4 h-7 w-3/4' />
			) : (
				<h2 className='cursor-pointer text-4xl font-bold text-white hover:underline'>
					{featuredPlaylists?.message}
				</h2>
			)}

			<div
				className='featuredGrid grid w-full min-w-[384px] gap-6 overflow-x-auto py-2'
				style={{
					gridTemplateColumns: `repeat(${columnCount}, ${
						columnWidth - 24
					}px)`,
					width: width,
				}}
			>
				{isLoading ? (
					<FeaturedPlaylistsLoading columnCount={columnCount} />
				) : (
					featuredPlaylists?.playlists.items
						.slice(0, columnCount)
						.map((playlist) => {
							return (
								<PlaylistCardSquare
									key={playlist.id}
									playlist={playlist}
								/>
							);
						})
				)}
			</div>
		</section>
	);
};

export default FeaturedPlaylists;

const FeaturedPlaylistsLoading = ({ columnCount }: { columnCount: number }) => {
	return (
		<>
			{Array.from({ length: columnCount }).map((_, i) => {
				return (
					<Skeleton
						key={i}
						className='aspect-[23/32] h-full w-full min-w-[158px] max-w-[230px]'
					/>
				);
			})}
		</>
	);
};
