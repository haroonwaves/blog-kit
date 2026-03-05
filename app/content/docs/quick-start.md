---
title: Quick Start
description:
  Build your own post in minutes with this step-by-step guide. Learn how to set up Blog Kit with
  Next.js and start creating your markdown post today.
date: 2024-01-03
---

## Quick Start

Get your post up and running in minutes with Blog Kit. This guide shows you the fastest way to
integrate Blog Kit into your Next.js application using Static Site Generation (SSG) for optimal
performance and SEO.

### Next.js SSG (Recommended)

The easiest way to get started is with Next.js using Static Site Generation (SSG):

```tsx
// app/post/page.tsx
import { getAllPostsMeta } from '@haroonwaves/blog-kit-core';
import { PostList } from '@haroonwaves/blog-kit-react';
import Link from 'next/link';

export default function PostPage() {
	const postsMeta = getAllPostsMeta({
		contentDirectory: process.cwd(),
		postSubdirectory: 'content/post',
	});

	return (
		<PostList
			metadata={postsMeta}
			basePath="/post"
			renderLink={(href, children) => <Link href={href}>{children}</Link>}
		/>
	);
}
```

```tsx
// app/post/[slug]/page.tsx
import { getAllPostsMeta, getPost } from '@haroonwaves/blog-kit-core';
import { PostRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
	const postsMeta = getAllPostsMeta({
		contentDirectory: process.cwd(),
		postSubdirectory: 'content/post',
	});
	return postsMeta.map((meta) => ({ slug: meta.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const post = getPost(slug, {
		contentDirectory: process.cwd(),
		postSubdirectory: 'content/post',
	});

	if (!post) notFound();

	return (
		<article>
			<h1>{post.metadata.title}</h1>
			<PostRenderer content={post.content} metadata={post.metadata} />
		</article>
	);
}
```

For more examples, see [Next.js SSG Example](#nextjs-ssg-example-static-site-generation),
[Next.js SSR Example](#nextjs-ssr-example-server-side-rendering), or
[Pure React Example](#pure-react-example-client-side).
