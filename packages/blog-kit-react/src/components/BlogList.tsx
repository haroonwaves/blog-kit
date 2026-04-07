'use client';

import React from 'react';
import { BlogCard, type BlogCardProps } from './BlogCard';
import type { BlogMeta } from '../types';
import { useBlogs } from '../hooks/useBlogs';
import { Filter, type FilterProps } from './Filter';

export interface BlogListProps {
	metadata: BlogMeta[];
	title?: string;
	description?: string;
	basePath?: string;
	renderLink?: BlogCardProps['renderLink'];
	className?: string;
	emptyMessage?: string;
	cardProps?: Omit<BlogCardProps, 'metadata' | 'basePath' | 'renderLink'>;
	showFilter?: boolean;
	classNames?: {
		title?: string;
		description?: string;
		filter?: FilterProps['classNames'];
	};
}

export function BlogList({
	metadata: allMetadata,
	title,
	description,
	basePath = '/blog',
	renderLink,
	className = '',
	emptyMessage = 'No blog posts found.',
	cardProps,
	showFilter = true,
	classNames = {},
}: BlogListProps) {
	const {
		metadata: filteredMetadata,
		searchTerm,
		setSearchTerm,
		selectedCategory,
		setSelectedCategory,
		categories,
	} = useBlogs(allMetadata);

	const metadata = showFilter ? filteredMetadata : allMetadata;

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

			{showFilter && (
				<Filter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					categories={categories}
					classNames={classNames.filter}
				/>
			)}

			{showFilter && (
				<p className="bk:text-xs bk:text-gray-400 bk:mb-4 bk:dark:text-gray-500">
					{metadata.length} {metadata.length === 1 ? 'post' : 'posts'} found
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
						<BlogCard
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
