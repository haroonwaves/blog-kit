import { useState, useEffect } from 'react';
import type { BlogMeta } from '../types';
import { useDebounce } from './useDebounce';

export function useBlogs(blogsMeta: BlogMeta[]) {
	const [filteredBlogs, setFilteredBlogs] = useState(blogsMeta);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const getBlogCategories = (blog: BlogMeta): string[] => {
		return blog.categories ?? [];
	};

	useEffect(() => {
		let filtered = blogsMeta;

		if (debouncedSearchTerm) {
			filtered = filtered.filter(
				(blog) =>
					blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
					blog.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
			);
		}

		if (selectedCategory) {
			filtered = filtered.filter((blog) => {
				const blogCategories = getBlogCategories(blog);
				return blogCategories.includes(selectedCategory);
			});
		}

		setFilteredBlogs(filtered);
	}, [blogsMeta, debouncedSearchTerm, selectedCategory]);

	const categories = Array.from(new Set(blogsMeta.flatMap((blog) => getBlogCategories(blog))));

	return {
		metadata: filteredBlogs,
		searchTerm,
		setSearchTerm,
		selectedCategory,
		setSelectedCategory,
		categories,
	};
}
