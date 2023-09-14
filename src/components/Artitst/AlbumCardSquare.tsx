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
      description={
        <>
          <time
            dateTime={new Date(album.release_date)
              .getFullYear()
              .toString()}
          >
            {new Date(album.release_date).getFullYear()}
          </time>
          <span className='before:mx-1.5 before:align-middle before:text-[0.5rem] before:content-["•"]'>
            {album.album_type}
          </span>
        </>
      }
    />
  );
};

export default AlbumCardSquare;
