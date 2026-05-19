export interface ContentPlaceholderProps {
	count?: number;
	className?: string;
}

export function ContentPlaceholder({ count = 3, className = '' }: ContentPlaceholderProps) {
	return (
		<div className={`${className}`}>
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="bk:bg-white bk:dark:bg-[oklch(0.205_0_0)] bk:rounded-lg bk:border bk:border-neutral-200 bk:dark:border-[oklch(1_0_0/0.1)] bk:p-6 bk:animate-pulse"
				>
					<div className="bk:h-4 bk:bg-neutral-200 bk:dark:bg-[oklch(0.269_0_0)] bk:rounded bk:mb-3"></div>
					<div className="bk:h-6 bk:bg-neutral-200 bk:dark:bg-[oklch(0.269_0_0)] bk:rounded bk:mb-2"></div>
					<div className="bk:h-4 bk:bg-neutral-200 bk:dark:bg-[oklch(0.269_0_0)] bk:rounded bk:w-3/4"></div>
				</div>
			))}
		</div>
	);
}
