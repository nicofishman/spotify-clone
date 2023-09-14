import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import React from 'react';

export const FullscreenButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
          <Icon
            name='fullscreen'
            className='fill-white/70 transition-colors hover:fill-white'
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Full screen</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
