export interface ContentMeta {
	title: string;
	description: string;
	date: string;
	categories?: string[];
	slug: string;
	readingTime: string;
}

export interface Content {
	metadata: ContentMeta;
	body: string;
}

export interface ContentConfig {
	contentDirectory: string;
	contentSubdirectory?: string; // defaults to 'blog'
}
