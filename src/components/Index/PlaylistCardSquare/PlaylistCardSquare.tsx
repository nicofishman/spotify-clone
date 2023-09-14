import PlaylistOrAlbumCardSquare from '@/components/shared/PlaylistOrAlbumCardSquare';

interface PlaylistCardSquareProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistCardSquare = ({ playlist }: PlaylistCardSquareProps) => {
  return (
    <PlaylistOrAlbumCardSquare
      id={playlist.id}
      imageUrl={playlist.images[0]?.url ?? ''}
      name={playlist.name}
      type='playlist'
      description={playlist.description ?? ''}
    />
  );
};

export default PlaylistCardSquare;
