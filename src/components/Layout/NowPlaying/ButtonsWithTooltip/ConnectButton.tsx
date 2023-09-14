import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import React from 'react';

export const ConnectButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
          <Icon
            name='connect'
            className='fill-white/70 transition-colors hover:fill-white'
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Connect to a device</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
