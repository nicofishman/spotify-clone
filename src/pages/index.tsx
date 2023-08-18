import FeaturedPlaylists from '@/components/Index/FeaturedPlaylists';
import Last6Playlists from '@/components/Index/Last6Playlists';
import Layout from '@/components/Layout/Layout';
import Head from 'next/head';
import { cn } from '@/utils/cn';

const Home = () => {
	return (
		<>
			<Head>
				<title>Spotify</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Layout
				includeSearchInput={false}
				className={cn(
					'bg-[linear-gradient(rgba(88,232,128,.5)_0,#121212_100%)]'
				)}
			>
				<Last6Playlists />
				<FeaturedPlaylists />
			</Layout>
		</>
	);
};

export default Home;
