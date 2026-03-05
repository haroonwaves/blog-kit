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
		default: 'Blog Kit - Build Your Own Post with Markdown & TypeScript',
		template: '%s | Blog Kit',
	},
	description:
		'Create your own post in minutes with Blog Kit. A toolkit for building beautiful markdown-based posts and documentation sites. ',
	keywords: [
		'build a post',
		'create post',
		'markdown post',
		'post builder',
		'post framework',
		'static post generator',
		'TypeScript post',
		'React post',
		'Next.js post',
		'post toolkit',
		'personal post',
		'developer post',
		'markdown to post',
		'post CMS',
		'headless post',
		'post engine',
		'documentation site',
		'static site generator',
		'post platform',
		'open source post',
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
		title: 'Blog Kit - Build Your Own Post with Markdown & TypeScript',
		description:
			'Create your own post in minutes. A modern toolkit for building beautiful markdown-based posts with zero configuration. Perfect for developers, writers, and content creators.',
		siteName: 'Blog Kit',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Blog Kit - Build Your Own Post',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Blog Kit - Build Your Own Post with Markdown & TypeScript',
		description:
			'Create your own post in minutes. Modern toolkit for building beautiful markdown-based posts with zero configuration.',
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
