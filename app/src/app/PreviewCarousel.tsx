'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const PREVIEWS = [
	{
		light: '/blog-list-white.png',
		dark: '/blog-list-black.png',
		alt: 'Blog List Preview',
		title: 'Themeable Content Feed',
		description: 'A flexible list view designed to match your unique brand and style.',
		href: 'https://haroonwaves.com/blog',
	},
	{
		light: '/blog-white.png',
		dark: '/blog-black.png',
		alt: 'Blog Post Preview',
		title: 'Tailored Article Logic',
		description: 'Beautiful layouts with total control over reading experience and typography.',
		href: 'https://haroonwaves.com/blog/event-loop-performance',
	},
];

export function PreviewCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % PREVIEWS.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	if (!mounted) return null;

	return (
		<div className="relative mx-auto animate-fade-in-up delay-400">
			{/* Theme Quick Toggle - Moved Outside to declutter */}
			<div className="mb-3 flex justify-center">
				<button
					onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
					className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95"
				>
					{resolvedTheme === 'dark' ? (
						<>
							<Sun className="h-3.5 w-3.5 text-yellow-500" />
							<span>Try Light Mode</span>
						</>
					) : (
						<>
							<Moon className="h-3.5 w-3.5 text-blue-500" />
							<span>Try Dark Mode</span>
						</>
					)}
				</button>
			</div>

			<div className="group relative">
				<div className="overflow-hidden rounded-2xl border border-border bg-muted/50 p-2 shadow-2xl relative">
					<div
						className="flex gap-10 transition-transform duration-700 ease-in-out"
						style={{
							transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 40}px))`,
						}}
					>
						{PREVIEWS.map((preview, index) => (
							<a
								key={index}
								href={preview.href}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full shrink-0 block transition-transform hover:scale-[1.01]"
							>
								<Image
									src={resolvedTheme === 'dark' ? preview.dark : preview.light}
									alt={preview.alt}
									width={1200}
									height={675}
									className="w-full h-auto shadow-sm m-px rounded-sm"
									priority={index === 0}
								/>
							</a>
						))}
					</div>

					{/* Overlay Info */}
					<div className="absolute inset-x-0 bottom-6 flex justify-center px-4 md:px-12 pointer-events-none">
						<div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md p-4 text-white shadow-2xl max-w-md w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-center">
							<div className="mb-2 flex justify-center">
								<span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90 border border-white/5">
									100% Customizable
								</span>
							</div>
							<h3 className="text-lg font-bold">{PREVIEWS[currentIndex].title}</h3>
							<p className="text-sm text-white/80">{PREVIEWS[currentIndex].description}</p>
						</div>
					</div>
				</div>

				{/* Indicators */}
				<div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
					{PREVIEWS.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`h-2.5 rounded-full transition-all duration-300 ${
								currentIndex === index
									? 'w-10 bg-primary'
									: 'w-2.5 bg-primary/20 hover:bg-primary/40'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
