type BadgeProps = {
	children: string;
	className?: string;
};

// Color palette with distinct, visually appealing colors
const colorVariants = [
	'bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300',
	'bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-300',
	'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-300',
	'bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-300',
	'bg-amber-100 dark:bg-amber-900/30 text-amber-500 dark:text-amber-300',
	'bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-300',
	'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-300',
	'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-500 dark:text-fuchsia-300',
	'bg-teal-100 dark:bg-teal-900/30 text-teal-500 dark:text-teal-300',
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
			className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold shrink-0 ${colorClass} ${className ?? ''}`}
		>
			{children}
		</span>
	);
}
