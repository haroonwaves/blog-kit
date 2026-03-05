---
title: Blog Kit Core Package
description: Blog Kit's Core utilities for parsing markdown post files and calculating reading time.
date: 2024-01-04
---

## Core Package

The `@haroonwaves/blog-kit-core` package provides essential utilities for parsing markdown post
files with frontmatter metadata and automatically calculating reading time. It works in both
server-side (Node.js) and client-side (browser) environments, making it flexible for various use
cases.

### Basic Usage

#### Server-Side (SSR/SSG)

For server-side rendering (Next.js, Node.js scripts, etc.):

```typescript
import { getAllPostsMeta, getPost } from '@haroonwaves/blog-kit-core';

const config = {
	contentDirectory: './content',
	postSubdirectory: 'post', // optional, defaults to 'post'
};

// Get all post metadata
const postsMeta = getAllPostsMeta(config);

// Get a specific post post
const post = getPost('my-post-post', config);
```

#### Client-Side

For client-side usage (when you have markdown content as strings):

```typescript
import { extractPostMeta, extractPost } from '@haroonwaves/blog-kit-core';

// Extract metadata from markdown content
const postMeta = extractPostMeta(markdownContent, 'my-post-post');

// Extract full post data from markdown content
const post = extractPost(markdownContent, 'my-post-post');
```

### Post File Format

Your markdown files should include frontmatter:

```markdown
---
title: My Post Post
description: A brief description of the post
date: 2024-01-15
categories:
  - Technology
  - Web Development
---

# My Post Post

Your markdown content here...
```

**Required frontmatter fields:**

- `title` (string): The post post title
- `description` (string): A brief description/summary
- `date` (string): Publication date (ISO format recommended: YYYY-MM-DD)

**Optional frontmatter fields:**

- `categories` (string[]): Array of categories/tags for the post

The parser automatically extracts this frontmatter and calculates reading time based on the content
length.
