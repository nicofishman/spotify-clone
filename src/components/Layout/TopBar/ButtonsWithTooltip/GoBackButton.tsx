import Icon from '@/components/UI/Icon';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/UI/Tooltip';
import { cn } from '@/utils/cn';
import type * as TooltipPrimitive from '@radix-ui/react-tooltip';

type GoBackButtonProps = TooltipPrimitive.TooltipTriggerProps;

export const GoBackButton = ({ disabled, ...props }: GoBackButtonProps) => {
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
						name='chevronLeft'
						className='fill-white opacity-100 transition-colors hover:fill-white'
					/>
				</TooltipTrigger>
				<TooltipContent>
					<span>Go Back</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
