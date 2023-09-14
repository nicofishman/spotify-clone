import { NowPlaying, Sidebar, TopBar } from '@/components/Layout';
import Footer from '@/components/Layout/Footer';
import useElementSize from '@/hooks/useElementSize';
import { mainSizeStore } from '@/stores/mainSizeStore';
import { myFont } from '@/styles/font';
import { cn } from '@/utils/cn';
import React, { useEffect } from 'react';

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
        <Sidebar />
        <div className='flex flex-col overflow-x-hidden text-white grid-in-main-view @container/main'>
          <main
            ref={mainRef}
            className={cn(
              'grid flex-1 grid-rows-[1fr_auto] px-[--contentSpacing]',
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
                '-mb-16 -mt-[88px] flex h-full flex-col gap-y-4 py-16',
                divClassName
              )}
            >
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <NowPlaying />
      </div>
    </div>
  );
};

export default Layout;
