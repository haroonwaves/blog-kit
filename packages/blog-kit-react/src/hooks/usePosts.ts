import { useState, useEffect } from 'react';
import type { PostMeta } from '../types';
import { useDebounce } from './useDebounce';

export function usePosts(postsMeta: PostMeta[]) {
	const [filteredPosts, setFilteredPosts] = useState(postsMeta);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const getPostCategories = (post: PostMeta): string[] => {
		return post.categories ?? [];
	};

	useEffect(() => {
		let filtered = postsMeta;

		if (debouncedSearchTerm) {
			filtered = filtered.filter(
				(post) =>
					post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
					post.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
			);
		}

		if (selectedCategory) {
			filtered = filtered.filter((post) => {
				const postCategories = getPostCategories(post);
				return postCategories.includes(selectedCategory);
			});
		}

		setFilteredPosts(filtered);
	}, [postsMeta, debouncedSearchTerm, selectedCategory]);

	const categories = Array.from(new Set(postsMeta.flatMap((post) => getPostCategories(post))));

	return {
		metadata: filteredPosts,
		searchTerm,
		setSearchTerm,
		selectedCategory,
		setSelectedCategory,
		categories,
	};
}
