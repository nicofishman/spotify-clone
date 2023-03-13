import CreatePlaylistIcon from '@/components/Layout/Sidebar/CreatePlaylistIcon';
import LikedPlaylists from '@/components/Layout/Sidebar/LikedPlaylists';
import LikedSongsIcon from '@/components/Layout/Sidebar/LikedSongsIcon';
import ListComponent from '@/components/Layout/Sidebar/ListComponent';
import Icon from '@/components/UI/Icon';
import { useWindowSize } from '@/hooks/useWindowSize';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ResizableBox } from 'react-resizable';

export const Sidebar = ({}) => {
	const { height } = useWindowSize();
	const router = useRouter();

	const { data: likedPlaylists } = api.user.playlists.list.useQuery({
		me: true,
	});

	return (
		<ResizableBox
			handle={
				<div className='absolute top-0 right-0 h-full w-2 cursor-e-resize bg-white/10'></div>
			}
			style={{
				height: '100%',
			}}
			height={height ? height - 96 : 0}
			handleSize={[2, 0]}
			width={268}
			minConstraints={[130, 0]}
			maxConstraints={[384, Infinity]}
			className='relative h-full resize-x grid-in-nav-bar'
			axis='x'
		>
			<nav className='h-full w-full min-w-[130px] max-w-sm overflow-auto bg-black text-white'>
				<div className='flex h-full flex-col pt-6'>
					<Link
						className='mb-[18px] h-16 w-full shrink-0 origin-left px-6'
						href={'/'}
					>
						<Icon
							name='logo'
							className='w-fit max-w-[131px] text-white'
						/>
					</Link>
					<ul>
						<ListComponent
							iconActive='homeActive'
							iconDefault='homeDefault'
							link='/'
							pathname='/'
							routerPathname={router.pathname}
							text='Home'
						/>
						<ListComponent
							iconActive='searchActive'
							iconDefault='searchDefault'
							link='/search'
							pathname='/search'
							routerPathname={router.pathname}
							text='Search'
						/>
						<ListComponent
							iconActive='collectionActive'
							iconDefault='collectionDefault'
							link='/collection/playlists'
							pathname='/collection/playlists'
							routerPathname={router.pathname}
							text='Your Library'
						/>
					</ul>
					<div className='mt-6 flex flex-1 flex-col'>
						<button className='flex w-full items-center gap-x-4 px-6 py-2 opacity-70 transition-all duration-200 hover:opacity-100'>
							<CreatePlaylistIcon />
							<span className='truncate text-sm font-bold'>
								Create Playlist
							</span>
						</button>
						<Link
							href={'/collection/tracks'}
							className={cn(
								'flex w-full items-center gap-x-4 px-6 py-2 opacity-70 transition-all duration-200 hover:opacity-100',
								router.pathname === '/collection/tracks' &&
									'opacity-100'
							)}
						>
							<LikedSongsIcon />
							<span className='truncate text-sm font-bold'>
								Liked Songs
							</span>
						</Link>
					</div>
					<hr className='mx-6 mt-2 h-px border-none bg-gray-bg' />
					<div className='flex h-full w-full flex-col py-2'>
						<LikedPlaylists
							playlists={likedPlaylists?.items ?? []}
						/>
					</div>
				</div>
			</nav>
		</ResizableBox>
	);
};
