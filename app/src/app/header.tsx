'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
	const pathname = usePathname();
	const isDocs = pathname.startsWith('/docs');

	return (
		<header className="sticky top-0 z-60 border-b border-gray-100 dark:border-gray-900 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div
				className={cn(
					'flex h-16 items-center justify-between px-6 transition-all duration-300',
					isDocs && 'pl-16 lg:pl-6'
				)}
			>
				<Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<BookOpen className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="text-lg font-bold">Blog Kit</span>
				</Link>

				<nav className="flex items-center gap-6">
					<a
						href="https://github.com/haroonwaves/blog-kit"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						Github
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
