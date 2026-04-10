---
title: API Reference
description:
  Complete API reference for all Blog Kit functions, components, hooks, utility functions, and
  TypeScript types.
date: 2024-01-06
---

## API Reference

The complete reference for everything exported by Blog Kit. For tutorials and usage examples, see
[Getting Started](/docs/getting-started) and [Guides](/docs/guides).

---

### Core Package (`@haroonwaves/blog-kit-core`)

All core functions require Node.js (`fs` module) and only work in server environments (Next.js
SSR/SSG, Node.js scripts, etc.).

#### `getAllContentMeta(config: ContentConfig): ContentMeta[]`

Returns an array of all content metadata sorted by date (newest first).

**Parameters:**

- `config.contentDirectory` (string): Path to your content directory
- `config.contentSubdirectory` (string, optional): Subdirectory for content files (defaults to
  `'blog'`)

**Returns:** Array of `ContentMeta` objects

```typescript
import { getAllContentMeta } from '@haroonwaves/blog-kit-core';

const docsMeta = getAllContentMeta({
	contentDirectory: process.cwd(),
	contentSubdirectory: 'content/docs',
});

docsMeta.forEach((meta) => {
	console.log(meta.title, meta.slug, meta.readingTime);
});
```

#### `getContent(slug: string, config: ContentConfig): Content | null`

Returns the full content data (metadata + body) for a specific slug.

**Parameters:**

- `slug` (string): The content slug (filename without `.md`)
- `config.contentDirectory` (string): Path to your content directory
- `config.contentSubdirectory` (string, optional): Subdirectory for content files (defaults to
  `'blog'`)

**Returns:** `Content` object or `null` if not found

```typescript
import { getContent } from '@haroonwaves/blog-kit-core';

const doc = getContent('getting-started', {
	contentDirectory: process.cwd(),
	contentSubdirectory: 'content/docs',
});

if (doc) {
	console.log(doc.metadata.title);
	console.log(doc.metadata.readingTime);
	console.log(doc.body);
}
```

---

### React Package (`@haroonwaves/blog-kit-react`)

#### Components

##### `ContentList`

A stateless component that renders a list of content cards. Works with both server-side and
client-side rendering.

| Prop           | Type                                                               | Default               | Description                                |
| -------------- | ------------------------------------------------------------------ | --------------------- | ------------------------------------------ |
| `metadata`     | `ContentMeta[]`                                                    | _required_            | Array of content metadata to render        |
| `title`        | `string`                                                           | —                     | Page title (rendered as h1)                |
| `description`  | `string`                                                           | —                     | Page description                           |
| `basePath`     | `string`                                                           | `'/blog'`             | Base URL for content links                 |
| `renderLink`   | `(href, children) => ReactNode`                                    | —                     | Custom link renderer (e.g. Next.js `Link`) |
| `className`    | `string`                                                           | —                     | CSS class for the card container           |
| `emptyMessage` | `string`                                                           | `'No content found.'` | Message when list is empty                 |
| `cardProps`    | `Omit<ContentCardProps, 'metadata' \| 'basePath' \| 'renderLink'>` | —                     | Props forwarded to each `ContentCard`      |
| `classNames`   | `{ title?, description? }`                                         | —                     | CSS overrides for title and description    |

---

##### `ContentCard`

Renders a single content item card with category badges, reading time, and date.

| Prop              | Type                            | Default    | Description                                |
| ----------------- | ------------------------------- | ---------- | ------------------------------------------ |
| `metadata`        | `ContentMeta`                   | _required_ | Content metadata object                    |
| `basePath`        | `string`                        | `'/blog'`  | Base path for content links                |
| `renderLink`      | `(href, children) => ReactNode` | —          | Custom link renderer (e.g. Next.js `Link`) |
| `className`       | `string`                        | —          | Additional CSS classes                     |
| `showCategory`    | `boolean`                       | `true`     | Show category badge                        |
| `showReadingTime` | `boolean`                       | `true`     | Show reading time                          |
| `showDate`        | `boolean`                       | `true`     | Show publication date                      |

---

##### `ContentRenderer`

