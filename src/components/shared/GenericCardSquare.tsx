import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import RelatedArtistCardSquare from '@/components/Artitst/RelatedArtistCardSquare';
import PlaylistCardSquare from '@/components/Index/PlaylistCardSquare/PlaylistCardSquare';
import { type SearchFilterKeyType } from '@/components/Search/SearchResults';
import ShowCardSquare from '@/components/Show/ShowCardSquare';
import React from 'react';

interface GenericCardSquareProps {
	obj: NonNullable<
		SpotifyApi.SearchResponse[Exclude<SearchFilterKeyType, 'tracks'>]
	>['items'][number];
}

const GenericCardSquare = ({ obj }: GenericCardSquareProps) => {
  switch (obj.type) {
  case 'album':
    return <AlbumCardSquare album={obj} />;
  case 'artist':
    return <RelatedArtistCardSquare artist={obj} />;
  case 'playlist':
    return <PlaylistCardSquare playlist={obj} />;
  case 'show':
    return <ShowCardSquare show={obj} />;
  case 'episode':
    return <ShowCardSquare show={obj} />;
  }
};

export default GenericCardSquare;
