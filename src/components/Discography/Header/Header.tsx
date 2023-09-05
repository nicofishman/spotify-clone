import GridViewButton from '@/components/Discography/Header/GridViewButton';
import ListViewButton from '@/components/Discography/Header/ListViewButton';
import SelectType from '@/components/Discography/Header/SelectType';
import { typeViewStore } from '@/pages/artist/[artistId]/discography/[type]';
import { type discographyTypes } from '@/utils/discographyTypes';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
	type: (typeof discographyTypes)[number]['value'];
	artistName: string;
	artistId: string;
	availableTypes: Array<{
		value: (typeof discographyTypes)[number]['value'];
		name: (typeof discographyTypes)[number]['name'];
		visible: boolean;
	}>;
}

const Header = ({
	type,
	artistName,
	availableTypes,
	artistId,
}: HeaderProps) => {
	return (
		<section className='sticky top-16 z-20 flex justify-between bg-gray-bg'>
			<Link
				href={`/artist/${artistId}`}
				className='text-2xl font-bold hover:underline'
			>
				{artistName}
			</Link>
			<div className='flex gap-x-3'>
				<SelectType availableTypes={availableTypes} selected={type} />
				<ListViewButton
					onClick={() => typeViewStore.set('view', 'list')}
				/>
				<GridViewButton
					onClick={() => typeViewStore.set('view', 'grid')}
				/>
			</div>
		</section>
	);
};

export default Header;
