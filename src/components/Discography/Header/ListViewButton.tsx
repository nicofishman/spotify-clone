import IconButtonLayout from '@/components/Discography/Header/IconButtonLayout';
import Icon from '@/components/UI/Icon';
import { typeViewStore } from '@/pages/artist/[artistId]/discography/[type]';
import React from 'react';

type ListViewButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const ListViewButton = ({ ...props }: ListViewButtonProps) => {
  const [view] = typeViewStore.use('view');
  return (
    <IconButtonLayout {...props} selected={view === 'list'}>
      <Icon name='list' className='text-[inherit]' />
    </IconButtonLayout>
  );
};

export default ListViewButton;
