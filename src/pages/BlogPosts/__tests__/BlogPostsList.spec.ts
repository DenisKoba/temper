import { mount } from '@vue/test-utils';

import AppLoader from '@/components/ui/AppLoader.vue';
import PostList from '@/pages/BlogPosts/BlogPostsList.vue';
import PostSingle from '@/pages/BlogPosts/components/Post.vue';
import { useBlogPosts } from '@/pages/BlogPosts/composables/useBlogPosts';

jest.mock('@/pages/BlogPosts/composables/useBlogPosts', () => ({
  useBlogPosts: jest.fn(() => ({
    posts: {
      value: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' },
        { id: 4, title: 'Post 4' },
        { id: 5, title: 'Post 5' },
      ],
    },
    moveUp: jest.fn(),
    moveDown: jest.fn(),
  })),
}));

describe('PostList', () => {
  it('renders the correct header', () => {
    const wrapper = mount(PostList);
    expect(wrapper.find('h2').text()).toBe('Sortable Post List');
  });

  it('renders posts correctly', () => {
    const wrapper = mount(PostList);
    const posts = wrapper.findAllComponents(PostSingle);
    expect(posts).toHaveLength(5);
    expect(posts[0].props().post.title).toBe('Post 1');
    expect(posts[1].props().post.title).toBe('Post 2');
    expect(posts[2].props().post.title).toBe('Post 3');
    expect(posts[3].props().post.title).toBe('Post 4');
    expect(posts[4].props().post.title).toBe('Post 5');
  });

  it('renders AppLoader when posts array is empty', async () => {
    (useBlogPosts as jest.Mock).mockReturnValueOnce({
      posts: { value: [] },
      moveUp: jest.fn(),
      moveDown: jest.fn(),
    });
    const wrapper = mount(PostList);
    expect(wrapper.findComponent(AppLoader).exists()).toBe(true);
  });
});
