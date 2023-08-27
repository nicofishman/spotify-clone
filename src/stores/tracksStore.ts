import { createGlobalStore } from '@/utils/createGlobalStore';

const tracksStore = createGlobalStore<{
	tracks: SpotifyApi.PlaylistTrackObject[];
	likedTracks: string[];
	nowPlayingArtist: { is_playing: boolean; artists: string[] } | null;
	followingArtists: string[];
}>({
	tracks: [],
	likedTracks: [],
	nowPlayingArtist: null,
	followingArtists: [],
});

export default tracksStore;
