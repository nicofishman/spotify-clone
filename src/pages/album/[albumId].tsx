import AlbumTitle from '@/components/Album/AlbumTitle';
import Layout from '@/components/Layout/Layout';
import { api } from '@/utils/api';
import { FastAverageColor } from 'fast-average-color';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import ThreeDotsButtonAlbumTitle from '@/components/Album/ThreeDotsButtonAlbumTitle';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import { albumLiked } from '@/stores/albumLiked';
import LikeAlbumButton from '@/components/Album/LikeAlbumButton';
import AlbumTable from '@/components/Album/AlbumTable';

const PlaylistPage = () => {
	const albumId = useRouter().query.albumId as string;
	const fac = useMemo(() => new FastAverageColor(), []);
	const [gradientColor, setGradientColor] = useState({
		value: [88, 232, 128],
	});

	const { data: album } = api.album.get.useQuery(albumId, {
		enabled: !!albumId,
		onSuccess: async (album) => {
			if (!album.images[0]?.url) return;
			const gC = await fac.getColorAsync(album.images[0].url);
			setGradientColor({
				value: gC.value.splice(0, 3),
			});
			albumLiked.set('albumLiked', album.isLiked);

			console.log(gC.rgb.replace('rgb(', '').replace(')', ''));

			document.body.style.setProperty(
				'--top-bar-color',
				`${gC.rgb.replace('rgb(', '').replace(')', '')}`
			);
		},
	});

	return (
		<>
			<Head>
				<title>
					{album
						? `${album?.name} - album by ${
								album.artists
									.map((art) => art.name)
									.join(', ') ?? ''
						  }`
						: 'Loading...'}
				</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Layout
				mainClassName='px-0 gap-y-0'
				style={{
					backgroundImage: `linear-gradient(180deg, rgba(${gradientColor.value.join(
						','
					)}, 0.8) 0%, #121212 100%)`,
				}}
			>
				<>
					{album ? (
						<>
							<AlbumTitle album={album} />
							<div className='flex-1 bg-black/30'>
								<div className='flex items-center gap-x-8 p-[--contentSpacing]'>
									<PlayPauseButton
										isPlaying={false}
										className='scale-110 hover:scale-125 '
									/>
									<LikeAlbumButton albumId={album.id} />
									<ThreeDotsButtonAlbumTitle
										iconClassName='scale-150'
										album={album}
									/>
								</div>
								<AlbumTable
									albumImage={album.images[0]?.url}
									albumId={album.id}
								/>
							</div>
						</>
					) : undefined}
				</>
			</Layout>
		</>
	);
};

export default PlaylistPage;
