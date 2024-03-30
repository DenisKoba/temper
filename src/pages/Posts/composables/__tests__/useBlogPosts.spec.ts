import { fetchBlogPosts, Post } from '@/core/api/fetchBlogPosts';
import { useBlogPosts } from '@/pages/Posts/composables/useBlogPosts';

jest.mock('@/core/api/fetchBlogPosts', () => ({
  fetchBlogPosts: jest.fn(() => Promise.resolve([])),
}));

describe('useBlogPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes posts correctly on init', async () => {
    const postsData: Post[] = [{ id: '1', title: 'Post 1' }];
    (fetchBlogPosts as jest.Mock).mockResolvedValueOnce(postsData);

    const { posts, init } = useBlogPosts();
    await init();

    expect(posts.value).toEqual(postsData);
  });

  it('moves a post up', () => {
    const postsData: Post[] = [
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ];
    const { posts, moveUp } = useBlogPosts();
    posts.value = postsData;

    moveUp(1);

    expect(posts.value).toEqual([
      { id: '2', title: 'Post 2' },
      { id: '1', title: 'Post 1' },
    ]);
  });

  it('moves a post down', () => {
    const postsData: Post[] = [
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ];
    const { posts, moveDown } = useBlogPosts();
    posts.value = postsData;

    moveDown(0);

    expect(posts.value).toEqual([
      { id: '2', title: 'Post 2' },
      { id: '1', title: 'Post 1' },
    ]);
  });

  it('reverts a log', () => {
    const logsData = [
      {
        postId: '3',
        prevIndex: 1,
        description: 'Moved 3 from index 1 to index 0',
      },
      {
        postId: '4',
        prevIndex: 3,
        description: 'Moved 4 from index 3 to index 4',
      },
      {
        postId: '2',
        prevIndex: 1,
        description: 'Moved 2 from index 1 to index 2',
      },
    ];
    const postsData: Post[] = [
      {
        userId: '1',
        id: '3',
      },
      {
        userId: '1',
        id: '1',
      },
      {
        userId: '1',
        id: '2',
      },
      {
        userId: '1',
        id: '5',
      },
      {
        userId: '1',
        id: '4',
      },
    ];
    const { posts, logs, revert } = useBlogPosts();
    posts.value = postsData;
    logs.value = logsData;

    revert(logsData[1]);

    expect(posts.value).toEqual([
      {
        userId: '1',
        id: '1',
      },
      {
        userId: '1',
        id: '3',
      },
      {
        userId: '1',
        id: '2',
      },
      {
        userId: '1',
        id: '4',
      },
      {
        userId: '1',
        id: '5',
      },
    ]);
  });
});
