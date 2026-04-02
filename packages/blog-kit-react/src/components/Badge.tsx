type BadgeProps = {
	children: string;
	className?: string;
};

// Color palette with distinct, visually appealing colors
const colorVariants = [
	'bk:bg-blue-100 bk:dark:bg-blue-900/30 bk:text-blue-500 bk:dark:text-blue-300',
	'bk:bg-orange-100 bk:dark:bg-orange-900/30 bk:text-orange-500 bk:dark:text-orange-300',
	'bk:bg-emerald-100 bk:dark:bg-emerald-900/30 bk:text-emerald-500 bk:dark:text-emerald-300',
	'bk:bg-violet-100 bk:dark:bg-violet-900/30 bk:text-violet-500 bk:dark:text-violet-300',
	'bk:bg-amber-100 bk:dark:bg-amber-900/30 bk:text-amber-500 bk:dark:text-amber-300',
	'bk:bg-rose-100 bk:dark:bg-rose-900/30 bk:text-rose-500 bk:dark:text-rose-300',
	'bk:bg-cyan-100 bk:dark:bg-cyan-900/30 bk:text-cyan-500 bk:dark:text-cyan-300',
	'bk:bg-fuchsia-100 bk:dark:bg-fuchsia-900/30 bk:text-fuchsia-500 bk:dark:text-fuchsia-300',
	'bk:bg-teal-100 bk:dark:bg-teal-900/30 bk:text-teal-500 bk:dark:text-teal-300',
];

// djb2-style hash for consistent, well-distributed color per tag
function getColorIndex(text: string): number {
	let hash = 5381;
	for (let i = 0; i < text.length; i++) {
		hash = (hash * 33) ^ text.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash) % colorVariants.length;
}

export function Badge({ children, className }: BadgeProps) {
	const colorClass = colorVariants[getColorIndex(children)];

	return (
		<span
			className={`bk:inline-flex bk:items-center bk:rounded-full bk:border bk:border-transparent bk:px-2.5 bk:py-0.5 bk:text-xs bk:font-semibold bk:shrink-0 ${colorClass} ${className ?? ''}`}
		>
			{children}
		</span>
	);
}
