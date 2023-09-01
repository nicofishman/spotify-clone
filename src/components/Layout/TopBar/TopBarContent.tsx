import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';

const TopBarContent = ({
	name,
	isPlaying,
}: {
	name: string;
	isPlaying: boolean;
}) => {
	return (
		<div className='flex h-full items-center gap-x-4'>
			<PlayPauseButton isPlaying={isPlaying} />
			<span className='text-2xl font-bold'>{name}</span>
		</div>
	);
};

export default TopBarContent;
