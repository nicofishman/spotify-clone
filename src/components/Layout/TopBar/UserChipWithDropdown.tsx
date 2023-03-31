import UserChip from '@/components/Layout/TopBar/UserChip';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/UI/Dropdown';
import Icon from '@/components/UI/Icon';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';

const UserChipWithDropdown = () => {
	const [isOpen, setOpen] = useState(false);
	return (
		<DropdownMenu open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
			<DropdownMenuTrigger className='outline-none'>
				<UserChip isOpen={isOpen} />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem className='justify-between'>
					<span>Account</span>
					<Icon name='externalUrl' />
				</DropdownMenuItem>
				<DropdownMenuItem className='justify-between'>
					<span>Set up your family plan</span>
					<Icon name='externalUrl' />
				</DropdownMenuItem>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserChipWithDropdown;
