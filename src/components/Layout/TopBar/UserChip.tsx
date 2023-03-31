import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
} from '@/components/UI/Tooltip';
import { cn } from '@/utils/cn';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface UserChipProps {
	isOpen: boolean;
}

const UserChip = ({ isOpen }: UserChipProps) => {
	const { data: user } = useSession();
	return (
		user && (
			<TooltipProvider>
				<Tooltip>
					<div className='flex h-8 items-center gap-x-2 rounded-full bg-black/70 p-0.5'>
						<figure className='h-7 w-7 '>
							<Image
								className='h-full w-full rounded-full object-cover'
								src={user.user.image || ''}
								width={28}
								height={28}
								alt='Profile picture'
							/>
						</figure>
						<span className='text-sm font-bold leading-[inherit] text-white'>
							{user.user.name}
						</span>
						<Icon
							className={cn(
								'mr-1.5 transition-transform',
								isOpen
									? 'rotate-180 transform'
									: 'rotate-0 transform'
							)}
							name='arrowDown'
						/>
					</div>
					<TooltipContent>{user.user.name}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	);
};

export default UserChip;
