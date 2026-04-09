import type { BlogMeta } from '../types';

export function filterBlogs(
	blogs: BlogMeta[],
	searchTerm: string = '',
	selectedCategory: string | null = null
): BlogMeta[] {
	let filtered = blogs;

	if (searchTerm) {
		const lowerSearch = searchTerm.toLowerCase();
		filtered = filtered.filter(
			(blog) =>
				(blog.title?.toLowerCase() || '').includes(lowerSearch) ||
				(blog.description?.toLowerCase() || '').includes(lowerSearch)
		);
	}

	if (selectedCategory) {
		filtered = filtered.filter((blog) => {
			const categories = blog.categories ?? [];
			return categories.includes(selectedCategory);
		});
	}

	return filtered;
}

export function getAvailableCategories(blogs: BlogMeta[]): string[] {
	return Array.from(new Set(blogs.flatMap((blog) => blog.categories ?? [])));
}
