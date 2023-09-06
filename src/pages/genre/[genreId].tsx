import AlbumGrid from '@/components/Discography/AlbumGrid/AlbumGrid';
import Layout from '@/components/Layout/Layout';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import React from 'react';

const GenrePage = () => {
	const router = useRouter();
	const { genreId } = router.query as { genreId: string };

	const { data: genre } = api.browse.categories.get.useQuery(
		{
			id: genreId,
			country: 'AR',
			locale: 'es_AR',
		},
		{
			enabled: !!genreId,
		}
	);

	const { data: genreData } = api.browse.query.get.useQuery(
		{
			query: `genre:"${genreId}"`,
			filter: ['playlist', 'track', 'artist', 'album'],
		},
		{
			enabled: !!genreId,
		}
	);

	return (
		<Layout mainClassName='bg-bg-color'>
			<>
				<div className='flex max-h-[400px] min-h-[30vh] flex-col justify-end px-[--contentSpacing] pb-[--contentSpacing]'>
					<h1 className='line-clamp-1 truncate text-8xl font-black'>
						{genre?.name ?? 'Genre'}
					</h1>
				</div>
				{(genreData?.playlists?.items.length ?? 0) > 0 && (
					<div className='mt-8'>
						<p className='text-2xl font-bold'>Playlists</p>
					</div>
				)}
				{(genreData?.albums?.items.length ?? 0) > 0 && (
					<div className='mt-8'>
						<p className='text-2xl font-bold'>Albums</p>
						<AlbumGrid
							slice={true}
							isLoading={false}
							albums={genreData?.albums?.items ?? []}
						/>
					</div>
				)}
				{(genreData?.artists?.items.length ?? 0) > 0 && (
					<div className='mt-8'>
						<p className='text-2xl font-bold'>Artists</p>
					</div>
				)}
				{(genreData?.tracks?.items.length ?? 0) > 0 && (
					<div className='mt-8'>
						<p className='text-2xl font-bold'>Tracks</p>
					</div>
				)}
			</>
		</Layout>
	);
};

export default GenrePage;
