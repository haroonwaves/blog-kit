---
title: Blog Kit API Reference
description: Complete API reference for Blog Kit's core package and React components.
date: 2024-01-06
---

## API Reference

Complete reference documentation for all functions, components, hooks, and types available in Blog
Kit. This guide covers both the core package utilities and React components with detailed
parameters, return values, and usage examples.

### Core Package

#### Server-Side Functions (SSR/SSG only)

##### `getAllBlogsMeta(config: BlogConfig): BlogMeta[]`

Returns an array of all blog metadata sorted by date (newest first). Requires Node.js `fs` module.

**Parameters:**

- `config.contentDirectory` (string): Path to your content directory
- `config.blogSubdirectory` (string, optional): Subdirectory for blog files (defaults to 'blog')

**Returns:** Array of `BlogMeta` objects

**Example:**

```typescript
const blogsMeta = getAllBlogsMeta({
	contentDirectory: './content',
	blogSubdirectory: 'posts', // optional
});

// blogs is an array of BlogMeta objects
blogsMeta.forEach((meta) => {
	console.log(meta.title, meta.slug, meta.readingTime);
});
```

##### `getBlog(slug: string, config: BlogConfig): Blog | null`

Returns the full blog data including content for a specific slug. Requires Node.js `fs` module.

**Parameters:**

- `slug` (string): The blog post slug (filename without .md)
- `config.contentDirectory` (string): Path to your content directory
- `config.blogSubdirectory` (string, optional): Subdirectory for blog files (defaults to 'blog')

**Returns:** `Blog` object or `null` if not found

**Example:**

```typescript
const blog = getBlog('my-blog-post', {
	contentDirectory: './content',
});

if (blog) {
	console.log(blog.metadata.title);
	console.log(blog.content); // blog markdown content
	console.log(blog.readingTime);
}
```

### React Package

#### Components

- `BlogRenderer` - Renders markdown content with syntax highlighting
- `BlogCard` - Single blog post card component
- `BlogList` - List of blog cards
- `BlogPlaceholder` - Loading placeholder component

#### Hooks

- `useBlogs(blogs: BlogMeta[])` - Provides search and filter functionality

See the [React Package](/docs/react-package) section for detailed examples of each component and
hook.

### Types

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
	readingTime: string;
}

interface BlogConfig {
	contentDirectory: string;
	blogSubdirectory?: string;
}
```
