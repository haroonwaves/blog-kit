import { useState, useMemo } from 'react';
import type { BlogMeta } from '../types';
import { useDebounce } from './useDebounce';
import { filterBlogs, getAvailableCategories } from '../utils/filter-utils';

export function useBlogs(blogsMeta: BlogMeta[]) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	// Compute filtered results using the pure utility
	const metadata = useMemo(() => {
		return filterBlogs(blogsMeta, debouncedSearchTerm, selectedCategory);
	}, [blogsMeta, debouncedSearchTerm, selectedCategory]);

	// Compute available categories
	const categories = useMemo(() => {
		return getAvailableCategories(blogsMeta);
	}, [blogsMeta]);

	return {
		metadata,
		searchTerm,
		setSearchTerm,
		selectedCategory,
		setSelectedCategory,
		categories,
	};
}
