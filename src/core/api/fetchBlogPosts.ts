import { get } from './index';

export type Post = {
  userId?: string;
  id: string;
  title?: string;
  body?: string;
};

export const fetchBlogPosts = (): Promise<Post[]> => {
  return get<Post[]>('/posts', {}, 'https://jsonplaceholder.typicode.com');
};
