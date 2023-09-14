import {
  GoBackButton,
  GoForwardButton,
} from '@/components/Layout/TopBar/ButtonsWithTooltip';
import SearchInput from '@/components/Layout/TopBar/SearchInput';
import UserChipWithDropdown from '@/components/Layout/TopBar/UserChipWithDropdown';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TopBarProps = {
  changeOpacity?: boolean;
  content?: React.ReactNode;
} & (
  | {
      includeSearchInput: false;
      searchInput?: never;
      setSearchInput?: never;
    }
  | {
      includeSearchInput: true;
      searchInput: string;
      setSearchInput: (value: string) => void;
    }
);

export const TopBar = ({
  includeSearchInput,
  searchInput = '',
  setSearchInput,
  content,
  changeOpacity = true,
}: TopBarProps) => {
  const router = useRouter();

  const handleScroll = (e: Event) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const top = e.target.scrollTop;

    if (top > 370) {
      document.body.style.setProperty('--top-bar-opacity', '1');
      document.body.style.setProperty('--top-bar-content-opacity', '1');
    } else {
      document.body.style.setProperty(
        '--top-bar-opacity',
        (top / 370).toFixed(2)
      );
      document.body.style.setProperty('--top-bar-content-opacity', '0');
    }
  };
  useEffect(() => {
    if (!changeOpacity) return;
    const container = document.querySelector('main')?.parentElement;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [changeOpacity]);

  return (
    <header className='grid-in-top-bar sticky top-0 z-10 h-16 w-full bg-[rgba(var(--top-bar-color),var(--top-bar-opacity))]'>
      {content && (
        <div className='z-1 absolute inset-0 bg-black/30 opacity-[--top-bar-opacity]' />
      )}
      <div className='relative flex h-full w-full items-center justify-between gap-x-4 px-8'>
        <div className='z-10 flex items-center gap-x-4 py-4'>
          <GoBackButton
            onClick={() => {
              router.back();
            }}
          />
          <GoForwardButton
            onClick={() => {
              router.forward();
            }}
          />
        </div>
        {includeSearchInput && (
          <div className='flex-1'>
            <SearchInput
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                router.push(`/search?q=${e.target.value}`);
              }}
            />
          </div>
        )}
        {content && (
          <div className='h-full flex-1 opacity-[var(--top-bar-content-opacity)] transition'>
            {content}
          </div>
        )}
        <UserChipWithDropdown />
      </div>
    </header>
  );
};

TopBar.displayName = 'TopBar';
