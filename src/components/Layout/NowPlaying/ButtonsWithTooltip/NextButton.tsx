import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import { api } from '@/utils/api';
import React from 'react';

export const NextButton = () => {
  const nextMutation = api.me.player.next.useMutation();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            nextMutation.mutate();
          }}
          className='flex h-8 w-8 items-center justify-center'
        >
          <Icon
            name='next'
            className='fill-white/70 transition-colors hover:fill-white'
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Next</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
