import { fetchBlogPosts } from '../fetchBlogPosts';
import { get } from '../index';

jest.mock('../index', () => ({
  get: jest.fn(),
}));

describe('fetchBlogPost function', () => {
  it('should call get with correct arguments', async () => {
    await fetchBlogPosts();
    expect(get).toHaveBeenCalledWith(
      '/posts',
      {},
      'https://jsonplaceholder.typicode.com'
    );
  });

  it('should return data from get function', async () => {
    const mockPosts = [
      {
        userId: '1',
        id: '1',
        title: 'title',
        body: 'body',
      },
    ];
    (get as jest.Mock).mockResolvedValueOnce(mockPosts);
    const widgets = await fetchBlogPosts();
    expect(widgets).toEqual(mockPosts);
  });

  it('should throw an error if get function rejects', async () => {
    const errorMessage = 'Failed to fetch widgets';
    (get as jest.Mock).mockRejectedValueOnce(errorMessage);
    await expect(fetchBlogPosts()).rejects.toEqual(errorMessage);
  });
});
