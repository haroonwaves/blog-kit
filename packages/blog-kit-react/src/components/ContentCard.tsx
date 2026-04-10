import React from 'react';
import type { ContentMeta } from '../types';
import { Badge } from './Badge';

export interface ContentCardProps {
	metadata: ContentMeta;
	basePath?: string; // e.g., '/blog'
	renderLink?: (href: string, children: React.ReactNode) => React.ReactNode;
	className?: string;
	showCategory?: boolean;
	showReadingTime?: boolean;
	showDate?: boolean;
}

export function ContentCard({
	metadata,
	basePath = '/blog',
	renderLink,
	className = '',
	showCategory = true,
	showReadingTime = true,
	showDate = true,
}: ContentCardProps) {
	const href = `${basePath}/${metadata.slug}`;
	const defaultLink = (href: string, children: React.ReactNode) => <a href={href}>{children}</a>;
	const Link = renderLink || defaultLink;

	return (
		<article
			className={`bk:rounded-lg bk:border bk:border-gray-200 bk:dark:border-gray-700 bk:hover:border-gray-300 bk:dark:hover:border-gray-600 bk:bg-white bk:dark:bg-gray-800 bk:p-6 bk:transition-colors bk:min-h-[200px] bk:flex bk:flex-col ${className}`}
		>
			{(showCategory || showReadingTime || showDate) && (
				<div className="bk:mb-3">
					<div className="bk:flex bk:items-center bk:gap-3 bk:justify-between">
						{showCategory && metadata.categories?.length ? (
							<div className="bk:flex bk:items-center bk:gap-1.5 bk:flex-nowrap bk:overflow-hidden">
								{metadata.categories.slice(0, 2).map((cat) => (
									<Badge key={cat}>{cat}</Badge>
								))}
							</div>
						) : null}
						{(showReadingTime || showDate) && (
							<div className="bk:flex bk:items-center bk:gap-2 bk:text-sm bk:text-gray-500 bk:dark:text-gray-400 bk:whitespace-nowrap">
								{showReadingTime && <span>{metadata.readingTime}</span>}
								{showReadingTime && showDate && <span>•</span>}
								{showDate && (
									<time dateTime={metadata.date}>
										{new Date(metadata.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</time>
								)}
							</div>
						)}
					</div>
				</div>
			)}

			{Link(
				href,
				<h2 className="bk:font-semibold bk:text-xl bk:text-gray-700 bk:dark:text-gray-100 bk:mb-2 bk:hover:underline bk:transition-colors bk:line-clamp-2">
					{metadata.title}
				</h2>
			)}

			<p className="bk:text-sm bk:text-gray-500 bk:dark:text-gray-300 bk:mb-2 bk:leading-6 bk:line-clamp-2">
				{metadata.description}
			</p>

			<div className="bk:mt-auto">
				{Link(
					href,
					<span className="bk:inline-flex bk:items-center bk:text-blue-600 bk:dark:text-blue-400 bk:hover:text-blue-700 bk:dark:hover:text-blue-300 bk:font-medium bk:text-sm">
						Read more →
					</span>
				)}
			</div>
		</article>
	);
}
