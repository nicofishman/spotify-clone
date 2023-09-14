import IconButtonLayout from '@/components/Discography/Header/IconButtonLayout';
import Icon from '@/components/UI/Icon';
import { typeViewStore } from '@/pages/artist/[artistId]/discography/[type]';

type ListViewButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const GridViewButton = ({ ...props }: ListViewButtonProps) => {
  const [view] = typeViewStore.use('view');
  return (
    <IconButtonLayout {...props} selected={view === 'grid'}>
      <Icon name='grid' className='h-4 w-4' />
    </IconButtonLayout>
  );
};

export default GridViewButton;
