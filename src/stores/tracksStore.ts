import { type RouterOutputs } from '@/utils/api';
import { createGlobalStore } from '@/utils/createGlobalStore';

const tracksStore = createGlobalStore<{
	tracks: SpotifyApi.PlaylistTrackObject[];
	likedTracks: string[];
	followingArtists: string[];
	currentlyPlaying: RouterOutputs['me']['player']['currentlyPlaying'] | null;
}>({
  tracks: [],
  likedTracks: [],
  followingArtists: [],
  currentlyPlaying: null,
});

export default tracksStore;
