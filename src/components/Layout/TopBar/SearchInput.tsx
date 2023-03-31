import Icon from '@/components/UI/Icon';
import { cn } from '@/utils/cn';
import React from 'react';

interface SearchInputProps extends React.HTMLAttributes<HTMLInputElement> {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
	value,
	onChange,
	className,
	...props
}: SearchInputProps) => {
	return (
		<div className='flex h-10 w-full max-w-sm items-center rounded-full bg-white px-4'>
			<Icon name='searchDefault' className='mr-4 text-gray-bg' />
			<input
				value={value}
				onChange={onChange}
				type='text'
				className={cn(
					'h-fit flex-1 py-1.5 text-sm outline-none placeholder:text-gray-text',
					className
				)}
				placeholder='What do you want to listen to?'
				{...props}
			/>
			{value?.length && value.length > 0 ? (
				<button
					onClick={() =>
						onChange({
							target: { value: '' },
						} as React.ChangeEvent<HTMLInputElement>)
					}
				>
					<Icon name='cross' className='ml-2 text-gray-bg' />
				</button>
			) : undefined}
		</div>
	);
};

export default SearchInput;
