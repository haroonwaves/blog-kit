import Link from 'next/link';
import {
	BookOpen,
	Download,
	Zap,
	Package,
	Layers,
	FileCode,
	Code,
	ArrowRight,
	Sparkles,
} from 'lucide-react';

const quickLinks = [
	{
		title: 'Overview',
		description: 'Learn about Blog Kit and what makes it powerful',
		href: '/docs/overview',
		icon: BookOpen,
		color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
		iconColor: 'text-blue-600 dark:text-blue-400',
	},
	{
		title: 'Installation',
		description: 'Add Blog Kit to your project in minutes',
		href: '/docs/installation',
		icon: Download,
		color: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
		iconColor: 'text-green-600 dark:text-green-400',
	},
	{
		title: 'Quick Start',
		description: 'Get up and running with a step-by-step guide',
		href: '/docs/quick-start',
		icon: Zap,
		color: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20',
		iconColor: 'text-yellow-600 dark:text-yellow-400',
	},
	{
		title: 'Core Package',
		description: 'Parse markdown files and extract metadata',
		href: '/docs/core-package',
		icon: Package,
		color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20',
		iconColor: 'text-purple-600 dark:text-purple-400',
	},
	{
		title: 'React Package',
		description: 'Beautiful components for rendering posts',
		href: '/docs/react-package',
		icon: Layers,
		color: 'from-indigo-500/10 to-blue-500/10 border-indigo-500/20',
		iconColor: 'text-indigo-600 dark:text-indigo-400',
	},
	{
		title: 'API Reference',
		description: 'Explore all available features and APIs',
		href: '/docs/api-reference',
		icon: FileCode,
		color: 'from-red-500/10 to-rose-500/10 border-red-500/20',
		iconColor: 'text-red-600 dark:text-red-400',
	},
	{
		title: 'Dark Mode',
		description: 'Implement beautiful dark mode support',
		href: '/docs/dark-mode',
		icon: Code,
		color: 'from-slate-500/10 to-gray-500/10 border-slate-500/20',
		iconColor: 'text-slate-600 dark:text-slate-400',
	},
];

export default function DocsPage() {
	return (
		<div className="space-y-12 pb-16">
			{/* Hero Section */}
			<div className="relative">
				<div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl blur-3xl" />
				<div className="relative space-y-6 text-center max-w-3xl mx-auto py-12">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
						<Sparkles className="h-4 w-4" />
						Documentation
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
						Welcome to Blog Kit
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Everything you need to build a modern, markdown-based post. Start with the basics or
						dive deep into advanced features.
					</p>
				</div>
			</div>

			{/* Quick Start CTA */}
			<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
				<Link
					href="/docs/quick-start"
					className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
				>
					<Zap className="h-4 w-4" />
					Quick Start Guide
					<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
				</Link>
				<Link
					href="/docs/api-reference"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-all duration-200 hover:scale-105 active:scale-95"
				>
					<FileCode className="h-4 w-4" />
					API Reference
				</Link>
			</div>

			{/* Documentation Grid */}
			<div className="space-y-6">
				<h2 className="text-2xl font-bold text-center">Explore the Documentation</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{quickLinks.map((link) => {
						const Icon = link.icon;
						return (
							<Link
								key={link.href}
								href={link.href}
								className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
							>
								{/* Gradient background */}
								<div
									className={`absolute inset-0 rounded-2xl bg-linear-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
								/>

								{/* Content */}
								<div className="relative space-y-4">
									<div className="flex items-start justify-between">
										<div
											className={`p-3 rounded-xl bg-linear-to-br ${link.color} border border-border`}
										>
											<Icon className={`h-6 w-6 ${link.iconColor}`} />
										</div>
										<ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
									</div>

									<div className="space-y-2">
										<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
											{link.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{link.description}
										</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>

			{/* Help Section */}
			<div className="mt-16 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20">
				<div className="max-w-2xl mx-auto text-center space-y-4">
					<h3 className="text-2xl font-bold">Need Help?</h3>
					<p className="text-muted-foreground">
						Can&apos;t find what you&apos;re looking for? Join our community on GitHub for support
						and discussions.
					</p>
					<a
						href="https://github.com/haroonwaves/blog-kit/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
					>
						<Sparkles className="h-4 w-4" />
						GitHub Issues
						<span className="text-sm">↗</span>
					</a>
				</div>
			</div>
		</div>
	);
}
