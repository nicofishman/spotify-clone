import PlaylistOrAlbumCardSquare from '@/components/shared/PlaylistOrAlbumCardSquare';
import React from 'react';

interface ShowCardSquareProps {
	show: SpotifyApi.ShowObjectSimplified | SpotifyApi.EpisodeObjectSimplified;
}

const ShowCardSquare = ({ show }: ShowCardSquareProps) => {
  return (
    <PlaylistOrAlbumCardSquare
      id={show.id}
      imageUrl={show.images[0]?.url ?? ''}
      name={show.name}
      type={show.type}
      description={show.description ?? ''}
    />
  );
};

export default ShowCardSquare;
