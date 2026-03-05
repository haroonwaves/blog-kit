---
title: Blog Kit React Package
description: Blog Kit's React components and hooks for rendering posts and documentation sites.
date: 2024-01-05
---

## React Package

The `@haroonwaves/blog-kit-react` package offers a collection of production-ready React components
and hooks for building beautiful post interfaces. From markdown rendering with syntax highlighting
to search functionality, these components are designed to work seamlessly with any React framework.

### PostRenderer

Render markdown content with syntax highlighting and beautiful styling:

```tsx
import { PostRenderer } from '@haroonwaves/blog-kit-react';

function Post({ content }) {
	return <PostRenderer content={content} metadata={metadata} />;
}
```

#### Customizing Components

You can override any default component by passing custom components through the `components` prop:

```tsx
import { PostRenderer } from '@haroonwaves/blog-kit-react';
import type { ComponentProps } from 'react';

function Post({ content, metadata }) {
	// Custom component overrides
	const customComponents = {
		// Custom blockquote with a different style
		blockquote: (props: ComponentProps<'blockquote'>) => (
			<blockquote
				className="my-6 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950 p-4 rounded-r-lg italic"
				{...props}
			/>
		),
	};

	return <PostRenderer content={content} metadata={metadata} components={customComponents} />;
}
```

**Props:**

- `content` (string, required): Post content to render
- `metadata` (PostMeta, required): Post meta info to render
- `className` (string, optional): Additional CSS classes
- `components` (object, optional): Custom component overrides
- `showCategory` (boolean, optional): Show category badge (default: true)
- `showReadingTime` (boolean, optional): Show reading time (default: true)
- `showDate` (boolean, optional): Show publication date (default: true)

### PostCard

Display a single post card:

```tsx
import { PostCard } from '@haroonwaves/blog-kit-react';

function PostCardExample({ postMeta }) {
	return <PostCard metadata={postMeta} basePath="/post" />;
}
```

**Props:**

- `metadata` (PostMeta, required): Post metadata object
- `basePath` (string, optional): Base path for post links (default: '/post')
- `renderLink` (function, optional): Custom link renderer (useful for Next.js Link)
- `className` (string, optional): Additional CSS classes
- `showCategory` (boolean, optional): Show category badge (default: true)
- `showReadingTime` (boolean, optional): Show reading time (default: true)
- `showDate` (boolean, optional): Show publication date (default: true)

### PostList

Display a list of posts:

```tsx
import { PostList } from '@haroonwaves/blog-kit-react';

function PostListExample({ postsMeta }) {
	return <PostList metadata={postsMeta} basePath="/post" emptyMessage="No posts found." />;
}
```

**Props:**

- `metadata` (PostMeta[], required): Array of post metadata
- `basePath` (string, optional): Base path for post links (default: '/post')
- `renderLink` (function, optional): Custom link renderer
- `className` (string, optional): Additional CSS classes
- `emptyMessage` (string, optional): Message when no posts (default: 'No posts found.')
- `cardProps` (object, optional): Props to pass to each PostCard

### PostPlaceholder

Show loading placeholders while posts are loading:

```tsx
import { PostPlaceholder } from '@haroonwaves/blog-kit-react';

function LoadingPosts() {
	return <PostPlaceholder count={3} />;
}
```

**Props:**

- `count` (number, optional): Number of placeholder cards (default: 3)
- `className` (string, optional): Additional CSS classes

### usePosts Hook

Filter and search through posts:

```tsx
import { usePosts } from '@haroonwaves/blog-kit-react';

function PostSearch({ postsMeta }) {
	const { metadata, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } =
		usePosts(postsMeta);

	return (
		<div>
			<input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search posts..."
			/>
			<select
				value={selectedCategory || ''}
				onChange={(e) => setSelectedCategory(e.target.value || null)}
			>
				<option value="">All Categories</option>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>
			<PostList metadata={metadata} />
		</div>
	);
}
```

**Returns:**

- `metadata` (PostMeta[]): Filtered posts metadata
- `searchTerm` (string): Current search term
- `setSearchTerm` (function): Update search term
- `selectedCategory` (string | null): Selected category filter
- `setSelectedCategory` (function): Update category filter
- `categories` (string[]): Available categories from posts

### Next.js Integration

For Next.js projects, use a custom link renderer:

