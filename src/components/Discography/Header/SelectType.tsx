import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/Select';
import { type discographyTypes } from '@/utils/discographyTypes';
import { useRouter } from 'next/router';

interface SelectTypeProps {
	selected: string;
	availableTypes: Array<{
		value: (typeof discographyTypes)[number]['value'];
		name: (typeof discographyTypes)[number]['name'];
		visible: boolean;
		selectName?: string;
	}>;
}

const SelectType = ({ selected, availableTypes }: SelectTypeProps) => {
  const router = useRouter();
  async function selectChange(value: string) {
    await router.push(
      `/artist/${router.query.artistId as string}/discography/${value}`
    );
  }

  const [_selected, setSelected] = useState(selected);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  const [open, setOpen] = useState(false);
  return (
    <Select
      onValueChange={async (e) => {
        await selectChange(e);
      }}
      open={open}
      onOpenChange={() => setOpen(!open)}
    >
      <SelectTrigger
        defaultChecked={true}
        className='max-w-[350px] gap-x-2 capitalize text-white/70'
      >
        <SelectValue placeholder={_selected} />
      </SelectTrigger>
      <SelectContent
        className='min-w-[160px] max-w-[350px]'
        align='start'
      >
        {availableTypes.map(
          (type) =>
            type.visible && (
              <SelectItem
                key={type.value}
                className='capitalize'
                value={type.value}
                data-state={
                  type.value === _selected
                    ? 'checked'
                    : 'unchecked'
                }
              >
                {'selectName' in type
                  ? type.selectName
                  : type.name}
              </SelectItem>
            )
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectType;
