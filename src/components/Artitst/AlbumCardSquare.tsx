import PlaylistOrAlbumCardSquare from '@/components/shared/PlaylistOrAlbumCardSquare';
import React from 'react';

interface AlbumCardSquareProps {
	album: SpotifyApi.AlbumObjectSimplified;
}

const AlbumCardSquare = ({ album }: AlbumCardSquareProps) => {
	return (
		<PlaylistOrAlbumCardSquare
			imageUrl={album.images[0]?.url ?? ''}
			type='album'
			name={album.name}
			id={album.id}
			description={`${new Date(
				album.release_date
			).getFullYear()} • Album`}
		/>
	);
};

export default AlbumCardSquare;
