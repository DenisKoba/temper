import { get } from './index';

export type BlogPost = {
  userId?: string;
  id: string;
  title?: string;
  body?: string;
};

export const fetchBlogPosts = (): Promise<BlogPost[]> => {
  return get<BlogPost[]>('/posts', {}, 'https://jsonplaceholder.typicode.com');
};
