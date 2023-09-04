import { cn } from '@/utils/cn';
import React from 'react';

interface IconButtonLayoutProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	selected: boolean;
	children: React.ReactNode;
}

const IconButtonLayout = ({
	children,
	selected,
	...props
}: IconButtonLayoutProps) => {
	return (
		<button
			className={cn(
				'flex h-8 w-8 items-center justify-center rounded-full fill-white/70 p-2 transition-colors duration-200 hover:bg-white/20',
				selected && 'bg-white/10 fill-white'
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default IconButtonLayout;
