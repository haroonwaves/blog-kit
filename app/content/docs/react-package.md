---
title: Blog Kit React Package
description: Blog Kit's React components and hooks for rendering blogs and documentation sites.
date: 2024-01-05
---

## React Package

The `@haroonwaves/blog-kit-react` package offers a collection of production-ready React components
and hooks for building beautiful blog interfaces. From markdown rendering with syntax highlighting
to search functionality, these components are designed to work seamlessly with any React framework.

### BlogRenderer

Render markdown content with syntax highlighting and beautiful styling:

```tsx
import { BlogRenderer } from '@haroonwaves/blog-kit-react';

function BlogPost({ content }) {
	return <BlogRenderer content={content} metadata={metadata} />;
}
```

#### Customizing Components

You can override any default component by passing custom components through the `components` prop:

```tsx
import { BlogRenderer } from '@haroonwaves/blog-kit-react';
import type { ComponentProps } from 'react';

function BlogPost({ content, metadata }) {
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

	return <BlogRenderer content={content} metadata={metadata} components={customComponents} />;
}
```

**Props:**

- `content` (string, required): Blog content to render
- `metadata` (BlogMeta, required): Blog meta info to render
- `className` (string, optional): Additional CSS classes
- `components` (object, optional): Custom component overrides
- `showCategory` (boolean, optional): Show category badge (default: true)
- `showReadingTime` (boolean, optional): Show reading time (default: true)
- `showDate` (boolean, optional): Show publication date (default: true)

### BlogCard

Display a single blog post card:

```tsx
import { BlogCard } from '@haroonwaves/blog-kit-react';

function BlogCardExample({ blogMeta }) {
	return <BlogCard metadata={blogMeta} basePath="/blog" />;
}
```

**Props:**

- `metadata` (BlogMeta, required): Blog metadata object
- `basePath` (string, optional): Base path for blog links (default: '/blog')
- `renderLink` (function, optional): Custom link renderer (useful for Next.js Link)
- `className` (string, optional): Additional CSS classes
- `showCategory` (boolean, optional): Show category badge (default: true)
- `showReadingTime` (boolean, optional): Show reading time (default: true)
- `showDate` (boolean, optional): Show publication date (default: true)

### BlogList

Display a list of blog posts with built-in search and filtering:

```tsx
import { BlogList } from '@haroonwaves/blog-kit-react';

function BlogListPage({ blogsMeta }) {
	return (
		<BlogList
			metadata={blogsMeta}
			basePath="/blog"
			title="Latest Blogs"
			description="Check out our latest blog posts about web development."
			emptyMessage="No posts found."
		/>
	);
}
```

**Props:**

- `metadata` (BlogMeta[], required): Array of blog metadata
- `title` (string, optional): Title to display above the blog list
- `description` (string, optional): Description to display above the blog list
- `basePath` (string, optional): Base path for blog links (default: '/blog')
- `renderLink` (function, optional): Custom link renderer
- `className` (string, optional): Additional CSS classes for the container
- `emptyMessage` (string, optional): Message when no blogs (default: 'No blog posts found.')
- `cardProps` (object, optional): Props to pass to each BlogCard
- `showFilter` (boolean, optional): Show search and category filter (default: true)
- `classNames` (object, optional): Custom styles for specific elements
  - `title` (string): Styles for the h1 title
  - `description` (string): Styles for the description paragraph
  - `filter` (object): Styles for the filter component

### BlogPlaceholder

Show loading placeholders while blogs are loading:

```tsx
import { BlogPlaceholder } from '@haroonwaves/blog-kit-react';

function LoadingBlogs() {
	return <BlogPlaceholder count={3} />;
}
```

**Props:**

- `count` (number, optional): Number of placeholder cards (default: 3)
- `className` (string, optional): Additional CSS classes

### useBlogs Hook

The `useBlogs` hook is the logical engine that powers both `BlogList` and `Filter`. Use it when you
want to build a custom blog layout while keeping the library's filtering logic and UI consistent.

