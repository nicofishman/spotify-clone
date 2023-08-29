import AlbumCardSquare from '@/components/Artitst/AlbumCardSquare';
import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import { api } from '@/utils/api';
import Link from 'next/link';

interface DiscographyProps {
	artistId: string;
}

const Discography = ({ artistId }: DiscographyProps) => {
	const { data: discography, isLoading } =
		api.artist.getAlbums.useQuery(artistId);

	return (
		<section>
			<h2 className='flex justify-between'>
				<span className='text-2xl font-bold'>Discography</span>
				<Link href={`/artist/${artistId}/discography/all`}>
					<span className='text-sm font-bold text-zinc-400 hover:underline'>
						Show all
					</span>
				</Link>
			</h2>

			<CardSquareGrid isLoading={isLoading}>
				{({ columnCount }) =>
					discography?.items.slice(0, columnCount).map((album) => {
						return <AlbumCardSquare key={album.id} album={album} />;
					})
				}
			</CardSquareGrid>
		</section>
	);
};

export default Discography;
