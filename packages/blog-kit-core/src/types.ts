export interface PostMeta {
	title: string;
	description: string;
	date: string;
	categories?: string[];
	slug: string;
	readingTime: string;
}

export interface Post {
	metadata: PostMeta;
	content: string;
}

export interface PostConfig {
	contentDirectory: string;
	postSubdirectory?: string; // defaults to 'post'
}
