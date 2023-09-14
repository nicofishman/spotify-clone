import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/UI/Dropdown';
import Icon from '@/components/UI/Icon';
import type { DropdownItem } from '@/types/UI';
import { cn } from '@/utils/cn';

interface ThreeDotsButtonProps {
  iconClassName?: string;
  items: DropdownItem[];
}

const ThreeDotsButtonLayout = ({
  iconClassName,
  items,
}: ThreeDotsButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-8 w-8 outline-none'>
        <Icon name='threeDots' className={cn(iconClassName)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {items.map((item, index) => {
          if ('separator' in item) {
            return <DropdownMenuSeparator key={index} />;
          } else if ('sub' in item) {
            return (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>{item.name}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className='data-[align=start]'>
                  {item.content}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          } else {
            return (
              <DropdownMenuItem {...item} key={index}>
                {item.name}
              </DropdownMenuItem>
            );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThreeDotsButtonLayout;
