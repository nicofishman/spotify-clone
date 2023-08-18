import { createGlobalStore } from '@/utils/createGlobalStore';

const tracksStore = createGlobalStore<{
	tracks: SpotifyApi.PlaylistTrackObject[];
	likedTracks: string[];
}>({
	tracks: [],
	likedTracks: [],
});

export default tracksStore;
