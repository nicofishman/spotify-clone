import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import Songs from '@/components/Search/Songs/Songs';
import TopResult from '@/components/Search/TopResult';
import Chip from '@/components/UI/Chip';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { api } from '@/utils/api';
import { similarity } from '@/utils/string';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import GenericCardSquare from '@/components/shared/GenericCardSquare';

interface SearchResultsProps {
	query: string;
}

export const searchFilters = {
  all: 'All',
  artist: 'Artists',
  playlist: 'Playlists',
  track: 'Songs',
  album: 'Albums',
  show: 'Shows',
  episode: 'Podcast Episodes',
} as const;

export const searchFiltersKeys = Object.keys(searchFilters) as Array<
	keyof typeof searchFilters
>;

export type SearchFilterKeyType = `${Exclude<
	keyof typeof searchFilters,
	'all'
>}s`;

function getTopResult(
  query: string,
  searchResult: SpotifyApi.SearchResponse,
  activeFilter: keyof typeof searchFilters
) {
  // get the closest match to the query, it can be artist, song, album, playlist, show, episode
  // const topItems = intercalateSearchResults(searchResult);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const index = (
		activeFilter === 'all' ? 'tracks' : `${activeFilter}s`
	) as SearchFilterKeyType;

  // Sort the items by the closeness of the name to the query
  const sorted = searchResult[index]?.items
    .filter(Boolean)
    .flat()
    .sort((a, b) => {
      const aSimilarity = similarity(a.name, query);
      const bSimilarity = similarity(b.name, query);

      return bSimilarity - aSimilarity;
    });

  if (!sorted?.[0]) return undefined;

  return sorted[0];
}

// function intercalateSearchResults(searchResult: SpotifyApi.SearchResponse) {
// 	// Intercalate the search results to put one of each type of item at the top
// 	const items = [
// 		searchResult.episodes?.items[0],
// 		searchResult.tracks?.items[0],
// 		searchResult.artists?.items[0],
// 		searchResult.albums?.items[0],
// 		searchResult.playlists?.items[0],
// 		searchResult.shows?.items[0],
// 	].filter(Boolean);
// 	return items;
// }

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

  const {
    data: searchResult,
    refetch,
    isLoading,
  } = api.browse.query.get.useQuery(
    {
      query: query,
      filter: ['all'],
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
    return getTopResult(query, searchResult, activeFilter);
  }, [activeFilter, query, searchResult]);

  return (
    <div className='h-full'>
      <div className='sticky flex h-12 w-full gap-x-4 pt-[7px]'>
        {Object.entries(searchFilters).map(([key, value]) => (
          <Chip
            key={key}
            active={activeFilter === key}
            onClick={() =>
              setActiveFilter(key as keyof typeof searchFilters)
            }
          >
            {value}
          </Chip>
        ))}
      </div>
      <div className='mt-4 flex min-h-[300px] w-full flex-col gap-y-8'>
        <div className='flex h-full w-full flex-col gap-8 @[700px]/main:flex-row'>
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
        {searchResult &&
					entries<
						SearchFilterKeyType,
						SpotifyApi.SearchResponse[Exclude<
							SearchFilterKeyType,
							'tracks'
						>]
						// @ts-ignore
					>(searchResult).map(([key, value]) => {
					  if (key === 'tracks') return undefined;
					  return (
					    <Section
					      title={
					        searchFilters[
										key.slice(
										  0,
										  -1
										) as keyof typeof searchFilters
					        ]
					      }
					      items={value}
					      key={key}
					      isLoading={isLoading}
					    >
					      {({ objectFull }) => {
					        return (
					          objectFull?.id && (
					            <GenericCardSquare
					              key={objectFull.id}
					              obj={objectFull}
					            />
					          )
					        );
					      }}
					    </Section>
					  );
					})}
      </div>
    </div>
  );
};

const entries = <K extends string, V>(obj: Record<K, V>) => {
  return Object.entries(obj) as [K, V][];
};

export default SearchResults;

const Section = ({
  title,
  children,
  isLoading,
  items,
}: {
	title: string;
	items: SpotifyApi.SearchResponse[Exclude<SearchFilterKeyType, 'tracks'>];
	children: ({
	  objectFull,
	}: {
		objectFull: NonNullable<
			SpotifyApi.SearchResponse[Exclude<SearchFilterKeyType, 'tracks'>]
		>['items'][number];
	}) => React.ReactNode;
	isLoading: boolean;
}) => (
  <>
    {(items?.items.length ?? 0) > 0 ? (
      <section className='h-full min-h-full w-full'>
        <h2 className='mb-4 truncate text-2xl font-bold'>{title}</h2>
        <CardSquareGrid isLoading={isLoading}>
          {({ columnCount }) =>
            items?.items.slice(0, columnCount).map((obj) =>
              children({
                objectFull: obj,
              })
            )
          }
        </CardSquareGrid>
      </section>
    ) : undefined}
  </>
);
