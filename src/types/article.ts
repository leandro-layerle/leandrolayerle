export type ArticleMetadata = {
  title: string;
  slug: string;
  excerpt: string;

  category: string;
  tags: string[];

  date: string;
  readingTime: string;

  image: string | null;

  repository?: string;

  series?: string;
  seriesOrder?: number;

  published: boolean;
};