import React, { type ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeRaw from 'rehype-raw';
import rehypeSlugCustomId from 'rehype-slug-custom-id';
import type { BlogMeta } from '../types';

import '../prism.css';
import { Badge } from './Badge';

export interface BlogRendererProps {
	content: string;
	metadata: BlogMeta;
	className?: string;
	components?: Record<string, React.ComponentType<any>>;
	showCategory?: boolean;
	showReadingTime?: boolean;
	showDate?: boolean;
}

const defaultComponents = {
	h1: (props: ComponentProps<'h1'>) => (
		<h1
			className="bk:mt-10 bk:first:mt-0 bk:mb-5 bk:text-3xl bk:md:text-4xl bk:font-semibold bk:tracking-tight bk:text-gray-800 bk:dark:text-gray-200"
			{...props}
		/>
	),

	h2: (props: ComponentProps<'h2'>) => (
		<h2
			className="bk:mt-8 bk:first:mt-0 bk:mb-4 bk:text-2xl bk:md:text-3xl bk:font-semibold bk:tracking-tight bk:text-gray-800 bk:dark:text-gray-200"
			{...props}
		/>
	),

	h3: (props: ComponentProps<'h3'>) => (
		<h3
			className="bk:mt-6 bk:mb-4 bk:first:mt-0 bk:text-xl bk:md:text-2xl bk:font-semibold bk:text-gray-800 bk:dark:text-gray-200"
			{...props}
		/>
	),

	h4: (props: ComponentProps<'h4'>) => (
		<h4
			className="bk:mt-5 bk:mb-3 bk:first:mt-0 bk:text-lg bk:font-semibold bk:text-gray-800 bk:dark:text-gray-200"
			{...props}
		/>
	),

	h5: (props: ComponentProps<'h5'>) => (
		<h5
			className="bk:mt-4 bk:mb-2 bk:first:mt-0 bk:text-base bk:font-semibold bk:text-gray-700 bk:dark:text-gray-200"
			{...props}
		/>
	),

	h6: (props: ComponentProps<'h6'>) => (
		<h6
			className="bk:mt-4 bk:mb-2 bk:text-sm bk:first:mt-0 bk:font-semibold bk:uppercase bk:tracking-wide bk:text-gray-600 bk:dark:text-gray-300"
			{...props}
		/>
	),

	p: (props: ComponentProps<'p'>) => (
		<p className="bk:mb-4 bk:leading-7 bk:text-gray-700 bk:dark:text-gray-300" {...props} />
	),

	ul: (props: ComponentProps<'ul'>) => (
		<ul
			className="bk:mb-4 bk:ml-6 bk:list-disc bk:space-y-2 bk:text-gray-700 bk:dark:text-gray-300"
			{...props}
		/>
	),

	ol: (props: ComponentProps<'ol'>) => (
		<ol
			className="bk:mb-4 bk:ml-6 bk:list-decimal bk:space-y-2 bk:text-gray-700 bk:dark:text-gray-300"
			{...props}
		/>
	),

	li: (props: ComponentProps<'li'>) => <li {...props} />,

	code: ({ className, children, ...props }: ComponentProps<'code'>) => {
		const isInline = !className;
		return isInline ? (
			<code
				className="bk:rounded bk:bg-gray-100 bk:dark:bg-gray-800 bk:px-1.5 bk:py-0.5 bk:text-sm bk:font-mono bk:text-rose-600 bk:dark:text-rose-400"
				{...props}
			>
				{children}
			</code>
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},

	pre: ({ className: preClassName, children, ...props }: ComponentProps<'pre'>) => {
		return (
			<pre
				className={`bk:mb-4 bk:rounded-lg bk:overflow-x-auto [&>code]:bk:block [&>code]:bk:p-4 ${
					preClassName || ''
				}`}
				{...props}
			>
				{children}
			</pre>
		);
	},

	blockquote: (props: ComponentProps<'blockquote'>) => (
		<blockquote
			className="bk:my-6 bk:border-l-4 bk:border-blue-500 bk:pl-4 bk:italic bk:text-gray-600 bk:dark:text-gray-400"
			{...props}
		/>
	),

	a: (props: ComponentProps<'a'>) => (
		<a
			className="bk:text-blue-600 bk:dark:text-blue-400 bk:underline bk:underline-offset-4 bk:hover:text-blue-800 bk:dark:hover:text-blue-300"
			{...props}
		/>
	),

	strong: (props: ComponentProps<'strong'>) => (
		<strong className="bk:font-semibold bk:text-gray-800 bk:dark:text-gray-200" {...props} />
	),

	em: (props: ComponentProps<'em'>) => (
		<em className="bk:italic bk:text-gray-800 bk:dark:text-gray-200" {...props} />
	),

	del: (props: ComponentProps<'del'>) => (
		<del className="bk:text-gray-500 bk:dark:text-gray-400" {...props} />
	),

	hr: (props: ComponentProps<'hr'>) => (
		<hr className="bk:my-9 bk:border-gray-200 bk:dark:border-neutral-900" {...props} />
	),

	br: (props: ComponentProps<'br'>) => <br {...props} />,

	img: (props: ComponentProps<'img'>) => (
		<img className="bk:my-6 bk:rounded-xl bk:max-w-full bk:h-auto" {...props} />
	),

	table: (props: ComponentProps<'table'>) => (
		<div className="bk:my-6 bk:overflow-x-auto">
			<table
				className="bk:w-full bk:border bk:border-gray-200 bk:dark:border-gray-700 bk:rounded-lg bk:overflow-hidden bk:text-sm"
				{...props}
			/>
		</div>
	),

	thead: (props: ComponentProps<'thead'>) => (
		<thead
			className="bk:bg-gray-50 bk:dark:bg-gray-800 bk:text-gray-700 bk:dark:text-gray-200"
			{...props}
		/>
	),

	tbody: (props: ComponentProps<'tbody'>) => <tbody {...props} />,

	tr: (props: ComponentProps<'tr'>) => (
		<tr
			className="bk:border-b bk:last:border-b-0 bk:border-gray-200 bk:dark:border-gray-700"
			{...props}
		/>
	),

	th: (props: ComponentProps<'th'>) => (
		<th className="bk:px-4 bk:py-3 bk:text-left bk:font-semibold" {...props} />
	),

	td: (props: ComponentProps<'td'>) => (
		<td className="bk:px-4 bk:py-3 bk:text-gray-700 bk:dark:text-gray-300" {...props} />
	),

	input: (props: ComponentProps<'input'>) => (
		<input type="checkbox" disabled className="bk:mr-2 bk:accent-blue-600" {...props} />
	),
};

export function BlogRenderer({
	content,
	metadata,
	className = '',
	components,
	showCategory = true,
	showReadingTime = true,
	showDate = true,
}: BlogRendererProps) {
	const mergedComponents = { ...defaultComponents, ...components };

	return (
		<>
			{(showCategory || showReadingTime || showDate) && (
				<div className="bk:flex bk:items-center bk:gap-3 bk:mb-4">
					{showCategory && metadata.categories?.length ? (
						<div className="bk:flex bk:items-center bk:gap-1.5 bk:flex-wrap">
							{metadata.categories.map((cat) => (
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
			)}

			<div className={`bk:prose bk:prose-slate bk:dark:prose-invert bk:max-w-none ${className}`}>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw, rehypePrismPlus, rehypeSlugCustomId]}
					components={mergedComponents}
				>
					{content}
				</ReactMarkdown>
			</div>
		</>
	);
}
