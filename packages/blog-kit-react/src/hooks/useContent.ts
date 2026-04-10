import { useState, useMemo } from 'react';
import type { ContentMeta } from '../types';
import { useDebounce } from './useDebounce';
import { filterContent, getAvailableCategories } from '../utils/filter-utils';

export function useContent(allContentMeta: ContentMeta[]) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	// Compute filtered results using the pure utility
	const metadata = useMemo(() => {
		return filterContent(allContentMeta, debouncedSearchTerm, selectedCategory);
	}, [allContentMeta, debouncedSearchTerm, selectedCategory]);

	// Compute available categories
	const categories = useMemo(() => {
		return getAvailableCategories(allContentMeta);
	}, [allContentMeta]);

	return {
		metadata,
		searchTerm,
		setSearchTerm,
		selectedCategory,
		setSelectedCategory,
		categories,
	};
}
