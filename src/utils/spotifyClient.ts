export const openSpotify = (url: string) => {
	window.open(url, '_blank');
};

export interface TopResultProps {
	topResult:
		| SpotifyApi.PlaylistObjectSimplified
		| SpotifyApi.TrackObjectFull
		| SpotifyApi.AlbumObjectSimplified
		| SpotifyApi.ArtistObjectFull
		| SpotifyApi.ShowObjectSimplified
		| SpotifyApi.EpisodeObjectSimplified;
}

export function getArtist(item: TopResultProps['topResult']) {
	return 'artists' in item
		? item.artists
		: 'owner' in item
		? ([
				{ name: item.owner.display_name ?? 'Unknown' },
		  ] as SpotifyApi.ArtistObjectSimplified[])
		: 'publisher' in item
		? ([{ name: item.publisher }] as SpotifyApi.ArtistObjectSimplified[])
		: ([
				{
					name: 'Unknown',
				},
		  ] as SpotifyApi.ArtistObjectSimplified[]);
}
