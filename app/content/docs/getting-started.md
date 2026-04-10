---
title: Getting Started
description:
  Install Blog Kit, set up your markdown files, and build a fully working blog with Next.js in
  minutes. A step-by-step guide from zero to production.
date: 2024-01-02
---

## Getting Started

This guide walks you from zero to a fully working content site. By the end, you'll have a content
list page and individual content pages — all statically generated for maximum performance.

### 1. Install the Packages

You need two packages: `core` for reading your markdown files, and `react` for rendering them.

```bash
npm install @haroonwaves/blog-kit-core @haroonwaves/blog-kit-react
# or
pnpm add @haroonwaves/blog-kit-core @haroonwaves/blog-kit-react
# or
yarn add @haroonwaves/blog-kit-core @haroonwaves/blog-kit-react
```

> **Note:** The React package requires **React 19+** as a peer dependency.

### 2. Import the Styles

Blog Kit ships two CSS files. Import them **before** your app's global CSS so the component styles
load correctly:

```tsx
// In your root layout or entry file (e.g., layout.tsx, App.tsx)
import '@haroonwaves/blog-kit-react/dist/index.css'; // Prism theme (code block styling)
import '@haroonwaves/blog-kit-react/dist/style.css'; // Component styles (Tailwind classes)
import './globals.css'; // Your app's CSS
```

> **Why this order matters:** Blog Kit uses a `bk:` namespace for all its utility classes (e.g.,
> `bk:text-2xl`), so library styles never clash with your app's Tailwind classes. Importing Blog
> Kit's CSS first lets your app's base typography serve as the foundation.

### 3. Write Your First Blog Post

Create a markdown file with frontmatter metadata. Blog Kit uses
[gray-matter](https://github.com/jonschlinkert/gray-matter) to parse frontmatter and
[reading-time](https://github.com/ngryman/reading-time) to calculate reading time automatically.

**Project structure:**

```
your-project/
├── content/
│   └── blog/
│       ├── hello-world.md
│       └── my-second-post.md
└── src/
    └── app/
        ├── blog/
        │   ├── page.tsx          ← Content list page
        │   └── [slug]/
        │       └── page.tsx      ← Content item page
        └── layout.tsx
```

**Example markdown file** (`content/blog/hello-world.md`):

```markdown
---
title: Hello World
description: My first post built with Blog Kit.
date: 2024-01-15
categories:
  - Technology
  - Web Development
---

# Hello World

Welcome to my blog! This is my first post built with Blog Kit.
```

**Required frontmatter fields:**

- `title` (string): The content title
- `description` (string): A brief description/summary
- `date` (string): Publication date (ISO format recommended: YYYY-MM-DD)

**Optional frontmatter fields:**

- `categories` (string[]): Array of categories/tags for the content

### 4. Create the Configuration

Define your configuration once and reuse it across pages:

```ts
// lib/content.ts (or wherever you keep shared config)
import type { ContentConfig } from '@haroonwaves/blog-kit-core';

export const contentConfig: ContentConfig = {
	contentDirectory: process.cwd(), // The project root
	contentSubdirectory: 'content/blog', // Path to your markdown files
};
```

### 5. Build the Blog List Page

```tsx
// app/blog/page.tsx
import { getAllContentMeta } from '@haroonwaves/blog-kit-core';
import { ContentList } from '@haroonwaves/blog-kit-react';
import Link from 'next/link';
import { contentConfig } from '@/lib/content';

export default function BlogPage() {
	const blogsMeta = getAllContentMeta(contentConfig);

	return (
		<ContentList
			metadata={blogsMeta}
			title="Blogs"
			description="Welcome to my blog built with Blog Kit."
			basePath="/blog"
			renderLink={(href, children) => <Link href={href}>{children}</Link>}
		/>
	);
}
```

That's it — `ContentList` renders a responsive list of cards with category badges, reading time, and
dates. No extra configuration needed.

### 6. Build the Blog Post Page

```tsx
// app/blog/[slug]/page.tsx
import { getAllContentMeta, getContent } from '@haroonwaves/blog-kit-core';
import { ContentRenderer } from '@haroonwaves/blog-kit-react';
import { notFound } from 'next/navigation';
import { contentConfig } from '@/lib/content';

export function generateStaticParams() {
	const blogsMeta = getAllContentMeta(contentConfig);
	return blogsMeta.map((meta) => ({ slug: meta.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const blog = getContent(slug, contentConfig);

	if (!blog) notFound();

	return (
		<article>
			<ContentRenderer body={blog.body} metadata={blog.metadata} />
		</article>
	);
}
```

`ContentRenderer` automatically handles markdown rendering with syntax highlighting, GFM support,
heading anchor links, and beautiful typography — all out of the box.

### Next Steps

Your site is now fully functional! Here's what to explore next:

- **[Guides](/docs/guides)** — Add search/filtering, dark mode, and customize component styling
- **[API Reference](/docs/api-reference)** — Complete reference for all functions, components,
  hooks, and types
