import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { PostMeta, Post, PostConfig } from './types';

/**
 * Client-side compatible: Extract post metadata from raw post content.
 * This function works in browser environments (pure React) where you have
 * the post content as a string (e.g., fetched from an API or imported).
 *
 * @param content - Raw post content string
 * @param slug - Post slug/identifier
 * @returns Parsed post metadata
 */
export function extractPostMeta(content: string, slug: string): PostMeta {
	const { data, content: PostContent } = matter(content);
	const readingTimeText = readingTime(PostContent).text;

	return {
		slug,
		...data,
		readingTime: readingTimeText,
	} as PostMeta;
}

/**
 * Client-side compatible: Extract post data from raw post content.
 * This function works in browser environments (pure React) where you have
 * the post content as a string (e.g., fetched from an API or imported).
 *
 * @param content - Raw Post content string
 * @param slug - Post slug/identifier
 * @returns Parsed post data with metadata and content
 */
export function extractPost(content: string, slug: string): Post {
	const { data, content: PostContent } = matter(content);
	const readingTimeText = readingTime(PostContent).text;

	return {
		metadata: {
			...(data as Omit<PostMeta, 'slug' | 'readingTime'>),
			slug,
			readingTime: readingTimeText,
		},
		content: PostContent,
	};
}

/**
 * SSR and SSG only: Get all posts metadata from the filesystem.
 * This function requires Node.js fs module and only works in server environments
 * (Next.js SSR/SSG, Node.js scripts, etc.).
 *
 * @param config - Post kit configuration
 * @returns Array of post metadata
 */
export function getAllPostsMeta(config: PostConfig): PostMeta[] {
	const postDirectory = path.join(config.contentDirectory, config.postSubdirectory || 'post');

	if (!fs.existsSync(postDirectory)) {
		console.warn(`Post directory not found: ${postDirectory}`);
		return [];
	}

	const files = fs.readdirSync(postDirectory);

	const posts = files
		.filter((file) => file.endsWith('.md'))
		.map((file) => {
			const slug = file.replace('.md', '');
			const filePath = path.join(postDirectory, file);
			const fileContent = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(fileContent);

			const readingTimeText = readingTime(content).text;

			return {
				slug,
				...data,
				readingTime: readingTimeText,
			} as PostMeta;
		})
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});

	return posts;
}

/**
 * SSR and SSG only: Get post from the filesystem.
 * This function requires Node.js fs module and only works in server environments
 * (Next.js SSR/SSG, Node.js scripts, etc.).
 *
 * @param slug - Post slug/identifier
 * @param config - Post kit configuration
 * @returns Post data or null if not found
 */
export function getPost(slug: string, config: PostConfig): Post | null {
	const postDirectory = path.join(config.contentDirectory, config.postSubdirectory || 'post');
	const filePath = path.join(postDirectory, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const fileContent = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContent);

	const readingTimeText = readingTime(content).text;

	return {
		metadata: {
			...(data as Omit<PostMeta, 'slug'>),
			slug,
			readingTime: readingTimeText,
		},
		content,
	};
}
