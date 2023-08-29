import PlaylistOrAlbumCardSquare from '@/components/shared/PlaylistOrAlbumCardSquare';
import React from 'react';

interface RelatedArtistCardSquareProps {
	artist: SpotifyApi.ArtistObjectFull;
}

const RelatedArtistCardSquare = ({ artist }: RelatedArtistCardSquareProps) => {
	return (
		<PlaylistOrAlbumCardSquare
			imageUrl={artist.images[0]?.url ?? ''}
			type='artist'
			name={artist.name}
			id={artist.id}
			description='Artist'
		/>
	);
};

export default RelatedArtistCardSquare;
