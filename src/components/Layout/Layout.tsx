import NowPlaying from '@/components/Layout/NowPlaying';
import Sidebar from '@/components/Layout/Sidebar';
import TopBar from '@/components/Layout/TopBar';
import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='grid h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] grid-areas-layout'>
			<Sidebar />
			<TopBar />
			<main className='bg-blue-500 grid-in-main-view'>{children}</main>
			<NowPlaying />
		</div>
	);
};

export default Layout;
