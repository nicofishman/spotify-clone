import { createGlobalStore } from '@/utils/createGlobalStore';

export const likedAlbumsStore = createGlobalStore<{
	albumsLiked: string[];
}>({
  albumsLiked: [],
});
