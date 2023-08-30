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

	return relatedArtists?.artists && relatedArtists?.artists.length > 0 ? (
		<section>
			<h2 className='flex justify-between'>
				<Link href={`/artist/${artistId}/related`}>
					<span className='text-2xl font-bold hover:underline'>
						Fans also like
					</span>
				</Link>
				<Link
					className='hidden sm:block'
					href={`/artist/${artistId}/related`}
				>
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
	) : (
		<></>
	);
};

export default RelatedArtists;
