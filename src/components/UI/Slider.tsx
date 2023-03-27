import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			'group relative flex w-full touch-none select-none items-center',
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className=' relative h-1 w-full grow overflow-hidden rounded-full bg-white/30'>
			<SliderPrimitive.Range className='absolute h-full bg-white group-hover:bg-spotify-green' />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className='hidden h-3 w-3 rounded-full border-2 border-white bg-white transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 group-hover:block' />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
