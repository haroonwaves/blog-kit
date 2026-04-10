---
title: Guides
description:
  Learn how to add search and filtering, customize component styling, and set up dark mode for your
  Blog Kit content site.
date: 2024-01-04
---

## Guides

Practical guides for common tasks. If you haven't set up your site yet, start with the
[Getting Started](/docs/getting-started) guide first.

---

### Adding Search & Filtering

The `useContent` hook provides instant client-side search and category filtering. Pair it with the
`Filter` and `ContentList` components for a complete interactive content list.

```tsx
'use client';

import { ContentList, Filter, useContent } from '@haroonwaves/blog-kit-react';
import type { ContentMeta } from '@haroonwaves/blog-kit-react';

export default function ContentListPage({ blogsMeta }: { blogsMeta: ContentMeta[] }) {
	const { metadata, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } =
		useContent(blogsMeta);

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<Filter
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				categories={categories}
				contentCount={metadata.length}
			/>

			<ContentList metadata={metadata} />
		</div>
	);
}
```

Then pass metadata from a server component:

```tsx
// app/blog/page.tsx (Server Component)
import { getAllContentMeta } from '@haroonwaves/blog-kit-core';
import { contentConfig } from '@/lib/content';
import ContentListPage from './content-list-page';

export default function BlogPage() {
	const blogsMeta = getAllContentMeta(contentConfig);
	return <ContentListPage blogsMeta={blogsMeta} />;
}
```

> [!TIP] **Which rendering strategy should I use?**
>
> 1. **Client-Side Filtering (< 500 items)**: Keep your content list page static (SSG) but use the
>    `useContent` hook to handle searching. This makes search instant and keeps your site 100%
>    static. **This is the recommended approach for most sites.**
> 2. **Dynamic Filtering (SSR)**: Only recommended if you have thousands of items and want to avoid
>    sending all metadata to the user's browser.
> 3. **Static Rendering (SSG)**: For individual content pages, always use SSG via
>    `generateStaticParams()` for maximum speed.

#### Server-Side Filtering

If you prefer to filter on the server (e.g., for very large sites), you can use the `filterContent`
and `getAvailableCategories` utility functions directly:

```tsx
import { filterContent, getAvailableCategories } from '@haroonwaves/blog-kit-react';
import { getAllContentMeta } from '@haroonwaves/blog-kit-core';

const allBlogs = getAllContentMeta(contentConfig);
const categories = getAvailableCategories(allBlogs);
const filtered = filterContent(allBlogs, searchTerm, selectedCategory);
```

---

### Customizing Components

#### Overriding ContentRenderer Elements

The `ContentRenderer` renders markdown using styled HTML elements. You can override any element by
passing custom components through the `components` prop:

```tsx
import { ContentRenderer } from '@haroonwaves/blog-kit-react';
import type { ComponentProps } from 'react';

function BlogPost({ body, metadata }) {
	const customComponents = {
		// Custom blockquote with a different style
		blockquote: (props: ComponentProps<'blockquote'>) => (
			<blockquote
				className="bk:my-6 bk:border-l-4 bk:border-purple-500 bk:bg-purple-50 bk:dark:bg-purple-950 bk:p-4 bk:rounded-r-lg bk:italic"
				{...props}
			/>
		),

		// Custom link that opens in a new tab
		a: (props: ComponentProps<'a'>) => (
			<a className="bk:text-purple-600 bk:underline" target="_blank" rel="noopener" {...props} />
		),
	};

	return <ContentRenderer body={body} metadata={metadata} components={customComponents} />;
}
```

You can override any HTML element: `h1`–`h6`, `p`, `a`, `blockquote`, `code`, `pre`, `img`, `table`,
`ul`, `ol`, `li`, `strong`, `em`, `del`, `hr`, `br`, `input` (checkboxes), and all table elements
(`thead`, `tbody`, `tr`, `th`, `td`).

#### Using classNames Props

Several components accept a `classNames` prop for fine-grained style overrides without replacing the
entire component:

**ContentList:**

```tsx
<ContentList
	metadata={blogsMeta}
	classNames={{
		title: 'text-blue-600',
		description: 'text-gray-400 italic',
	}}
/>
```

**Filter:**

```tsx
<Filter
	{...filterProps}
	classNames={{
		input: 'border-blue-500',
		categoryContainer: 'gap-4',
		pill: 'rounded-full',
		activePill: 'bg-blue-600 text-white',
		inactivePill: 'bg-gray-100',
		contentCount: 'text-blue-400',
	}}
/>
```

#### Loading Placeholders

Use `ContentPlaceholder` to show skeleton cards while your data loads:

```tsx
import { ContentPlaceholder } from '@haroonwaves/blog-kit-react';

function LoadingState() {
	return <ContentPlaceholder count={3} />;
}
```

---

### Dark Mode Setup

Blog Kit components use a custom Tailwind `dark` variant that activates when the `<html>` element
has the `dark` class. You need to set up a theme provider that toggles
`document.documentElement.classList`.

#### Next.js with next-themes

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			{children}
		</ThemeProvider>
	);
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
```

#### Vite/CRA with Custom Theme Toggle

```tsx
// ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const initialTheme = stored || (prefersDark ? 'dark' : 'light');
		setTheme(initialTheme);
		document.documentElement.classList.toggle('dark', initialTheme === 'dark');
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
```
