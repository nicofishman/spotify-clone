import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { cn } from '@/utils/cn';
import type * as TooltipPrimitive from '@radix-ui/react-tooltip';

//make it extends htmlbutton props
type GoForwardButtonProps = TooltipPrimitive.TooltipTriggerProps;

export const GoForwardButton = ({
	disabled,
	...props
}: GoForwardButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					{...props}
					className={cn(
						'flex h-8 w-8 items-center justify-center rounded-full bg-black/70',
						disabled && 'cursor-not-allowed opacity-60'
					)}
				>
					<Icon
						name='chevronRight'
						className='fill-white opacity-100 transition-colors hover:fill-white'
					/>
				</TooltipTrigger>
				<TooltipContent>
					<span>Go Forward</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
