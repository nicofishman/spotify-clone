import Header from '@/components/Discography/Header/Header';
import AlbumList from '@/components/Discography/AlbumList/AlbumList';
import Layout from '@/components/Layout/Layout';
import { api } from '@/utils/api';
import { createGlobalStore } from '@/utils/createGlobalStore';
import { discographyTypes } from '@/utils/discographyTypes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { likedAlbumsStore } from '@/stores/albumLiked';
import AlbumGrid from '@/components/Discography/AlbumGrid/AlbumGrid';
import Head from 'next/head';

const DiscographyTypePage = () => {
	const { artistId, type } = useRouter().query as {
		artistId: string;
		type: (typeof discographyTypes)[number]['value'];
	};
	const { data: artist } = api.artist.get.useQuery(artistId, {
		enabled: !!artistId,
	});

	api.me.album.get.useQuery(undefined, {
		onSuccess: (data) => {
			likedAlbumsStore.set(
				'albumsLiked',
				data.map((album) => album.id)
			);
		},
	});

	const { data: allDiscography } = api.artist.getAlbums.useQuery(
		{
			artistId,
			include_groups: ['album', 'single', 'compilation'],
		},
		{
			enabled: !!artistId,
		}
	);

	const { data: discography, isLoading: discographyIsLoading } =
		api.artist.getAlbums.useQuery(
			{
				artistId,
				include_groups:
					type === 'all'
						? ['album', 'single', 'compilation']
						: [type],
			},
			{
				enabled: !!artistId,
			}
		);

	const availableTypes = discographyTypes.map((type) => {
		return {
			...type,
			visible:
				type.value === 'all' ||
				(allDiscography?.items.some(
					(album) => album.album_type === type.value
				) as boolean),
		};
	});

	useEffect(() => {
		document.body.style.setProperty('--top-bar-color', '18, 18, 18');
		document.body.style.setProperty('--top-bar-opacity', '1');
	}, []);

	const [view] = typeViewStore.use('view');

	return (
		<>
			<Head>
				<title>{`Spotify - ${artist?.name ?? ''} - Discography`}</title>
			</Head>
			<Layout mainClassName='px-0 bg-bg-color' topBarOpacity={false}>
				<div className='px-[--contentSpacing]'>
					<Header
						artistId={artistId}
						artistName={artist?.name ?? ''}
						availableTypes={availableTypes}
						type={type}
					/>
					{view === 'list' ? (
						<AlbumList albums={discography?.items ?? []} />
					) : (
						<AlbumGrid
							albums={discography?.items ?? []}
							isLoading={discographyIsLoading}
						/>
					)}
				</div>
			</Layout>
		</>
	);
};

export default DiscographyTypePage;

export const typeViewStore = createGlobalStore<{
	view: 'grid' | 'list';
}>({
	view: 'list',
});
