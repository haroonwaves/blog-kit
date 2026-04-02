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
import './globals.css'; // Your app's CSS (must come after blog-kit)
```

> **Important:** The import order matters! Blog Kit uses Tailwind CSS v4 which relies on CSS cascade
> layers. If your app also uses Tailwind CSS, importing your app's CSS before Blog Kit will cause
> styling conflicts (e.g., incorrect font sizes, broken layouts). Always import Blog Kit's CSS first
> so your app can properly override styles if needed.
