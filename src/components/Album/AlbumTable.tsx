import AlbumRow from '@/components/Album/AlbumRow';
import { LoadingRow } from '@/components/Playlist/PlaylistTable';
import Icon from '@/components/UI/Icon';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/UI/Table';
import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/router';

type AlbumTableProps = {
	albumId: string;
	className?: string;
} & (
	| {
			showImage?: true;
			albumImage: string | undefined;
	  }
	| {
			showImage: false;
			albumImage?: never;
	  }
);

const AlbumTable = ({
	albumId,
	albumImage,
	className,
	showImage = true,
}: AlbumTableProps) => {
	const {
		data: albumTracks,
		refetch: refetchGetTracks,
		isFetching,
	} = api.album.getTracks.useQuery(albumId, {
		onSettled: () => {
			if (!albumTracks) {
				void refetchGetTracks();
			}
		},
		enabled: !!albumId,
	});

	const router = useRouter();
	const [likedTracks] = tracksStore.use('likedTracks');

	return (
		<div
			className={cn(
				'pl-[--contentSpacing] pr-3 text-gray-300',
				className
			)}
		>
			<Table className='table-fixed'>
				<TableHeader>
					<TableRow className='border-b-gray-400/50 [&>th]:fill-gray-300 [&>th]:font-normal [&>th]:text-gray-300'>
						<TableHead className='w-10 text-center'>#</TableHead>
						<TableHead className='flex-1'>Title</TableHead>
						<TableHead className='mr-4 w-32'>
							<Icon
								name='clock'
								className='mx-auto -translate-x-1/2'
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				{!isFetching ? (
					<TableBody className='before:block before:leading-4 before:content-["\200C"]'>
						{albumTracks?.items.map((item, index) => (
							<AlbumRow
								albumId={albumId}
								albumImage={albumImage}
								key={item.id}
								index={index}
								isLiked={likedTracks.includes(item.id)}
								router={router}
								track={item}
								showImage={showImage}
							/>
						))}
					</TableBody>
				) : (
					<TableBody>
						{Array.from({
							length:
								albumTracks?.total && albumTracks?.total >= 5
									? 5
									: albumTracks?.total ?? 1,
						}).map((_, index) => (
							<LoadingRow cellCount={3} key={index} />
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default AlbumTable;
