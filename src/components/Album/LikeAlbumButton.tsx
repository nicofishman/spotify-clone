import Icon from '@/components/UI/Icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import { likedAlbumsStore } from '@/stores/albumLiked';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';

interface LikeAlbumButtonProps {
  albumId: string;
  className?: string;
  width?: number;
  height?: number;
}

const LikeAlbumButton = ({
  albumId,
  className,
  height,
  width,
  ...props
}: LikeAlbumButtonProps) => {
  const [albumsLiked] = likedAlbumsStore.use('albumsLiked');

  const isLiked = albumsLiked.includes(albumId);

  const { mutate: add } = api.me.album.add.useMutation({
    onMutate: () => {
      likedAlbumsStore.set('albumsLiked', [
        ...likedAlbumsStore.get('albumsLiked'),
        albumId,
      ]);
    },
  });
  const { mutate: remove } = api.me.album.remove.useMutation({
    onMutate: () => {
      likedAlbumsStore.set(
        'albumsLiked',
        likedAlbumsStore.get('albumsLiked').filter((id) => id !== albumId)
      );
    },
  });

  function likeAlbum() {
    if (isLiked) {
      remove([albumId]);
    }
    if (!isLiked) {
      add([albumId]);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn('grid h-8 w-8 place-content-center', className)}
        >
          <Icon
            onClick={likeAlbum}
            name={isLiked ? 'likeActive' : 'likeDefault'}
            height={height ?? 16}
            width={width ?? 16}
            className={cn(
              'transition-colors hover:fill-white',
              isLiked ? 'fill-spotify-green' : 'fill-gray-text'
            )}
            {...props}
          />
        </TooltipTrigger>
        <TooltipContent align='start' side='top'>
          <p>{isLiked ? 'Remove from your library' : 'Add to your library'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LikeAlbumButton;
