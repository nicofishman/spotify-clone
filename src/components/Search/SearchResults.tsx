import React from 'react';

interface SearchResultsProps {
	search: string;
}

const SearchResults = ({ search }: SearchResultsProps) => {
	return (
		<div>
			<p>{search}</p>
		</div>
	);
};

export default SearchResults;
