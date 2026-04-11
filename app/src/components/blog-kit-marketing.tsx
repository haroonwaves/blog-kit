'use client';

import { useState, useEffect } from 'react';

export function BlogKitMarketing() {
	const [isTeaserOpen, setIsTeaserOpen] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	useEffect(() => {
		// Start closed, open after 1.5s
		const openTimer = setTimeout(() => {
			setIsTeaserOpen(true);

			// Close after 3s of being open
			const closeTimer = setTimeout(() => {
				setIsTeaserOpen(false);
				// Delay the dimming until the slide-back transition (500ms) is done
				setTimeout(() => {
					setHasFinished(true);
				}, 600);
			}, 3000);

			return () => clearTimeout(closeTimer);
		}, 1500);

		return () => clearTimeout(openTimer);
	}, []);

	return (
		<div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-1000 fill-mode-both">
			<a
				href="https://blog-kit.haroonwaves.com/"
				target="_blank"
				rel="noopener noreferrer"
				className={`group flex items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-sm transition-all duration-500 ease-in-out ${
					isTeaserOpen ? 'pr-4' : 'hover:pr-4'
				} ${hasFinished ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
			>
				<div
					className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 dark:bg-zinc-50 shadow-sm transition-transform duration-500 ${
						isTeaserOpen ? 'rotate-360' : 'group-hover:rotate-360'
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-white dark:text-black"
					>
						<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
						<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
					</svg>
				</div>
				<div
					className={`overflow-hidden transition-all duration-500 ease-in-out ${
						isTeaserOpen
							? 'max-w-xs pl-2 opacity-100'
							: 'max-w-0 opacity-0 group-hover:max-w-xs group-hover:pl-2 group-hover:opacity-100'
					}`}
				>
					<span className="whitespace-nowrap text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
						Built with Blog-kit
					</span>
				</div>
			</a>
		</div>
	);
}
