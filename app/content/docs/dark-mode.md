---
title: Dark Mode Setup
description:
  Learn how to configure dark mode support for Blog Kit components in your Next.js or React
  application with step-by-step setup instructions.
date: 2024-01-04
---

## Dark Mode Setup

Learn how to configure dark mode support for Blog Kit components in your application. This guide
covers setup for both Next.js (using next-themes) and vanilla React applications with custom theme
providers.

This package uses a custom Tailwind `dark` variant that activates only when the `<html>` element has
the `dark` class. Make sure your theme provider toggles `document.documentElement.classList`.

### Next.js with next-themes

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

### Vite/CRA with custom theme toggle

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
