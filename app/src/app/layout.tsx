import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/app/header';

import '@haroonwaves/blog-kit-react/dist/index.css'; // For Prism styles
import '@haroonwaves/blog-kit-react/dist/style.css'; // For Component styles
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://blog-kit.haroonwaves.com'),
	title: {
		default: 'Blog Kit - Build Your Own Professional Blog with Next.js & Markdown',
		template: '%s | Blog Kit',
	},
	description:
		'The ultimate Next.js toolkit for building professional markdown-based blogs and documentation sites in minutes. ',
	keywords: [
		'build a blog',
		'create blog',
		'markdown blog',
		'blog builder',
		'blog framework',
		'static blog generator',
		'TypeScript blog',
		'React blog',
		'Next.js blog',
		'blog toolkit',
		'personal blog',
		'developer blog',
		'markdown to blog',
		'blog CMS',
		'headless blog',
		'blog engine',
		'documentation site',
		'static site generator',
		'blog platform',
		'open source blog',
	],
	authors: [{ name: 'Haroon', url: 'https://github.com/haroonwaves' }],
	creator: 'Haroon',
	publisher: 'Blog Kit',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://blog-kit.haroonwaves.com',
		title: 'Blog Kit - Build Your Own Professional Blog with Next.js & Markdown',
		description:
			'The ultimate Next.js toolkit for building professional markdown-based blogs in minutes with zero configuration. Perfect for developers looking to build their own blog with React Server Components.',
		siteName: 'Blog Kit',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Blog Kit - Build Your Own Blog',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Blog Kit - Build Your Own Professional Blog with Next.js & Markdown',
		description:
			'The ultimate Next.js toolkit for building professional markdown-based blogs in minutes with zero configuration.',
		images: ['/og-image.png'],
		creator: '@haroonwaves',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	manifest: '/site.webmanifest',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
