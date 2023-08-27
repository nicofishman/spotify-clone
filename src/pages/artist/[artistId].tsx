import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { api } from '@/utils/api';
import ArtistTitle from '@/components/Artitst/ArtistTitle';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import tracksStore from '@/stores/tracksStore';
import FollowButton from '@/components/Artitst/FollowButton';
import ThreeDotsArtist from '@/components/Artitst/ThreeDotsArtist';

const ArtistPage = () => {
	const artistId = useRouter().query.artistId as string;

	const { data: artist } = api.artist.get.useQuery(artistId, {
		enabled: !!artistId,
	});

	const [currentPlaying] = tracksStore.use('nowPlayingArtist');

	return (
		<>
			<Head>
				<title>{`${artist?.name ?? ''} | Spotify`}</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Layout divClassName='pt-0' mainClassName='px-0'>
				<>
					<div
						className='relative flex h-[40vh] items-end bg-cover bg-center [background-image:--bg-image]'
						style={{
							// @ts-ignore
							'--bg-image': `url(${
								artist?.images[0]?.url ?? ''
							})`,
						}}
					>
						<div className='absolute inset-0 bg-black/40 backdrop-blur-3xl'></div>
						{artist && <ArtistTitle artist={artist} />}
					</div>
					<div className='flex w-full items-center gap-x-[calc(var(--contentSpacing)+8px)] p-[--contentSpacing]'>
						<PlayPauseButton
							className='scale-[1.20]'
							isPlaying={
								(currentPlaying?.is_playing ?? false) &&
								(currentPlaying?.artists.includes(artistId) ??
									false)
							}
						/>
						<FollowButton artistId={artistId} />
						<ThreeDotsArtist artistId={artistId} />
					</div>
				</>
			</Layout>
		</>
	);
};

export default ArtistPage;
