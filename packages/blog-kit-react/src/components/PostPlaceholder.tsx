export interface PostPlaceholderProps {
	count?: number;
	className?: string;
}

export function PostPlaceholder({ count = 3, className = '' }: PostPlaceholderProps) {
	return (
		<div className={`${className}`}>
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
				>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
					<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
				</div>
			))}
		</div>
	);
}
