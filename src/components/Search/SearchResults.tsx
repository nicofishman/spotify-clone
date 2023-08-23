import Songs from '@/components/Search/Songs/Songs';
import TopResult from '@/components/Search/TopResult';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import { similarity } from '@/utils/string';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

interface SearchResultsProps {
	query: string;
}

const searchFilters = {
	all: 'All',
	artist: 'Artists',
	playlist: 'Playlists',
	track: 'Songs',
	album: 'Albums',
	shows: 'Shows',
} as const;

export const searchFiltersKeys = Object.keys(searchFilters) as Array<
	keyof typeof searchFilters
>;

function getTopResult(query: string, searchResult: SpotifyApi.SearchResponse) {
	// get the closest match to the query, it can be artist, song, album, playlist, show, episode
	const topItems = intercalateSearchResults(searchResult);

	// Sort the items by the closeness of the name to the query
	const sorted = topItems.sort((a, b) => {
		const aSimilarity = similarity(a.name, query);
		const bSimilarity = similarity(b.name, query);

		return bSimilarity - aSimilarity;
	});

	return sorted[0];
}

function intercalateSearchResults(searchResult: SpotifyApi.SearchResponse) {
	// Intercalate the search results to put one of each type of item at the top
	const items = [
		searchResult.tracks?.items[0],
		searchResult.artists?.items[0],
		searchResult.albums?.items[0],
		searchResult.playlists?.items[0],
		searchResult.shows?.items[0],
		// searchResult.episodes?.items[0],
	].filter(Boolean);
	return items;
}

const SearchResults = ({ query }: SearchResultsProps) => {
	const [width] = mainSizeStore.use('width');
	const router = useRouter();

	const [leftCols, rightCols] = useMemo(() => {
		return width > 1600
			? [2, 5]
			: width > 1200
			? [2, 4]
			: width > 1000
			? [2, 3]
			: width > 700
			? [2, 2]
			: [1, 1];
	}, [width]);

	const [activeFilter, setActiveFilter] =
		useState<keyof typeof searchFilters>('all');

	const { data: searchResult, refetch } = api.browse.query.get.useQuery(
		{
			query: query,
			filter: activeFilter,
		},
		{
			// refetch when activeFilter changes
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		}
	);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		(async () => {
			await refetch();
		})();
	}, [activeFilter, refetch, query]);

	const topResult = useMemo(() => {
		if (!searchResult) return undefined;
		return getTopResult(query, searchResult);
	}, [query, searchResult]);

	return (
		<div>
			<div className='sticky flex h-12 w-full gap-x-4 bg-gray-bg pt-[7px]'>
				{Object.entries(searchFilters).map(([key, value]) => (
					<button
						key={key}
						className={cn(
							`flex h-fit min-h-[32px] items-center justify-center rounded-full px-3 py-1 text-sm font-normal`,
							activeFilter === key
								? 'bg-white text-black'
								: 'bg-gray-bg text-white'
						)}
						onClick={() =>
							setActiveFilter(key as keyof typeof searchFilters)
						}
					>
						{value}
					</button>
				))}
			</div>
			<div className='mt-4 min-h-[300px] w-full'>
				<div className='flex h-full w-full flex-col gap-6 @[700px]/main:flex-row'>
					{topResult ? (
						<section
							className='h-full min-h-full w-full overflow-x-hidden overflow-y-visible'
							style={{
								flex: leftCols,
							}}
						>
							<h2 className='mb-4 truncate text-2xl font-bold'>
								Top result
							</h2>
							<TopResult topResult={topResult} />
						</section>
					) : undefined}

					<section
						className='h-full min-h-full w-full'
						style={{
							flex: rightCols,
						}}
					>
						<h2 className='mb-4 truncate text-2xl font-bold'>
							Songs
						</h2>
						<Songs
							router={router}
							songs={
								searchResult?.tracks?.items.slice(0, 4) ?? []
							}
						/>
					</section>
				</div>
			</div>
		</div>
	);
};

export default SearchResults;
