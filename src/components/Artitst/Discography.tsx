import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface DiscographyProps {
	artistId: string;
}

const Discography = ({ artistId }: DiscographyProps) => {
	const { data: discography, isLoading } = api.artist.getAlbums.useQuery({
		artistId,
		include_groups: ['album', 'single', 'compilation'],
	});

	const selectTypes = [
		{
			name: 'Popular Releases',
			value: 'all',
		},
		{
			name: 'Albums',
			value: 'album',
		},
		{
			name: 'Singles & EPs',
			value: 'single',
		},
		{
			name: 'Compilations',
			value: 'compilation',
		},
	] as const;

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
						<li key={type.value}>
							<button
								className={cn(
									'rounded-full px-3 py-1 text-[0.8125rem] font-light transition-all sm:text-sm',
									selection === type.value
										? 'bg-white text-black'
										: 'bg-[hsla(0,0%,100%,.07)] text-white'
								)}
								onClick={() => setSelection(type.value)}
							>
								{type.name}
							</button>
						</li>
					);
				})}
			</ul>

			<CardSquareGrid isLoading={isLoading}>
				{({ columnCount }) =>
					discographyArray.slice(0, columnCount).map((album) => {
						return <AlbumCardSquare key={album.id} album={album} />;
					})
				}
			</CardSquareGrid>
		</section>
	);
};

export default Discography;
