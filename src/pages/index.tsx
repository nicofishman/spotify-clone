import FeaturedPlaylists from '@/components/Index/FeaturedPlaylists';
import Last6Playlists from '@/components/Index/Last6Playlists';
import Layout from '@/components/Layout/Layout';
import Head from 'next/head';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home = () => {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading' || !router) return;
		if (status === 'unauthenticated') {
			void router.push('/login');
		}
	}, [router, status]);

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
				mainClassName='px-0'
			>
				<div className='flex flex-col gap-y-4 pl-[--contentSpacing] pt-8'>
					<Last6Playlists />
					<FeaturedPlaylists />
				</div>
			</Layout>
		</>
	);
};

export default Home;
