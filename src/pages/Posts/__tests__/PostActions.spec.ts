import { shallowMount } from '@vue/test-utils';

import AppEmptyState from '@/components/ui/AppEmptyState.vue';
import Action from '@/pages/Posts/components/Action.vue';
import { useBlogPosts } from '@/pages/Posts/composables/useBlogPosts';
import PostActions from '@/pages/Posts/PostActions.vue';

jest.mock('@/pages/Posts/composables/useBlogPosts', () => ({
  useBlogPosts: jest.fn(() => ({
    logs: [
      { description: 'Log 1' },
      { description: 'Log 2' },
      { description: 'Log 3' },
    ],
    callRevert: jest.fn(),
  })),
}));

describe('PostActions', () => {
  it('renders the correct header', () => {
    const wrapper = shallowMount(PostActions);
    expect(wrapper.find('h2').text()).toBe('List of actions committed 3');
  });

  it('renders logs correctly', () => {
    const wrapper = shallowMount(PostActions);
    const actions = wrapper.findAllComponents(Action);
    expect(actions).toHaveLength(3);
    expect(actions[0].props().log.description).toBe('Log 1');
    expect(actions[1].props().log.description).toBe('Log 2');
    expect(actions[2].props().log.description).toBe('Log 3');
  });

  it('renders AppEmptyState when logs array is empty', async () => {
    (useBlogPosts as jest.Mock).mockReturnValueOnce({
      logs: [],
      revert: jest.fn(),
    });
    const wrapper = shallowMount(PostActions);
    expect(wrapper.findComponent(AppEmptyState).exists()).toBe(true);
  });
});
