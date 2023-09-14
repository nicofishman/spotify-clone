import { getAverageColor } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CategoryCardProps {
	category: SpotifyApi.CategoryObject;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [bgColor, setBgColor] = useState('#121212');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const color = await getAverageColor(category.icons[0]?.url ?? '');
      setBgColor(color);
    })();
  }, [category.icons]);

  return (
    <Link
      href={`/genre/${category.id}`}
      className='group relative flex aspect-square w-full overflow-hidden rounded-md'
      style={{
        backgroundColor: bgColor,
      }}
    >
      <h2 className='h-fit w-full break-words p-4 text-2xl font-bold capitalize'>
        {category.name}
      </h2>
      {
        <Image
          className='absolute bottom-0 right-0 aspect-square h-[100px] w-[100px] translate-x-[18%] translate-y-[2%] rotate-[25deg] object-cover object-center shadow-md shadow-black/20 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-12 group-hover:scale-110'
          src={category.icons[0]?.url ?? ''}
          alt={category.name}
          width={category.icons[0]?.width ?? 1000}
          height={category.icons[0]?.height ?? 1000}
        />
      }
    </Link>
  );
};

export default CategoryCard;
