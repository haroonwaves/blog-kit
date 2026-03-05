import { getAllBlogsMeta as getAllPostsMeta, getBlog as getPost } from '@haroonwaves/blog-kit-core';
import { BlogRenderer as PostRenderer } from '@haroonwaves/blog-kit-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
	const postsMeta = getAllPostsMeta({
		contentDirectory: './content',
		blogSubdirectory: 'docs',
	});
	return postsMeta.map((meta) => ({ slug: meta.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const post = getPost(slug, {
		contentDirectory: './content',
		blogSubdirectory: 'docs',
	});

	if (!post) {
		return {
			title: 'Documentation Not Found',
			description: 'The requested documentation page could not be found.',
		};
	}

	const baseKeywords = [
		'Blog Kit documentation',
		'build a post',
		'markdown post',
		'post tutorial',
		'create post',
		'post framework',
		'TypeScript post',
	];

	return {
		title: `${post.metadata.title} - Blog Kit Documentation`,
		description:
			post.metadata.description ||
			`Learn how to ${post.metadata.title.toLowerCase()} with Blog Kit. Complete guide for building your own post with markdown and TypeScript.`,
		keywords: [...baseKeywords, post.metadata.title.toLowerCase()],
		openGraph: {
			title: `${post.metadata.title} - Blog Kit Documentation`,
			description:
				post.metadata.description ||
				`Learn how to ${post.metadata.title.toLowerCase()} with Blog Kit.`,
			type: 'article',
			publishedTime: post.metadata.date,
			url: `https://blog-kit.haroonwaves.com/docs/${slug}`,
			siteName: 'Blog Kit',
		},
		twitter: {
			card: 'summary',
			title: `${post.metadata.title} - Blog Kit`,
			description:
				post.metadata.description ||
				`Learn how to ${post.metadata.title.toLowerCase()} with Blog Kit.`,
		},
		alternates: {
			canonical: `https://blog-kit.haroonwaves.com/docs/${slug}`,
		},
	};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const post = getPost(slug, {
		contentDirectory: './content',
		blogSubdirectory: 'docs',
	});

	if (!post) notFound();

	return (
		<article className="space-y-8">
			<PostRenderer
				content={post.content}
				metadata={post.metadata}
				showDate={false}
				showReadingTime={false}
				showCategory={false}
			/>
		</article>
	);
}
