import { getAllBlogsMeta as getAllPostsMeta } from '@haroonwaves/blog-kit-core';
import type { MetadataRoute } from 'next';

// Required for static export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://blog-kit.haroonwaves.com';

	// Get all documentation pages
	const docsMeta = getAllPostsMeta({
		contentDirectory: './content',
		blogSubdirectory: 'docs',
	});

	const docsUrls = docsMeta.map((doc) => ({
		url: `${baseUrl}/docs/${doc.slug}`,
		lastModified: new Date(doc.date),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${baseUrl}/docs`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		...docsUrls,
	];
}
