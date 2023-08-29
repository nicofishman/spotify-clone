import CardSquareGrid from '@/components/Artitst/CardSquareGrid';
import RelatedArtistCardSquare from '@/components/Artitst/RelatedArtistCardSquare';
import { api } from '@/utils/api';
import Link from 'next/link';

interface RelatedArtistsProps {
	artistId: string;
}

const RelatedArtists = ({ artistId }: RelatedArtistsProps) => {
	const { data: relatedArtists, isLoading } =
		api.artist.getRelatedArtists.useQuery(artistId);

	return (
		<section>
			<h2 className='flex justify-between'>
				<span className='text-2xl font-bold'>Fans also like</span>
				<Link href={`/artist/${artistId}/related`}>
					<span className='text-sm font-bold text-zinc-400 hover:underline'>
						Show all
					</span>
				</Link>
			</h2>

			<CardSquareGrid isLoading={isLoading}>
				{({ columnCount }) =>
					relatedArtists?.artists
						.slice(0, columnCount)
						.map((artist) => {
							return (
								<RelatedArtistCardSquare
									key={artist.id}
									artist={artist}
								/>
							);
						})
				}
			</CardSquareGrid>
		</section>
	);
};

export default RelatedArtists;
