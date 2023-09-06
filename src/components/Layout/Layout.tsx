import { NowPlaying, Sidebar, TopBar } from '@/components/Layout';
import Footer from '@/components/Layout/Footer';
import useElementSize from '@/hooks/useElementSize';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { myFont } from '@/styles/font';
import { cn } from '@/utils/cn';
import { signIn, useSession } from 'next-auth/react';
import React, { Fragment, useEffect } from 'react';

type LayoutProps = {
	children: React.ReactElement | React.ReactElement[];
	className?: string;
	mainClassName?: string;
	divClassName?: string;
	style?: React.CSSProperties;
	topBarContent?: React.ReactNode;
	topBarOpacity?: boolean;
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
	style,
	mainClassName,
	divClassName,
	includeSearchInput = false,
	searchInput,
	onSearchInputChange,
	topBarContent,
	topBarOpacity = true,
}: LayoutProps) => {
	const { data: session } = useSession();

	const [mainRef, mainSize] = useElementSize(mainSizeStore);

	useEffect(() => {
		if (!topBarOpacity) {
			document.body.style.setProperty(
				'--top-bar-color',
				'rgb(24, 24, 24)'
			);
			document.body.style.setProperty('--top-bar-opacity', '1');
			document.body.style.setProperty('--top-bar-content-opacity', '1');
		} else {
			document.body.style.setProperty('--top-bar-opacity', '0');
			document.body.style.setProperty('--top-bar-content-opacity', '0');
		}
	}, [topBarOpacity]);

	useEffect(() => {
		if (mainSize) {
			document.documentElement.style.setProperty(
				'--main-width',
				`${mainSize.width}px`
			);
		}
	}, [mainSize]);

	return (
		<div className='h-screen w-full bg-black'>
			<div
				className={cn(
					'grid-cols[1fr] grid h-screen w-full grid-rows-[auto_1fr_auto] bg-gray-bg grid-areas-layoutSmall md:grid-cols-[auto_1fr] md:grid-areas-layoutLarge',
					className,
					myFont.className
				)}
				style={style}
			>
				{session ? (
					<>
						<Sidebar />

						<main
							ref={mainRef}
							className={cn(
								'grid grid-rows-[1fr_auto] overflow-x-hidden px-8 text-white grid-in-main-view @container/main',
								mainClassName
							)}
						>
							{includeSearchInput &&
							searchInput !== undefined &&
							onSearchInputChange ? (
								<TopBar
									changeOpacity={topBarOpacity}
									includeSearchInput={true}
									searchInput={searchInput}
									setSearchInput={onSearchInputChange}
									content={topBarContent}
								/>
							) : (
								<TopBar
									changeOpacity={topBarOpacity}
									includeSearchInput={false}
									content={topBarContent}
								/>
							)}
							<div
								className={cn(
									'-mb-16 -mt-[88px] flex h-full flex-col gap-y-4 pb-8 pt-16',
									divClassName
								)}
							>
								{children}
							</div>
							<Footer />
						</main>
						<NowPlaying />
					</>
				) : (
					<main
						ref={mainRef}
						className={cn(
							'flex flex-col items-center justify-center gap-y-6 overflow-x-hidden px-8 pt-6 text-white grid-in-main-view @container/main',
							mainClassName
						)}
					>
						<button
							className='w-full max-w-2xl bg-spotify-green py-2 font-black'
							onClick={() => signIn('spotify')}
						>
							Log in
						</button>
					</main>
				)}
			</div>
		</div>
	);
};

export default Layout;
