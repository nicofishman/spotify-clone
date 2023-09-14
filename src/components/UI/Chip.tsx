import { cn } from '@/utils/cn';
import React from 'react';

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	active: boolean;
}

const Chip = ({
  active,
  children,
  className: _className,
  ...props
}: ChipProps) => {
  return (
    <button
      className={cn(
        'min-w-[60px] rounded-full px-3 py-1 text-[0.8125rem] font-light transition-all sm:text-sm',
        active
          ? 'bg-white text-black'
          : 'bg-[hsla(0,0%,100%,.07)] text-white',
        _className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Chip;
