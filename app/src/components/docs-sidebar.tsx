'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Zap, Compass, FileCode, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const sections = [
	{ title: 'Overview', href: '/docs/overview', icon: BookOpen },
	{ title: 'Getting Started', href: '/docs/getting-started', icon: Zap },
	{ title: 'Guides', href: '/docs/guides', icon: Compass },
	{ title: 'API Reference', href: '/docs/api-reference', icon: FileCode },
];

export function DocsSidebar() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="fixed top-20 left-4 z-50 lg:hidden p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg hover:bg-muted/50 transition-colors"
				aria-label="Toggle menu"
			>
				{isMobileMenuOpen ? (
					<X className="h-5 w-5 text-foreground" />
				) : (
					<Menu className="h-5 w-5 text-foreground" />
				)}
			</button>

			{/* Mobile Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed top-16 inset-x-0 bottom-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-border/40 bg-linear-to-b from-background via-background to-muted/20 backdrop-blur-xl transition-transform duration-300 ease-in-out z-50',
					// Mobile: slide in from left
					isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				)}
			>
				<div className="px-6 py-10 space-y-8">
					<nav>
						<ul className="space-y-1.5">
							{sections.map((section) => {
								const isActive = pathname === section.href;
								const Icon = section.icon;

								return (
									<li key={section.href}>
										<Link
											href={section.href}
											onClick={() => setIsMobileMenuOpen(false)}
											className={cn(
												'group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
												'hover:scale-[1.02] active:scale-[0.98]',
												isActive
													? 'bg-linear-to-r from-primary/15 via-primary/10 to-transparent text-primary shadow-sm'
													: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
											)}
										>
											{/* Active indicator */}
											{isActive && (
												<div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-linear-to-b from-primary via-primary/80 to-primary/60" />
											)}

											{/* Icon */}
											<Icon
												className={cn(
													'h-4 w-4 transition-all duration-200',
													isActive
														? 'text-primary'
														: 'text-muted-foreground/70 group-hover:text-foreground group-hover:scale-110'
												)}
											/>

											{/* Title */}
											<span className="flex-1">{section.title}</span>

											{/* Hover effect */}
											<div
												className={cn(
													'absolute inset-0 rounded-xl bg-linear-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-200',
													'group-hover:opacity-100',
													isActive && 'opacity-0'
												)}
											/>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					{/* Bottom decoration */}
					<div className="pt-6 border-t border-border/40">
						<div className="rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4 border border-primary/20">
							<div className="flex items-start gap-3">
								<Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
								<div className="space-y-1">
									<p className="text-xs font-medium text-foreground">Need help?</p>
									<a
										href="https://github.com/haroonwaves/blog-kit/issues"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline transition-all"
									>
										Join GitHub Issues
										<span className="text-[10px]">↗</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}
