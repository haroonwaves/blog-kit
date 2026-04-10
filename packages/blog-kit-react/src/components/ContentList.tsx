import React from 'react';
import { ContentCard, type ContentCardProps } from './ContentCard';
import type { ContentMeta } from '../types';

export interface ContentListProps {
	metadata: ContentMeta[];
	title?: string;
	description?: string;
	basePath?: string;
	renderLink?: ContentCardProps['renderLink'];
	className?: string;
	emptyMessage?: string;
	cardProps?: Omit<ContentCardProps, 'metadata' | 'basePath' | 'renderLink'>;
	classNames?: {
		// cardContainer: string;
		title?: string;
		description?: string;
	};
}

/**
 * A pure, stateless ContentList component that renders a list of content cards.
 * Accepts metadata and renders it exactly as provided.
 */
export function ContentList({
	metadata,
	title,
	description,
	basePath = '/blog',
	renderLink,
	className = '',
	emptyMessage = 'No content found.',
	cardProps,
	classNames = {},
}: ContentListProps) {
	return (
		<div className="bk:w-full">
			{title && (
				<h1
					className={`bk:text-4xl bk:font-bold bk:mb-4 bk:mt-8 bk:text-gray-800 bk:dark:text-gray-100 ${classNames.title ?? ''}`}
				>
					{title}
				</h1>
			)}

			{description && (
				<p
					className={`bk:text-gray-600 bk:dark:text-gray-400 bk:mb-8 ${classNames.description ?? ''}`}
				>
					{description}
				</p>
			)}

			{metadata.length === 0 ? (
				<div
					className={`bk:text-center bk:text-gray-500 bk:dark:text-gray-400 bk:py-12 ${className}`}
				>
					{emptyMessage}
				</div>
			) : (
				<div className={`bk:flex bk:flex-col bk:gap-6 ${className}`}>
					{metadata.map((meta) => (
						<ContentCard
							key={meta.slug}
							metadata={meta}
							basePath={basePath}
							renderLink={renderLink}
							{...cardProps}
						/>
					))}
				</div>
			)}
		</div>
	);
}
