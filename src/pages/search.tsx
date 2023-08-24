import Layout from '@/components/Layout/Layout';
import CategoriesGrid from '@/components/Search/CategoriesGrid';
import SearchResults from '@/components/Search/SearchResults';
import { api } from '@/utils/api';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Search = () => {
	const { data: categories } = api.browse.categories.getMany.useQuery({
		country: 'AR',
		locale: 'es_AR',
		limit: 50,
	});

	const router = useRouter();
	const query = router.query.q as string;
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		setSearchInput(query ?? '');
	}, [query]);

	return (
		<>
			<Head>
				<title>Search</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Layout
				searchInput={searchInput}
				onSearchInputChange={(val) => setSearchInput(val)}
				includeSearchInput={true}
				mainClassName='pt-0 bg-bg-color'
			>
				{searchInput.length === 0 ? (
					<CategoriesGrid
						title='Browse all'
						categories={categories?.categories.items ?? []}
					/>
				) : (
					<SearchResults query={searchInput} />
				)}
			</Layout>
		</>
	);
};

export default Search;
