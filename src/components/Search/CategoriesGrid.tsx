import CategoryCard from '@/components/Search/CategoryCard';
import { mainSizeStore } from '@/stores/mainSizeStore';
import React, { useMemo } from 'react';

interface CategoriesGridProps {
	title: string;
	categories: SpotifyApi.CategoryObject[];
}

const CategoriesGrid = ({ title, categories }: CategoriesGridProps) => {
	const [width] = mainSizeStore.use('width');

	const [columnCount, columnWidth] = useMemo(() => {
		const count =
			width > 1600
				? 8
				: width > 1400
				? 7
				: width > 1200
				? 6
				: width > 1000
				? 5
				: width > 700
				? 4
				: 3;

		return [count, width / count];
	}, [width]);

	return (
		<section className='mt-8'>
			<h2 className='mb-4 text-2xl font-bold text-white'>{title}</h2>
			<div
				className='genresGrid grid w-full min-w-[384px] gap-6 overflow-x-auto py-2'
				style={{
					gridTemplateColumns: `repeat(${columnCount}, ${
						columnWidth - 24
					}px)`,
					width: width,
				}}
			>
				{categories?.map((category) => (
					<CategoryCard key={category.id} category={category} />
				))}
			</div>
		</section>
	);
};

export default CategoriesGrid;
