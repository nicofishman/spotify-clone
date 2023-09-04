import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import Chip from '@/components/UI/Chip';
import { api } from '@/utils/api';
import { discographyTypes } from '@/utils/discographyTypes';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface DiscographyProps {
	artistId: string;
}

const Discography = ({ artistId }: DiscographyProps) => {
	const { data: discography, isLoading } = api.artist.getAlbums.useQuery(
		{
			artistId,
			include_groups: ['album', 'single', 'compilation'],
		},
		{
			enabled: !!artistId,
		}
	);

	const selectTypes = discographyTypes.map((type) => {
		return {
			...type,
			visible:
				type.value === 'all' ||
				(discography?.items.some(
					(album) => album.album_type === type.value
				) as boolean),
		};
	});

	const [selection, setSelection] =
		useState<(typeof selectTypes)[number]['value']>('all');

	const discographyArray = useMemo(() => {
		if (!discography) return [];

		switch (selection) {
			case 'all':
				return discography.items;
			case 'album':
				return discography.items.filter(
					(album) => album.album_type === 'album'
				);
			case 'single':
				return discography.items.filter(
					(album) => album.album_type === 'single'
				);
			case 'compilation':
				return discography.items.filter(
					(album) => album.album_type === 'compilation'
				);
		}
	}, [discography, selection]);

	return (
		<section>
			<h2 className='flex justify-between'>
				<Link href={`/artist/${artistId}/discography/${selection}`}>
					<span className='text-2xl font-bold hover:underline'>
						Discography
					</span>
				</Link>
				<Link
					className='hidden sm:block'
					href={`/artist/${artistId}/discography/${selection}`}
				>
					<span className='text-sm font-bold text-zinc-400 hover:underline'>
						Show all
					</span>
				</Link>
			</h2>
			<ul className='my-4 flex gap-x-2'>
				{selectTypes.map((type) => {
					return (
						type.visible && (
							<li key={type.value}>
								<Chip
									onClick={() => setSelection(type.value)}
									active={selection === type.value}
								>
									{type.name}
								</Chip>
							</li>
						)
					);
				})}
			</ul>

			<CardSquareGrid isLoading={isLoading}>
				{({ columnCount }) =>
					discographyArray?.slice(0, columnCount).map((album) => {
						return <AlbumCardSquare key={album.id} album={album} />;
					})
				}
			</CardSquareGrid>
		</section>
	);
};

export default Discography;
