import { NowPlaying, Sidebar, TopBar } from '@/components/Layout';
import useElementSize from '@/hooks/useElementSize';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { cn } from '@/utils/cn';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

type LayoutProps = {
	children: React.ReactElement | React.ReactElement[];
	className?: string;
	mainClassName?: string;
} & (
	| {
			includeSearchInput: true;
			searchInput: string;
			onSearchInputChange: (value: string) => void;
	  }
	| {
			includeSearchInput?: false;
			searchInput?: never;
			onSearchInputChange?: never;
	  }
);

const Layout = ({
	children,
	className,
	mainClassName,
	includeSearchInput = false,
	searchInput,
	onSearchInputChange,
}: LayoutProps) => {
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
			<div
				className={cn(
					'grid h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] bg-gray-bg grid-areas-layout',
					className
				)}
			>
				<Sidebar />
				{includeSearchInput &&
				searchInput !== undefined &&
				onSearchInputChange ? (
					<TopBar
						includeSearchInput={true}
						searchInput={searchInput}
						setSearchInput={onSearchInputChange}
					/>
				) : (
					<TopBar includeSearchInput={false} />
				)}
				<main
					ref={mainRef}
					className={cn(
						'@container/main flex flex-col gap-y-6 overflow-auto px-8 pt-6 text-white grid-in-main-view',
						mainClassName
					)}
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
