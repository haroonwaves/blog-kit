import React from 'react';

export interface ContentLayoutProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * A full-screen page wrapper that applies the standard light and dark mode backgrounds.
 */
export function ContentLayout({ children, className = '' }: ContentLayoutProps) {
	return (
		<div
			className={`bk:min-h-screen bk:bg-gray-50 bk:dark:bg-[oklch(0.205_0_0)] bk:transition-colors bk:duration-200 ${className}`}
		>
			{children}
		</div>
	);
}
