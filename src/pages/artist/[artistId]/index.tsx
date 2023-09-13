import ArtistTitle from '@/components/Artitst/ArtistTitle';
import Discography from '@/components/Artitst/Discography';
import AppearsOn from '@/components/Artitst/AppearsOn';
import PlayAndFollowSection from '@/components/Artitst/PlayAndFollowSection';
import PopularTracks from '@/components/Artitst/PopularTracks';
import RelatedArtists from '@/components/Artitst/RelatedArtists';
import Layout from '@/components/Layout/Layout';
import { api } from '@/utils/api';
import { getGcAndSetVariable } from '@/utils/images';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TopBarContent from '@/components/Layout/TopBar/TopBarContent';
import tracksStore from '@/stores/tracksStore';

const ArtistPage = () => {
	const [currentPlaying] = tracksStore.use('currentlyPlaying');
	const artistId = useRouter().query.artistId as string;

	const { data: artist } = api.artist.get.useQuery(artistId, {
		enabled: !!artistId,
		onSuccess: async (artist) => {
			await getGcAndSetVariable(artist.images[0]?.url, '--top-bar-color');
			document.body.style.setProperty(
				'--bg-image',
				`url(${artist.images[0]?.url ?? ''})`
			);
		},
	});

	return (
		<>
			<Head>
				<title>{`${artist?.name ?? ''} | Spotify`}</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Layout
				divClassName='pt-0 gap-y-0'
				topBarContent={
					<TopBarContent
						isPlaying={
							currentPlaying?.context?.uri ===
							`spotify:artist:${artistId}`
						}
						name={artist?.name ?? ''}
					/>
				}
				mainClassName='px-0'
			>
				<>
					<div className='relative flex bg-cover bg-center [background-image:--bg-image]'>
						<div className='absolute inset-0 bg-black/40 backdrop-blur-3xl'></div>
						{artist && <ArtistTitle artist={artist} />}
					</div>
					<div className='grid flex-1 grid-flow-row gap-y-4 bg-gradient-to-b from-[rgba(var(--top-bar-color),0.8)] from-[-200%] to-[#121212] to-60% px-[--contentSpacing]'>
						<PlayAndFollowSection artistId={artistId} />
						<PopularTracks artistId={artistId} />
						<Discography artistId={artistId} />
						<AppearsOn artistId={artistId} />
						<RelatedArtists artistId={artistId} />
					</div>
				</>
			</Layout>
		</>
	);
};

export default ArtistPage;
