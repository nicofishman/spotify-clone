import { NowPlaying, Sidebar, TopBar } from '@/components/Layout';
import useElementSize from '@/hooks/useElementSize';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { data: session } = useSession();

	const [mainRef, mainSize] = useElementSize(mainSizeStore);

	useEffect(() => {
		if (mainSize) {
			document.documentElement.style.setProperty(
				'--main-width',
				`${mainSize.width}px`
			);
		}
	}, [mainSize]);

	return session ? (
		<div className='h-screen w-full bg-black'>
			<div className='grid h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] bg-[linear-gradient(rgba(88,232,128,.5)_0,#121212_100%)] grid-areas-layout'>
				<Sidebar />
				<TopBar />
				<main
					ref={mainRef}
					className='flex flex-col gap-y-6 overflow-auto px-8 pt-6 grid-in-main-view'
				>
					{children}
				</main>
				<NowPlaying />
			</div>
		</div>
	) : (
		<div className='h-screen w-screen bg-black'>
			<button
				className='bg-spotify-green'
				onClick={() => signIn('spotify')}
			>
				Log in
			</button>
		</div>
	);
};

export default Layout;
