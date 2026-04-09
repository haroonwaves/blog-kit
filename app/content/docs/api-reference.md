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

#### `getAllBlogsMeta(config: BlogConfig): BlogMeta[]`

Returns an array of all blog metadata sorted by date (newest first).

**Parameters:**

- `config.contentDirectory` (string): Path to your content directory
- `config.blogSubdirectory` (string, optional): Subdirectory for blog files (defaults to `'blog'`)

**Returns:** Array of `BlogMeta` objects

```typescript
const blogsMeta = getAllBlogsMeta({
	contentDirectory: process.cwd(),
	blogSubdirectory: 'content/blog',
});

blogsMeta.forEach((meta) => {
	console.log(meta.title, meta.slug, meta.readingTime);
});
```

#### `getBlog(slug: string, config: BlogConfig): Blog | null`

Returns the full blog data (metadata + content) for a specific slug.

**Parameters:**

- `slug` (string): The blog post slug (filename without `.md`)
- `config.contentDirectory` (string): Path to your content directory
- `config.blogSubdirectory` (string, optional): Subdirectory for blog files (defaults to `'blog'`)

**Returns:** `Blog` object or `null` if not found

```typescript
const blog = getBlog('my-blog-post', {
	contentDirectory: process.cwd(),
	blogSubdirectory: 'content/blog',
});

if (blog) {
	console.log(blog.metadata.title);
	console.log(blog.metadata.readingTime);
	console.log(blog.content);
}
```

---

### React Package (`@haroonwaves/blog-kit-react`)

#### Components

##### `BlogList`

A stateless component that renders a list of blog cards. Works with both server-side and client-side
rendering.

| Prop           | Type                                                            | Default                  | Description                                |
| -------------- | --------------------------------------------------------------- | ------------------------ | ------------------------------------------ |
| `metadata`     | `BlogMeta[]`                                                    | _required_               | Array of blog metadata to render           |
| `title`        | `string`                                                        | —                        | Page title (rendered as h1)                |
| `description`  | `string`                                                        | —                        | Page description                           |
| `basePath`     | `string`                                                        | `'/blog'`                | Base URL for blog post links               |
| `renderLink`   | `(href, children) => ReactNode`                                 | —                        | Custom link renderer (e.g. Next.js `Link`) |
| `className`    | `string`                                                        | —                        | CSS class for the card container           |
| `emptyMessage` | `string`                                                        | `'No blog posts found.'` | Message when list is empty                 |
| `cardProps`    | `Omit<BlogCardProps, 'metadata' \| 'basePath' \| 'renderLink'>` | —                        | Props forwarded to each `BlogCard`         |
| `classNames`   | `{ title?, description? }`                                      | —                        | CSS overrides for title and description    |

---

##### `BlogCard`

Renders a single blog post card with category badges, reading time, and date.

| Prop              | Type                            | Default    | Description                                |
| ----------------- | ------------------------------- | ---------- | ------------------------------------------ |
| `metadata`        | `BlogMeta`                      | _required_ | Blog metadata object                       |
| `basePath`        | `string`                        | `'/blog'`  | Base path for blog links                   |
| `renderLink`      | `(href, children) => ReactNode` | —          | Custom link renderer (e.g. Next.js `Link`) |
| `className`       | `string`                        | —          | Additional CSS classes                     |
| `showCategory`    | `boolean`                       | `true`     | Show category badge                        |
| `showReadingTime` | `boolean`                       | `true`     | Show reading time                          |
| `showDate`        | `boolean`                       | `true`     | Show publication date                      |

---

##### `BlogRenderer`

Renders markdown content with syntax highlighting (Prism), GFM support, heading anchor links, and
styled typography. Supports custom component overrides.

| Prop              | Type                            | Default    | Description                             |
| ----------------- | ------------------------------- | ---------- | --------------------------------------- |
| `content`         | `string`                        | _required_ | Markdown content to render              |
| `metadata`        | `BlogMeta`                      | _required_ | Blog metadata object                    |
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

| Prop                  | Type                            | Default             | Description                       |
| --------------------- | ------------------------------- | ------------------- | --------------------------------- |
| `searchTerm`          | `string`                        | _required_          | Current search input value        |
| `setSearchTerm`       | `(term: string) => void`        | _required_          | Callback for search input changes |
| `selectedCategory`    | `string \| null`                | _required_          | Currently selected category       |
| `setSelectedCategory` | `(cat: string \| null) => void` | _required_          | Callback for category changes     |
| `categories`          | `string[]`                      | _required_          | List of available category labels |
| `postsCount`          | `number`                        | —                   | Number of results to display      |
| `placeholder`         | `string`                        | `'Search blogs...'` | Search input placeholder text     |
| `className`           | `string`                        | —                   | Container CSS class               |
| `classNames`          | `object`                        | —                   | CSS overrides (see below)         |

**`classNames` keys:** `input`, `categoryContainer`, `pill`, `activePill`, `inactivePill`,
`postsCount`

---

##### `BlogPlaceholder`

Renders animated skeleton loading cards.

| Prop        | Type     | Default | Description                     |
| ----------- | -------- | ------- | ------------------------------- |
| `count`     | `number` | `3`     | Number of placeholder skeletons |
| `className` | `string` | —       | Additional CSS classes          |

---

#### Hooks

##### `useBlogs(blogsMeta: BlogMeta[])`

A client-side hook that provides search and category filter state management with debounced search
(500ms).

**Parameters:**

- `blogsMeta` (BlogMeta[]): Array of blog metadata to filter

**Returns:**

| Field                 | Type                            | Description                            |
| --------------------- | ------------------------------- | -------------------------------------- |
| `metadata`            | `BlogMeta[]`                    | Filtered blog posts                    |
| `searchTerm`          | `string`                        | Current search input value             |
| `setSearchTerm`       | `(term: string) => void`        | Update the search term                 |
| `selectedCategory`    | `string \| null`                | Currently selected category            |
| `setSelectedCategory` | `(cat: string \| null) => void` | Update selected category               |
| `categories`          | `string[]`                      | All unique categories from input blogs |

---

#### Utility Functions

##### `filterBlogs(blogs: BlogMeta[], searchTerm?: string, selectedCategory?: string | null): BlogMeta[]`

Pure utility to filter blogs by search term (matches title and description) and/or category. Useful
for server-side filtering or custom implementations outside of `useBlogs`.

##### `getAvailableCategories(blogs: BlogMeta[]): string[]`

Returns a deduplicated array of all categories across the provided blog metadata.

---

### Types

All types are exported from both `@haroonwaves/blog-kit-core` and `@haroonwaves/blog-kit-react`.

```typescript
interface BlogMeta {
	title: string;
	description: string;
	date: string;
	categories?: string[];
	slug: string;
	readingTime: string;
}

interface Blog {
	metadata: BlogMeta;
	content: string;
}

interface BlogConfig {
	contentDirectory: string;
	blogSubdirectory?: string; // defaults to 'blog'
}
```