```tsx
import Link from 'next/link';
import { PostCard } from '@haroonwaves/blog-kit-react';

function NextPostCard({ post }) {
	return (
		<PostCard
			post={post}
			basePath="/post"
			renderLink={(href, children) => <Link href={href}>{children}</Link>}
		/>
	);
}
```

### Next.js SSG Example (Static Site Generation)

For Next.js with static site generation, use server components and `generateStaticParams`:

**Post List Page** (`app/post/page.tsx`):

```tsx
import { getAllPostsMeta } from '@haroonwaves/blog-kit-core';
import { PostList } from '@haroonwaves/blog-kit-react';
import Link from 'next/link';

export default function PostListPage() {
	const postsMeta = getAllPostsMeta({
		contentDirectory: process.cwd(),
		postSubdirectory: 'content/post',
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<h1 className="text-4xl font-bold mb-4">Posts</h1>
				<PostList
					metadata={postsMeta}
					basePath="/post"
					renderLink={(href, children) => <Link href={href}>{children}</Link>}
				/>
			</div>
		</div>
	);
}
```

**Post Page** (`app/post/[slug]/page.tsx`):

```tsx
import { getAllPostsMeta, getPost } from '@haroonwaves/blog-kit-core';
import { PostRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const postConfig = {
	contentDirectory: process.cwd(),
	postSubdirectory: 'content/post',
};

export function generateStaticParams() {
	const postsMeta = getAllPostsMeta(postConfig);
	return postsMeta.map((meta) => ({
		slug: meta.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const post = getPost(slug, postConfig);

	if (!post) {
		return {
			title: 'Post Not Found',
		};
	}

	return {
		title: `${post.metadata.title} | Blog Kit`,
		description: post.metadata.description,
		openGraph: {
			title: post.metadata.title,
			description: post.metadata.description,
			type: 'article',
			publishedTime: post.metadata.date,
		},
	};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const post = getPost(slug, postConfig);

	if (!post) notFound();

	const { metadata, content } = post;

	return (
		<article>
			<PostRenderer content={content} metadata={metadata} />
		</article>
	);
}
```

### Next.js SSR Example (Server-Side Rendering)

For server-side rendering, use the same functions but without `generateStaticParams`:

```tsx
// app/post/[slug]/page.tsx
import { getPost } from '@haroonwaves/blog-kit-core';
import { PostRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const post = getPost(slug, {
		contentDirectory: process.cwd(),
		postSubdirectory: 'content/post',
	});

	if (!post) notFound();

	return (
		<article>
			<PostRenderer content={post.content} metadata={post.metadata} />
		</article>
	);
}
```

**Note:** SSG is recommended for posts as it pre-renders pages at build time for better performance.

### Pure React Example (Client-Side)

For pure React applications (Create React App, Vite, etc.), use the client-side functions with
markdown content fetched from an API or imported:

```tsx
import { useState, useEffect } from 'react';
import { extractPostMeta, extractPost, type PostMeta, type Post } from '@haroonwaves/blog-kit-core';
import { PostRenderer, PostList, usePosts } from '@haroonwaves/blog-kit-react';

// Example: Fetch markdown content from an API
async function fetchPostContent(slug: string): Promise<string> {
	const response = await fetch(`/api/posts/${slug}`);
	return response.text();
}

async function fetchAllPosts(): Promise<PostMeta[]> {
	const response = await fetch('/api/posts');
	const posts = await response.json();
	// If you receive raw markdown, extract metadata
	return posts.map((post: { content: string; slug: string }) =>
		extractPostMeta(post.content, post.slug)
	);
}

function PostPage() {
	const [postsMeta, setPostsMeta] = useState<PostMeta[]>([]);
	const { metadata, searchTerm, setSearchTerm } = usePosts(postsMeta);

	useEffect(() => {
		fetchAllPosts().then(setPostsMeta);
	}, []);

	return (
		<div>
			<input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
			/>
			<PostList metadata={metadata} basePath="/post" />
		</div>
	);
}

function PostPage({ slug }: { slug: string }) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPostContent(slug).then((content) => {
			const postData = extractPost(content, slug);
			setPost(postData);
			setLoading(false);
		});
	}, [slug]);

	if (loading) return <div>Loading...</div>;
	if (!post) return <div>Post not found</div>;

	return (
		<article>
			<PostRenderer content={post.content} metadata={post.metadata} />
		</article>
	);
}
```
