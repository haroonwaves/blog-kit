import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { ContentMeta, Content, ContentConfig } from './types';

/**
 * SSR and SSG only: Get all content metadata from the filesystem.
 * This function requires Node.js fs module and only works in server environments
 * (Next.js SSR/SSG, Node.js scripts, etc.).
 *
 * @param config - Content kit configuration
 * @returns Array of content metadata
 */
export function getAllContentMeta(config: ContentConfig): ContentMeta[] {
	const contentDirectory = path.join(config.contentDirectory, config.contentSubdirectory || 'blog');

	if (!fs.existsSync(contentDirectory)) {
		console.warn(`Content directory not found: ${contentDirectory}`);
		return [];
	}

	const files = fs.readdirSync(contentDirectory);

	const allContent = files
		.filter((file) => file.endsWith('.md'))
		.map((file) => {
			const slug = file.replace('.md', '');
			const filePath = path.join(contentDirectory, file);
			const fileContent = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(fileContent);

			const readingTimeText = readingTime(content).text;

			return {
				slug,
				...data,
				readingTime: readingTimeText,
			} as ContentMeta;
		})
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});

	return allContent;
}

/**
 * SSR and SSG only: Get content from the filesystem.
 * This function requires Node.js fs module and only works in server environments
 * (Next.js SSR/SSG, Node.js scripts, etc.).
 *
 * @param slug - Content slug/identifier
 * @param config - Content kit configuration
 * @returns Content data or null if not found
 */
export function getContent(slug: string, config: ContentConfig): Content | null {
	const contentDirectory = path.join(config.contentDirectory, config.contentSubdirectory || 'blog');
	const filePath = path.join(contentDirectory, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	const readingTimeText = readingTime(content).text;

	return {
		metadata: {
			...(data as Omit<ContentMeta, 'slug'>),
			slug,
			readingTime: readingTimeText,
		},
		body: content,
	};
}
