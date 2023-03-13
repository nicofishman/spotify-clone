import Icon from '@/components/UI/Icon';
import { useWindowSize } from '@/hooks/useWindowSize';
import Link from 'next/link';
import { ResizableBox } from 'react-resizable';

const Sidebar = ({}) => {
	const { height } = useWindowSize();

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
				<div className='flex flex-col pt-6'>
					<Link className='mb-4 w-full px-6' href={'/'}>
						<Icon
							name='logo'
							className='max-w-[131px] text-white'
						/>
					</Link>
				</div>
			</nav>
		</ResizableBox>
	);
};

export default Sidebar;
