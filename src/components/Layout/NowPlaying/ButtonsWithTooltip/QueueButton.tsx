import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import React from 'react';

export const QueueButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
          <Icon
            name='queue'
            className='fill-white/70 transition-colors hover:fill-white'
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Queue</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
