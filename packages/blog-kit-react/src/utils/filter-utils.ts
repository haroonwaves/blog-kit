import type { ContentMeta } from '../types';

export function filterContent(
	items: ContentMeta[],
	searchTerm: string = '',
	selectedCategory: string | null = null
): ContentMeta[] {
	let filtered = items;

	if (searchTerm) {
		const lowerSearch = searchTerm.toLowerCase();
		filtered = filtered.filter(
			(item) =>
				(item.title?.toLowerCase() || '').includes(lowerSearch) ||
				(item.description?.toLowerCase() || '').includes(lowerSearch)
		);
	}

	if (selectedCategory) {
		filtered = filtered.filter((item) => {
			const categories = item.categories ?? [];
			return categories.includes(selectedCategory);
		});
	}

	return filtered;
}

export function getAvailableCategories(items: ContentMeta[]): string[] {
	return Array.from(new Set(items.flatMap((item) => item.categories ?? [])));
}
