import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import { type RouterOutputs } from '@/utils/api';
import React from 'react';

interface AlbumGridProps {
	isLoading: boolean;
	albums: RouterOutputs['artist']['getAlbums']['items'];
	slice?: boolean;
}

const AlbumGrid = ({ albums, isLoading, slice = false }: AlbumGridProps) => {
	return (
		<CardSquareGrid className='gap-y-6' isLoading={isLoading}>
			{({ columnCount }) =>
				albums
					.slice(0, slice ? columnCount : albums.length)
					.map((album) => {
						return <AlbumCardSquare key={album.id} album={album} />;
					})
			}
		</CardSquareGrid>
	);
};

export default AlbumGrid;
