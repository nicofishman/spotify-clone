import {
	GoBackButton,
	GoForwardButton,
} from '@/components/Layout/TopBar/ButtonsWithTooltip';
import SearchInput from '@/components/Layout/TopBar/SearchInput';
import UserChipWithDropdown from '@/components/Layout/TopBar/UserChipWithDropdown';
import { useRouter } from 'next/router';

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

	return (
		<header className='sticky top-0 z-10 h-16 grid-in-top-bar'>
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
