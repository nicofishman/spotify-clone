import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import Layout from '@/components/Layout/Layout';
import PlaylistTable from '@/components/Playlist/PlaylistTable';
import PlaylistTitle from '@/components/Playlist/PlaylistTitle';
import ThreeDotsButtonPlaylistTitle from '@/components/Playlist/ThreeDotsButtonPlaylistTitle';
import { api } from '@/utils/api';
import { FastAverageColor } from 'fast-average-color';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const PlaylistPage = () => {
	const playlistId = useRouter().query.playlistId as string;
	const fac = useMemo(() => new FastAverageColor(), []);
	const [gradientColor, setGradientColor] = useState({
		value: [88, 232, 128],
	});

	const { data: user } = api.me.info.get.useQuery();

	const { data: playlist } = api.playlist.get.useQuery(playlistId, {
		enabled: !!playlistId,
		onSuccess: async (playlist) => {
			if (!playlist.images[0]?.url) return;
			const gC = await fac.getColorAsync(playlist.images[0].url);
			setGradientColor({
				value: gC.value.splice(0, 3),
			});
		},
	});

	const isOwner = useMemo(
		() =>
			playlist?.collaborative ||
			playlist?.owner?.display_name === user?.name,
		[playlist?.collaborative, playlist?.owner?.display_name, user?.name]
	);
	return (
		<>
			<Head>
				<title>
					{playlist
						? `${playlist?.name} - playlist by ${
								playlist?.owner?.display_name ?? ''
						  }`
						: 'Loading...'}
				</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Layout
				mainClassName='px-0 gap-y-0'
				style={{
					backgroundImage: `linear-gradient(180deg, rgba(${gradientColor.value.join(
						','
					)}, 0.8) 0%, #121212 100%)`,
				}}
			>
				<>
					{playlist ? (
						<>
							<PlaylistTitle playlist={playlist} />
							<div className='flex-1 bg-black/30'>
								<div className='flex items-center gap-x-8 p-[--contentSpacing]'>
									<PlayPauseButton
										isPlaying={false}
										className='scale-110 hover:scale-125 '
									/>
									<ThreeDotsButtonPlaylistTitle
										iconClassName='scale-150'
										playlistId={playlist.id}
									/>
								</div>
								<PlaylistTable
									isOwner={isOwner}
									playlistId={playlist.id}
								/>
							</div>
						</>
					) : undefined}
				</>
			</Layout>
		</>
	);
};

export default PlaylistPage;
