---
title: Quick Start
description:
  Build your own blog in minutes with this step-by-step guide. Learn how to set up Blog Kit with
  Next.js and start creating your markdown blog today.
date: 2024-01-03
---

## Quick Start with Next.js

Get your blog up and running in minutes with Blog Kit. This guide shows you the fastest way to
integrate Blog Kit into your Next.js application using Server Components and Static Site Generation
(SSG) for optimal performance and SEO.

### Project Structure Example

```
/app
/content
  /blog
    my-post.md
```

### Next.js SSG (Recommended)

The easiest way to get started is with Next.js using Static Site Generation (SSG):

```tsx
// app/blog/page.tsx
import { getAllBlogsMeta } from '@haroonwaves/blog-kit-core';
import { BlogList } from '@haroonwaves/blog-kit-react';
import Link from 'next/link';

export default function BlogPage() {
	const blogsMeta = getAllBlogsMeta({
		contentDirectory: process.cwd(),
		blogSubdirectory: 'content/blog',
	});

	return (
		<BlogList
			metadata={blogsMeta}
			title="Blogs"
			description="Welcome to my blog built with Blog Kit."
			basePath="/blog"
			renderLink={(href, children) => <Link href={href}>{children}</Link>}
		/>
	);
}
```

```tsx
// app/blog/[slug]/page.tsx
import { getAllBlogsMeta, getBlog } from '@haroonwaves/blog-kit-core';
import { BlogRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
	const blogsMeta = getAllBlogsMeta({
		contentDirectory: process.cwd(),
		blogSubdirectory: 'content/blog',
	});
	return blogsMeta.map((meta) => ({ slug: meta.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const blog = getBlog(slug, {
		contentDirectory: process.cwd(),
		blogSubdirectory: 'content/blog',
	});

	if (!blog) notFound();

	return (
		<article>
			<h1>{blog.metadata.title}</h1>
			<BlogRenderer content={blog.content} metadata={blog.metadata} />
		</article>
	);
}
```

For more examples, see [Next.js SSG Example](#nextjs-ssg-example-static-site-generation) or
[Next.js SSR Example](#nextjs-ssr-example-server-side-rendering).
