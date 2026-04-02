import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogMeta, Blog, BlogConfig } from './types';

/**
 * SSR and SSG only: Get all blogs metadata from the filesystem.
 * This function requires Node.js fs module and only works in server environments
 * (Next.js SSR/SSG, Node.js scripts, etc.).
 *
 * @param config - Blog kit configuration
 * @returns Array of blog metadata
 */
export function getAllBlogsMeta(config: BlogConfig): BlogMeta[] {
	const blogDirectory = path.join(config.contentDirectory, config.blogSubdirectory || 'blog');

	if (!fs.existsSync(blogDirectory)) {
		console.warn(`Blog directory not found: ${blogDirectory}`);
		return [];
	}

	const files = fs.readdirSync(blogDirectory);

	const blogs = files
		.filter((file) => file.endsWith('.md'))
		.map((file) => {
			const slug = file.replace('.md', '');
			const filePath = path.join(blogDirectory, file);
			const fileContent = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(fileContent);

			const readingTimeText = readingTime(content).text;

			return {
				slug,
				...data,
				readingTime: readingTimeText,
			} as BlogMeta;
		})
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});

	return blogs;
}

/**
 * SSR and SSG only: Get blog from the filesystem.
 * This function requires Node.js fs module and only works in server environments
 * (Next.js SSR/SSG, Node.js scripts, etc.).
 *
 * @param slug - Blog post slug/identifier
 * @param config - Blog kit configuration
 * @returns Blog data or null if not found
 */
export function getBlog(slug: string, config: BlogConfig): Blog | null {
	const blogDirectory = path.join(config.contentDirectory, config.blogSubdirectory || 'blog');
	const filePath = path.join(blogDirectory, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	const readingTimeText = readingTime(content).text;

	return {
		metadata: {
			...(data as Omit<BlogMeta, 'slug'>),
			slug,
			readingTime: readingTimeText,
		},
		content,
	};
}