```tsx
import { useBlogs, Filter, BlogCard } from '@haroonwaves/blog-kit-react';

function CustomBlogPage({ blogsMeta }) {
	// 1. Get logic from hook
	const { metadata, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } =
		useBlogs(blogsMeta);

	return (
		<div>
			{/* 2. Pass hook state directly to Filter component */}
			<Filter
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				categories={categories}
			/>

			{/* 3. Render filtered results in any way you like */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{metadata.map((blog) => (
					<BlogCard key={blog.slug} metadata={blog} />
				))}
			</div>
		</div>
	);
}
```

**Returns:**

- `metadata` (BlogMeta[]): Filtered blog posts metadata
- `searchTerm` (string): Current search term
- `setSearchTerm` (function): Update search term
- `selectedCategory` (string | null): Selected category filter
- `setSelectedCategory` (function): Update category filter
- `categories` (string[]): Available categories from blogs

### Next.js Integration

For Next.js projects, use a custom link renderer:

```tsx
import Link from 'next/link';
import { BlogCard } from '@haroonwaves/blog-kit-react';

function NextBlogCard({ blog }) {
	return (
		<BlogCard
			blog={blog}
			basePath="/blog"
			renderLink={(href, children) => <Link href={href}>{children}</Link>}
		/>
	);
}
```

### Next.js SSG Example (Static Site Generation)

For Next.js with static site generation, use server components and `generateStaticParams`:

**Blog List Page** (`app/blog/page.tsx`):

```tsx
import { getAllBlogsMeta } from '@haroonwaves/blog-kit-core';
import { BlogList } from '@haroonwaves/blog-kit-react';
import Link from 'next/link';

export default function BlogListPage() {
	const blogsMeta = getAllBlogsMeta({
		contentDirectory: process.cwd(),
		blogSubdirectory: 'content/blog',
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<BlogList
					metadata={blogsMeta}
					title="Blogs"
					description="Read our latest insights and tutorials."
					basePath="/blog"
					renderLink={(href, children) => <Link href={href}>{children}</Link>}
				/>
			</div>
		</div>
	);
}
```

**Blog Post Page** (`app/blog/[slug]/page.tsx`):

```tsx
import { getAllBlogsMeta, getBlog } from '@haroonwaves/blog-kit-core';
import { BlogRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const blogConfig = {
	contentDirectory: process.cwd(),
	blogSubdirectory: 'content/blog',
};

export function generateStaticParams() {
	const blogsMeta = getAllBlogsMeta(blogConfig);
	return blogsMeta.map((meta) => ({
		slug: meta.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const blog = getBlog(slug, blogConfig);

	if (!blog) {
		return {
			title: 'Blog Post Not Found',
		};
	}

	return {
		title: `${blog.metadata.title} | Blog Kit`,
		description: blog.metadata.description,
		openGraph: {
			title: blog.metadata.title,
			description: blog.metadata.description,
			type: 'article',
			publishedTime: blog.metadata.date,
		},
	};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const blog = getBlog(slug, blogConfig);

	if (!blog) notFound();

	const { metadata, content } = blog;

	return (
		<article>
			<BlogRenderer content={content} metadata={metadata} />
		</article>
	);
}
```

### Next.js SSR Example (Server-Side Rendering)

For server-side rendering, use the same functions but without `generateStaticParams`:

```tsx
// app/blog/[slug]/page.tsx
import { getBlog } from '@haroonwaves/blog-kit-core';
import { BlogRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const blog = getBlog(slug, {
		contentDirectory: process.cwd(),
		blogSubdirectory: 'content/blog',
	});

	if (!blog) notFound();

	return (
		<article>
			<BlogRenderer content={blog.content} metadata={blog.metadata} />
		</article>
	);
}
```

**Note:** SSG is recommended for blogs as it pre-renders pages at build time for better performance.
