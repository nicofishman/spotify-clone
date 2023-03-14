import { Sidebar, NowPlaying, TopBar } from '@/components/Layout';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { data: session } = useSession();
	return session ? (
		<div className='grid h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] grid-areas-layout'>
			<Sidebar />
			<TopBar />
			<main className='bg-blue-500 grid-in-main-view'>{children}</main>
			<NowPlaying />
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
