import * as React from 'react';

import { cn } from '@/utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, name, type, label, ...props }, ref) => {
		return (
			<div className='relative'>
				<input
					type={type}
					className={cn(
						'peer relative flex h-9 w-full rounded-md border-0 bg-[hsla(0,0%,100%,.1)] px-3 py-1 text-sm text-white shadow-sm file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border focus:border-[#535353] focus:bg-[#333] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>
				{label && (
					<label
						className='absolute left-2.5 top-0 -translate-y-1/2 select-none text-xxs font-bold text-white opacity-0 outline-none transition-opacity before:absolute before:right-1/2 before:top-1/2 before:z-[-1] before:h-0.5 before:w-[110%] before:translate-x-1/2 before:bg-gray-border peer-focus:opacity-100'
						htmlFor={name}
					>
						{label}
					</label>
				)}
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
