import { getAllContentMeta, getContent } from '@haroonwaves/blog-kit-core';
import { ContentRenderer } from '@haroonwaves/blog-kit-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
	const allContentMeta = getAllContentMeta({
		contentDirectory: './content',
		contentSubdirectory: 'docs',
	});
	return allContentMeta.map((meta) => ({ slug: meta.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const doc = getContent(slug, {
		contentDirectory: './content',
		contentSubdirectory: 'docs',
	});

	if (!doc) {
		return {
			title: 'Documentation Not Found',
			description: 'The requested documentation page could not be found.',
		};
	}

	const baseKeywords = [
		'blog kit documentation',
		'build a blog',
		'markdown blog',
		'blog tutorial',
		'create blog',
		'blog framework',
		'TypeScript blog',
	];

	return {
		title: `${doc.metadata.title} - Blog Kit Documentation`,
		description:
			doc.metadata.description ||
			`Learn how to ${doc.metadata.title.toLowerCase()} with Blog Kit. Complete guide for building your own site with markdown and TypeScript.`,
		keywords: [...baseKeywords, doc.metadata.title.toLowerCase()],
		openGraph: {
			title: `${doc.metadata.title} - Blog Kit Documentation`,
			description:
				doc.metadata.description ||
				`Learn how to ${doc.metadata.title.toLowerCase()} with Blog Kit.`,
			type: 'article',
			publishedTime: doc.metadata.date,
			url: `https://blog-kit.haroonwaves.com/docs/${slug}`,
			siteName: 'Blog Kit',
		},
		twitter: {
			card: 'summary',
			title: `${doc.metadata.title} - Blog Kit`,
			description:
				doc.metadata.description ||
				`Learn how to ${doc.metadata.title.toLowerCase()} with Blog Kit.`,
		},
		alternates: {
			canonical: `https://blog-kit.haroonwaves.com/docs/${slug}`,
		},
	};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const doc = getContent(slug, {
		contentDirectory: './content',
		contentSubdirectory: 'docs',
	});

	if (!doc) notFound();

	return (
		<article className="space-y-8">
			<ContentRenderer
				body={doc.body}
				metadata={doc.metadata}
				showDate={false}
				showReadingTime={false}
				showCategory={false}
			/>
		</article>
	);
}
