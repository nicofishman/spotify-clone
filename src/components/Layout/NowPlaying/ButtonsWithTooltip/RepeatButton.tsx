import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface RepeatButtonProps {
  isRepeating: boolean;
}

export const RepeatButton = ({ isRepeating }: RepeatButtonProps) => {
  const [localRepeat, setLocalRepeat] = useState(isRepeating);
  const repeatMutation = api.me.player.repeat.useMutation({
    onMutate: (newRepeat) => {
      setLocalRepeat(newRepeat === 'track');
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='flex h-8 w-8 items-center justify-center'>
          <Icon
            onClick={() => {
              repeatMutation.mutate(localRepeat ? 'off' : 'track');
            }}
            name='repeat'
            className={cn(
              'hover:brightness-125',
              localRepeat
                ? 'fill-spotify-green after:bottom-0 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full'
                : 'fill-white/70'
            )}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{localRepeat ? 'Disable repeat' : 'Enable repeat'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
