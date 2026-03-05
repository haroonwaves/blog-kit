---
title: Blog Kit API Reference
description: Complete API reference for Blog Kit's core package and React components.
date: 2024-01-06
---

## API Reference

Complete reference documentation for all functions, components, hooks, and types available in Post
Kit. This guide covers both the core package utilities and React components with detailed
parameters, return values, and usage examples.

### Core Package

#### Server-Side Functions (SSR/SSG only)

##### `getAllPostsMeta(config: PostConfig): PostMeta[]`

Returns an array of all post metadata sorted by date (newest first). Requires Node.js `fs` module.

**Parameters:**

- `config.contentDirectory` (string): Path to your content directory
- `config.postSubdirectory` (string, optional): Subdirectory for post files (defaults to 'post')

**Returns:** Array of `PostMeta` objects

**Example:**

```typescript
const postsMeta = getAllPostsMeta({
	contentDirectory: './content',
	postSubdirectory: 'posts', // optional
});

// posts is an array of PostMeta objects
postsMeta.forEach((meta) => {
	console.log(meta.title, meta.slug, meta.readingTime);
});
```

##### `getPost(slug: string, config: PostConfig): Post | null`

Returns the full post data including content for a specific slug. Requires Node.js `fs` module.

**Parameters:**

- `slug` (string): The post slug (filename without .md)
- `config.contentDirectory` (string): Path to your content directory
- `config.postSubdirectory` (string, optional): Subdirectory for post files (defaults to 'post')

**Returns:** `Post` object or `null` if not found

**Example:**

```typescript
const post = getPost('my-post', {
	contentDirectory: './content',
});

if (post) {
	console.log(post.metadata.title);
	console.log(post.content); // post markdown content
	console.log(post.readingTime);
}
```

#### Client-Side Functions (Browser compatible)

##### `extractPostMeta(content: string, slug: string): PostMeta`

Extracts post metadata from raw markdown content. Works in browser environments.

**Parameters:**

- `content` (string): Raw markdown content string
- `slug` (string): Post slug/identifier

**Returns:** `PostMeta` object

**Example:**

```typescript
const postMeta = extractPostMeta(markdownContent, 'my-post');
console.log(postMeta.title, postMeta.readingTime);
```

##### `extractPost(content: string, slug: string): Post`

Extracts full post data from raw markdown content. Works in browser environments.

**Parameters:**

- `content` (string): Raw markdown content string
- `slug` (string): Post slug/identifier

**Returns:** `Post` object

**Example:**

```typescript
const post = extractPost(markdownContent, 'my-post');
console.log(post.metadata.title);
console.log(post.content); // markdown content
```

### React Package

#### Components

- `PostRenderer` - Renders markdown content with syntax highlighting
- `PostCard` - Single post card component
- `PostList` - List of post cards
- `PostPlaceholder` - Loading placeholder component

#### Hooks

- `usePosts(posts: PostMeta[])` - Provides search and filter functionality

See the [React Package](/docs/react-package) section for detailed examples of each component and
hook.

### Types

```typescript
interface PostMeta {
	title: string;
	description: string;
	date: string;
	categories?: string[];
	slug: string;
	readingTime: string;
}

interface Post {
	metadata: PostMeta;
	content: string;
	readingTime: string;
}

interface PostConfig {
	contentDirectory: string;
	postSubdirectory?: string;
}
```
