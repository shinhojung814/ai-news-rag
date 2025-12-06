type News = {
  url: string;
  title: string;
  press: string;
  category?: string;
  publishedAt?: string;
  thumbnail?: string | null;
};

type NewsDetail = {
  url: string;
  title: string;
  press: string;
  content: string;
  publishedAt?: string;
  thumbnail?: string | null;
};

export type { News, NewsDetail };
