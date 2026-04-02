---
title: Blog Kit Installation
description: How to install Blog Kit packages using node package manager.
date: 2024-01-02
---

## Installation

Get started with Blog Kit by installing the packages you need. Designed primarily for Next.js
applications, you can choose between the core package for server-side markdown parsing or the React
package for pre-built UI components.

### Core Package

```bash
npm install @haroonwaves/blog-kit-core
# or
pnpm add @haroonwaves/blog-kit-core
# or
yarn add @haroonwaves/blog-kit-core
```

### React Package

```bash
npm install @haroonwaves/blog-kit-react
# or
pnpm add @haroonwaves/blog-kit-react
# or
yarn add @haroonwaves/blog-kit-react
```

**Note:** The React package requires React 19+ as a peer dependency.

### Styling

The package includes Prism.js CSS for syntax highlighting and Tailwind CSS for component styling.
Import these styles **before** your app's global CSS:

```tsx
// In your root layout or entry file (e.g., layout.tsx, App.tsx)
import '@haroonwaves/blog-kit-react/dist/index.css'; // Prism syntax highlighting
import '@haroonwaves/blog-kit-react/dist/style.css'; // Component styles
import './globals.css'; // Your app's CSS
```

> **Important:** Blog Kit uses a dedicated `bk:` namespace for all its utility classes (e.g.,
> `bk:text-2xl`). This ensures that library styles never clash with your app's own Tailwind
> utilities. While the `bk:` namespace makes styling robust, importing Blog Kit's CSS **before**
> your app's global CSS remains standard practice so that your app's base typography can serve as
> the foundation.
