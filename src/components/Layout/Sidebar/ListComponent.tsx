import Icon from '@/components/UI/Icon';
import { type Icons } from '@/types/Icons';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react';

interface ListComponentProps {
  link: string;
  iconDefault: keyof typeof Icons;
  iconActive: keyof typeof Icons;
  pathname: string;
  routerPathname: string;
  text: string;
}

const ListComponent = ({
  routerPathname,
  pathname,
  iconActive,
  iconDefault,
  link,
  text,
}: ListComponentProps) => {
  return (
    <li className='px-2'>
      <Link
        className='group flex h-10 w-full items-center gap-x-4 px-4'
        href={link}
      >
        <Icon
          className={cn(
            'peer h-6 w-6 overflow-visible',
            routerPathname === pathname
              ? 'fill-white'
              : 'fill-gray-text transition-colors duration-200 hover:fill-white'
          )}
          name={routerPathname === pathname ? iconActive : iconDefault}
        />
        <span
          className={cn(
            'truncate text-sm font-semibold',
            routerPathname === pathname
              ? 'text-white'
              : 'text-gray-text transition-colors duration-200 group-hover:text-white peer-hover:text-white'
          )}
        >
          {text}
        </span>
      </Link>
    </li>
  );
};

export default ListComponent;
