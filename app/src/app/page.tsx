import Link from 'next/link';
import { BookOpen, Zap, Code2, Palette, ArrowRight, Github } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Build Professional Content Sites with Next.js & Markdown - Blog Kit',
	description:
		'Build professional blogs, documentation sites, and portfolios in minutes with Blog Kit. The ultimate Next.js toolkit for creating beautiful markdown-based content sites.',
	keywords: [
		'nextjs blog toolkit',
		'build blog with nextjs',
		'markdown blog nextjs',
		'create your own blog',
		'build blog from scratch',
		'markdown blog tutorial',
		'developer blog setup',
		'personal blog platform',
		'blog building tool',
		'free blog builder',
		'self-hosted blog',
		'blog for developers',
	],
	openGraph: {
		title: 'Build Professional Content Sites with Next.js & Markdown - Blog Kit',
		description:
			'Create professional content sites in minutes. The ultimate Next.js toolkit for building beautiful markdown-based blogs, docs, and portfolios.',
		type: 'website',
		url: 'https://blog-kit.haroonwaves.com',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Build Professional Content Sites with Next.js & Markdown',
		description:
			'Create professional blogs, documentation, and portfolios in minutes. The ultimate Next.js toolkit for building beautiful markdown-based content sites.',
	},
	alternates: {
		canonical: 'https://blog-kit.haroonwaves.com',
	},
};

export default function HomePage() {
	// Structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Blog Kit',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		description:
			'A modern, Next.js toolkit for building markdown-based content sites with minimal configuration. Perfect for developers building professional blogs, documentation, and portfolios.',
		url: 'https://blog-kit.haroonwaves.com',
		author: {
			'@type': 'Person',
			name: 'Haroon',
			url: 'https://github.com/haroonwaves',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '5',
			ratingCount: '1',
		},
		keywords:
			'nextjs blog builder, markdown blog nextjs, TypeScript blog, React blog, Next.js blog toolkit, build your own blog, create blog, developer blog',
	};

	return (
		<>
			{/* Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
				{/* Hero Section */}
				<section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-32 md:pb-24">
					{/* Animated background gradient */}
					<div className="absolute inset-0 -z-10 opacity-30">
						<div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
						<div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse delay-1000" />
					</div>

					<div className="mx-auto max-w-5xl text-center">
						{/* Logo */}
						<div className="mb-8 flex justify-center animate-fade-in-up">
							<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
								<BookOpen className="h-10 w-10 text-primary-foreground" />
							</div>
						</div>

						{/* Heading */}
						<h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl animate-fade-in-up delay-100">
							<span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
								Build Beautiful Content Sites
							</span>
						</h1>

						{/* Subheading */}
						<p className="mb-12 text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto animate-fade-in-up delay-200">
							A modern, Next.js toolkit for building professional blogs, documentation, and content
							sites with minimal configuration.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
							<Link
								href="/docs/getting-started"
								className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
							>
								Get Started
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Link>
							<a
								href="https://github.com/haroonwaves/blog-kit"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105"
							>
								<Github className="h-5 w-5" />
								View on GitHub
							</a>
						</div>
					</div>
				</section>

				{/* Use Cases Section */}
				<section className="px-6 py-16 md:py-24 bg-muted/30">
					<div className="mx-auto max-w-6xl">
						<h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Perfect For</h2>
						<p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
							Whether you&apos;re a developer, writer, or content creator, Blog Kit gives you the
							tools to build your own site exactly how you want it
						</p>

						<div className="grid gap-6 md:grid-cols-3">
							{/* Use Case 1 */}
							<div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:scale-105">
								<div className="mb-4 text-4xl">📝</div>
								<h3 className="mb-3 text-xl font-semibold">Portfolios & Blogs</h3>
								<p className="text-muted-foreground">
									Build your own personal site to share your thoughts, projects, and experiences
									with a beautiful, fast platform that&apos;s easy to maintain.
								</p>
							</div>

							{/* Use Case 2 */}
							<div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:scale-105">
								<div className="mb-4 text-4xl">📚</div>
								<h3 className="mb-3 text-xl font-semibold">Documentation Sites</h3>
								<p className="text-muted-foreground">
									Create comprehensive documentation for your projects with organized navigation and
									search. Perfect for developer documentation.
								</p>
							</div>

							{/* Use Case 3 */}
							<div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:scale-105">
								<div className="mb-4 text-4xl">🚀</div>
								<h3 className="mb-3 text-xl font-semibold">Content Platforms</h3>
								<p className="text-muted-foreground">
									Build scalable content platforms with TypeScript safety and modern tooling. Full
									control over your content and design.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="px-6 py-16 md:py-24">
					<div className="mx-auto max-w-6xl">
						<h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
							Why Choose Blog Kit for Your Project?
						</h2>
						<p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
							Skip the complexity of markdown parsing, syntax highlighting, and UI components. Blog
							Kit handles it all so you can focus on creating content.
						</p>

						<div className="grid gap-6 md:grid-cols-3">
							{/* Feature 1 */}
							<div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:scale-105 animate-fade-in-up delay-400">
								<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
								<div className="relative">
									<div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<Zap className="h-7 w-7" />
									</div>
									<h3 className="mb-3 text-xl font-semibold">Zero Configuration</h3>
									<p className="text-muted-foreground">
										Works out of the box with sensible defaults. Start building your site
										immediately without complex setup or configuration.
									</p>
								</div>
							</div>

							{/* Feature 2 */}
							<div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:scale-105 animate-fade-in-up delay-500">
								<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
								<div className="relative">
									<div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<Code2 className="h-7 w-7" />
									</div>
									<h3 className="mb-3 text-xl font-semibold">TypeScript First</h3>
									<p className="text-muted-foreground">
										Full type safety and IntelliSense support for a superior developer experience
										when building your content site.
									</p>
								</div>
							</div>

							{/* Feature 3 */}
							<div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:scale-105 animate-fade-in-up delay-600">
								<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
								<div className="relative">
									<div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<Palette className="h-7 w-7" />
									</div>
									<h3 className="mb-3 text-xl font-semibold">Production Ready</h3>
									<p className="text-muted-foreground">
										Battle-tested components with dark mode support and polished user experience.
										Your site will look professional from day one.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Footer CTA */}
				<section className="px-6 py-16 md:py-24">
					<div className="mx-auto max-w-4xl text-center">
						<div className="rounded-3xl border border-border bg-linear-to-br from-card to-muted/20 p-12 shadow-xl">
							<h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Build Your New Site?</h2>
							<p className="mb-8 text-lg text-muted-foreground">
								Explore the documentation and start building your blog, documentation, or portfolio
								today. It&apos;s free, open-source, and takes just minutes to get started.
							</p>
							<Link
								href="/docs"
								className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
							>
								Browse Documentation
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
