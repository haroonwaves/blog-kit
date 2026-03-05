import { PostCard, type PostCardProps } from './PostCard';
import type { PostMeta } from '../types';

export interface PostListProps {
	metadata: PostMeta[];
	basePath?: string;
	renderLink?: PostCardProps['renderLink'];
	className?: string;
	emptyMessage?: string;
	cardProps?: Omit<PostCardProps, 'metadata' | 'basePath' | 'renderLink'>;
}

export function PostList({
	metadata,
	basePath = '/post',
	renderLink,
	className = '',
	emptyMessage = 'No posts found.',
	cardProps,
}: PostListProps) {
	if (metadata.length === 0) {
		return (
			<div className={`text-center text-gray-500 dark:text-gray-400 py-12 ${className}`}>
				{emptyMessage}
			</div>
		);
	}

	return (
		<div className={`flex flex-col gap-6 ${className}`}>
			{metadata.map((meta) => (
				<PostCard
					key={meta.slug}
					metadata={meta}
					basePath={basePath}
					renderLink={renderLink}
					{...cardProps}
				/>
			))}
		</div>
	);
}
