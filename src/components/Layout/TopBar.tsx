import {
	GoBackButton,
	GoForwardButton,
} from '@/components/Layout/TopBar/ButtonsWithTooltip';
import UserChip from '@/components/Layout/TopBar/UserChip';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const TopBar = () => {
	const [isOpen, setOpen] = useState(false);
	const router = useRouter();

	return (
		<header className='sticky top-0 h-16 bg-black grid-in-top-bar'>
			<div className='flex h-full w-full justify-between bg-[#58e880]/50 px-8 py-4'>
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
				<UserChip isOpen={isOpen} setOpen={setOpen} />
			</div>
		</header>
	);
};
