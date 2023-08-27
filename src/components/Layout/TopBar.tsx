import {
	GoBackButton,
	GoForwardButton,
} from '@/components/Layout/TopBar/ButtonsWithTooltip';
import SearchInput from '@/components/Layout/TopBar/SearchInput';
import UserChipWithDropdown from '@/components/Layout/TopBar/UserChipWithDropdown';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type TopBarProps =
	| {
			includeSearchInput: false;
			searchInput?: never;
			setSearchInput?: never;
	  }
	| {
			includeSearchInput: true;
			searchInput: string;
			setSearchInput: (value: string) => void;
	  };

export const TopBar = ({
	includeSearchInput,
	searchInput = '',
	setSearchInput,
}: TopBarProps) => {
	const router = useRouter();

	const handleScroll = (e: Event) => {
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const top = e.target.scrollTop;

		if (top > 370) {
			document.body.style.setProperty('--top-bar-opacity', '1');
		} else {
			document.body.style.setProperty(
				'--top-bar-opacity',
				(top / 370).toFixed(2)
			);
		}
	};
	useEffect(() => {
		const container = document.querySelector('main');
		if (!container) return;

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header className='grid-in-top-bar sticky top-0 z-10 h-16 w-full bg-[rgba(var(--top-bar-color),var(--top-bar-opacity))]'>
			<div className='flex h-full w-full items-center justify-between gap-x-4 px-8 py-4'>
				<div className='flex items-center gap-x-4'>
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
							onChange={async (e) => {
								setSearchInput(e.target.value);
								await router.push(
									`/search?q=${e.target.value}`
								);
							}}
						/>
					</div>
				)}
				<UserChipWithDropdown />
			</div>
		</header>
	);
};

TopBar.displayName = 'TopBar';
