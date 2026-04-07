'use client';

import React from 'react';

export interface FilterProps {
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	selectedCategory: string | null;
	setSelectedCategory: (selectedCategory: string | null) => void;
	categories: string[];
	className?: string;
	placeholder?: string;
	classNames?: {
		input?: string;
		categoryContainer?: string;
		pill?: string;
		activePill?: string;
		inactivePill?: string;
	};
}

export function Filter({
	searchTerm,
	setSearchTerm,
	selectedCategory,
	setSelectedCategory,
	categories,
	className = '',
	placeholder = 'Search blogs...',
	classNames = {},
}: FilterProps) {
	// Consolidate styles to avoid JSX bloat and repetition
	const pillBase = `bk:px-2.5 bk:py-1 bk:cursor-pointer bk:rounded-md bk:text-xs bk:font-medium bk:transition-colors ${classNames.pill ?? ''}`;
	const pillActive = `bk:bg-gray-700 bk:dark:bg-gray-200 bk:text-white bk:dark:text-gray-800 ${classNames.activePill ?? ''}`;
	const pillInactive = `bk:bg-gray-100 bk:dark:bg-gray-700 bk:text-gray-500 bk:dark:text-gray-300 bk:hover:bg-gray-200 bk:dark:hover:bg-gray-600 ${classNames.inactivePill ?? ''}`;

	return (
		<div className={`bk:flex bk:flex-col bk:sm:flex-row bk:gap-3 bk:mb-6 ${className}`}>
			{/* Search input */}
			<div className="bk:relative bk:flex-1">
				<svg
					className="bk:absolute bk:left-3 bk:top-1/2 bk:-translate-y-1/2 bk:w-3.5 bk:h-3.5 bk:text-gray-400 bk:pointer-events-none"
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
					id="blog-search"
					type="search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder={placeholder}
					className={`bk:w-full bk:pl-8 bk:pr-4 bk:py-2 bk:rounded-md bk:border bk:border-gray-200 bk:dark:border-gray-700 bk:bg-white bk:dark:bg-gray-800 bk:text-sm bk:text-gray-700 bk:dark:text-gray-200 bk:placeholder-gray-400 bk:focus:outline-none bk:focus:border-gray-400 bk:dark:focus:border-gray-500 bk:transition-colors ${classNames.input ?? ''}`}
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
	);
}
