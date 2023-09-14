import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import React, { useEffect, useState } from 'react';

interface LikeSongButtonProps {
  tooltip?: boolean;
  isLiked: boolean;
  trackId: string;
}

export const LikeSongButton = ({
  tooltip = true,
  isLiked: liked,
  trackId,
}: LikeSongButtonProps) => {
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const { mutate: like } = api.me.tracks.saved.add.useMutation({
    onMutate: () => {
      tracksStore.set('likedTracks', [
        ...tracksStore.get('likedTracks'),
        trackId,
      ]);
    },
  });
  const { mutate: unlike } = api.me.tracks.saved.remove.useMutation({
    onMutate: () => {
      tracksStore.set(
        'likedTracks',
        tracksStore.get('likedTracks').filter((id) => id !== trackId)
      );
    },
  });

  function likeSong() {
    if (isLiked) {
      unlike(trackId);
    }
    if (!isLiked) {
      like(trackId);
    }
  }

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className='flex h-8 w-8 items-center justify-center'>
            <Icon
              onClick={likeSong}
              name={isLiked ? 'likeActive' : 'likeDefault'}
              className={cn(
                'h-4 w-4 transition-colors hover:fill-white',
                isLiked ? 'fill-spotify-green' : 'fill-gray-text'
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className='mb-4' side='top' sideOffset={4}>
          {isLiked ? 'Remove from your library' : 'Add to your library'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Icon
      onClick={likeSong}
      name={isLiked ? 'likeActive' : 'likeDefault'}
      className={cn(
        'h-4 w-4 transition-colors hover:fill-white',
        isLiked ? 'fill-spotify-green' : 'fill-gray-text'
      )}
    />
  );
};
