import {
	GoBackButton,
	GoForwardButton,
} from '@/components/Layout/TopBar/ButtonsWithTooltip';
import UserChipWithDropdown from '@/components/Layout/TopBar/UserChipWithDropdown';
import { useRouter } from 'next/router';

export const TopBar = () => {
	const router = useRouter();

	return (
		<header className='sticky top-0 h-16 grid-in-top-bar'>
			<div className='flex h-full w-full justify-between px-8 py-4'>
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
				<UserChipWithDropdown />
			</div>
		</header>
	);
};
