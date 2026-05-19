'use client';

import React from 'react';

export interface FilterProps {
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	selectedCategory: string | null;
	setSelectedCategory: (selectedCategory: string | null) => void;
	categories: string[];
	contentCount?: number;
	className?: string;
	placeholder?: string;
	classNames?: {
		input?: string;
		categoryContainer?: string;
		pill?: string;
		activePill?: string;
		inactivePill?: string;
		contentCount?: string;
	};
}

export function Filter({
	searchTerm,
	setSearchTerm,
	selectedCategory,
	setSelectedCategory,
	categories,
	contentCount,
	className = '',
	placeholder = 'Search content...',
	classNames = {},
}: FilterProps) {
	// Consolidate styles to avoid JSX bloat and repetition
	const pillBase = `bk:px-2.5 bk:py-1 bk:cursor-pointer bk:rounded-md bk:text-xs bk:font-medium bk:transition-colors ${classNames.pill ?? ''}`;
	const pillActive = `bk:bg-neutral-800 bk:hover:bg-neutral-900 bk:dark:bg-[oklch(0.922_0_0)] bk:dark:hover:bg-[oklch(0.85_0_0)] bk:text-white bk:dark:text-[oklch(0.205_0_0)] ${classNames.activePill ?? ''}`;
	const pillInactive = `bk:bg-neutral-100 bk:dark:bg-[oklch(0.269_0_0)] bk:text-neutral-500 bk:dark:text-neutral-300 bk:hover:bg-neutral-200 bk:dark:hover:bg-[oklch(0.32_0_0)] ${classNames.inactivePill ?? ''}`;

	return (
		<div className={`bk:flex bk:flex-col bk:gap-4 bk:mb-6 ${className}`}>
			<div className="bk:flex bk:flex-col bk:sm:flex-row bk:gap-3">
				{/* Search input */}
				<div className="bk:relative bk:flex-1">
					<svg
						className="bk:absolute bk:left-3 bk:top-1/2 bk:-translate-y-1/2 bk:w-3.5 bk:h-3.5 bk:text-neutral-400 bk:pointer-events-none"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
						/>
					</svg>
					<input
						id="content-search"
						type="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={placeholder}
						className={`bk:w-full bk:pl-8 bk:pr-4 bk:py-2 bk:rounded-md bk:border bk:border-neutral-200 bk:hover:border-neutral-300 bk:dark:border-[oklch(1_0_0/0.1)] bk:dark:hover:border-[oklch(1_0_0/0.15)] bk:bg-white bk:dark:bg-[oklch(0.205_0_0)] bk:text-sm bk:text-neutral-700 bk:dark:text-neutral-200 bk:placeholder-neutral-400 bk:focus:outline-none bk:focus:border-neutral-400 bk:dark:focus:border-[oklch(1_0_0/0.3)] bk:transition-colors ${classNames.input ?? ''}`}
					/>
				</div>

				{/* Category pills */}
				{categories.length > 0 && (
					<div
						className={`bk:flex bk:flex-wrap bk:gap-2 bk:items-center ${classNames.categoryContainer ?? ''}`}
					>
						<button
							onClick={() => setSelectedCategory(null)}
							className={`${pillBase} ${selectedCategory === null ? pillActive : pillInactive}`}
						>
							All
						</button>
						{categories.slice(0, 3).map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`${pillBase} ${selectedCategory === cat ? pillActive : pillInactive}`}
							>
								{cat}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Content Count */}
			{contentCount !== undefined && (
				<p
					className={`bk:text-[10px] bk:uppercase bk:tracking-wider bk:text-neutral-400 bk:dark:text-neutral-500 ${classNames.contentCount ?? ''}`}
				>
					{contentCount} {contentCount === 1 ? 'item' : 'items'} found
				</p>
			)}
		</div>
	);
}
