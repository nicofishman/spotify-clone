import Layout from '@/components/Layout/Layout';
import CategoriesGrid from '@/components/Search/CategoriesGrid';
import SearchResults from '@/components/Search/SearchResults';
import { api } from '@/utils/api';
import Head from 'next/head';
import { useState } from 'react';

const Search = () => {
	const { data: categories } = api.browse.categories.getMany.useQuery({
		country: 'AR',
		locale: 'es_AR',
		limit: 50,
	});

	const [searchInput, setSearchInput] = useState('');

	return (
		<>
			<Head>
				<title>Search</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout
				searchInput={searchInput}
				onSearchInputChange={(val) => setSearchInput(val)}
				includeSearchInput={true}
			>
				{searchInput.length === 0 ? (
					<CategoriesGrid
						title='Browse all'
						categories={categories?.categories.items ?? []}
					/>
				) : (
					<SearchResults search={searchInput} />
				)}
			</Layout>
		</>
	);
};

export default Search;