Renders markdown content with syntax highlighting (Prism), GFM support, heading anchor links, and
styled typography. Supports custom component overrides.

| Prop              | Type                            | Default    | Description                             |
| ----------------- | ------------------------------- | ---------- | --------------------------------------- |
| `body`            | `string`                        | _required_ | Markdown content to render              |
| `metadata`        | `ContentMeta`                   | _required_ | Content metadata object                 |
| `className`       | `string`                        | —          | Additional CSS classes                  |
| `components`      | `Record<string, ComponentType>` | —          | Override default HTML element renderers |
| `showCategory`    | `boolean`                       | `true`     | Show category badge                     |
| `showReadingTime` | `boolean`                       | `true`     | Show reading time                       |
| `showDate`        | `boolean`                       | `true`     | Show publication date                   |

**Overridable elements:** `h1`–`h6`, `p`, `a`, `blockquote`, `code`, `pre`, `img`, `table`, `thead`,
`tbody`, `tr`, `th`, `td`, `ul`, `ol`, `li`, `strong`, `em`, `del`, `hr`, `br`, `input`

---

##### `Filter`

A client component for searching and category filtering.

| Prop                  | Type                            | Default               | Description                       |
| --------------------- | ------------------------------- | --------------------- | --------------------------------- |
| `searchTerm`          | `string`                        | _required_            | Current search input value        |
| `setSearchTerm`       | `(term: string) => void`        | _required_            | Callback for search input changes |
| `selectedCategory`    | `string \| null`                | _required_            | Currently selected category       |
| `setSelectedCategory` | `(cat: string \| null) => void` | _required_            | Callback for category changes     |
| `categories`          | `string[]`                      | _required_            | List of available category labels |
| `contentCount`        | `number`                        | —                     | Number of results to display      |
| `placeholder`         | `string`                        | `'Search content...'` | Search input placeholder text     |
| `className`           | `string`                        | —                     | Container CSS class               |
| `classNames`          | `object`                        | —                     | CSS overrides (see below)         |

**`classNames` keys:** `input`, `categoryContainer`, `pill`, `activePill`, `inactivePill`,
`contentCount`

---

##### `ContentPlaceholder`

Renders animated skeleton loading cards.

| Prop        | Type     | Default | Description                     |
| ----------- | -------- | ------- | ------------------------------- |
| `count`     | `number` | `3`     | Number of placeholder skeletons |
| `className` | `string` | —       | Additional CSS classes          |

---

#### Hooks

##### `useContent(allContentMeta: ContentMeta[])`

A client-side hook that provides search and category filter state management with debounced search
(500ms).

**Parameters:**

- `allContentMeta` (ContentMeta[]): Array of content metadata to filter

**Returns:**

| Field                 | Type                            | Description                      |
| --------------------- | ------------------------------- | -------------------------------- |
| `metadata`            | `ContentMeta[]`                 | Filtered content items           |
| `searchTerm`          | `string`                        | Current search input value       |
| `setSearchTerm`       | `(term: string) => void`        | Update the search term           |
| `selectedCategory`    | `string \| null`                | Currently selected category      |
| `setSelectedCategory` | `(cat: string \| null) => void` | Update selected category         |
| `categories`          | `string[]`                      | All unique categories from input |

---

#### Utility Functions

##### `filterContent(items: ContentMeta[], searchTerm?: string, selectedCategory?: string | null): ContentMeta[]`

Pure utility to filter content by search term (matches title and description) and/or category.
Useful for server-side filtering or custom implementations outside of `useContent`.

##### `getAvailableCategories(items: ContentMeta[]): string[]`

Returns a deduplicated array of all categories across the provided content metadata.

---

### Types

All types are exported from both `@haroonwaves/blog-kit-core` and `@haroonwaves/blog-kit-react`.

```typescript
interface ContentMeta {
	title: string;
	description: string;
	date: string;
	categories?: string[];
	slug: string;
	readingTime: string;
}

interface Content {
	metadata: ContentMeta;
	body: string;
}

interface ContentConfig {
	contentDirectory: string;
	contentSubdirectory?: string; // defaults to 'blog'
}
```
