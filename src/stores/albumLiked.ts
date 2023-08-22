import { createGlobalStore } from '@/utils/createGlobalStore';

export const albumLiked = createGlobalStore<{
	albumLiked: boolean;
}>({
	albumLiked: false,
});
