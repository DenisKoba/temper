import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';
import { shallowMount } from '@vue/test-utils';

import Post from '../Post.vue';

jest.mock('@heroicons/vue/20/solid', () => ({
  ChevronDownIcon: {
    name: 'ChevronDownIcon',
    template: '<shevron-down></shevron-down>',
  },
  ChevronUpIcon: {
    name: 'ChevronUpIcon',
    template: '<shevron-up></shevron-up>',
  },
}));

describe('Post', () => {
  it('renders post ID correctly', () => {
    const post = { id: 1 };
    const wrapper = shallowMount(Post, {
      props: {
        post: post,
        listLength: 5,
        index: 0,
      },
    });

    expect(wrapper.find('p').text()).toBe('Post 1');
  });

  it('emits moveUp event with correct index when ChevronUpIcon is clicked', async () => {
    const post = { id: 1 };
    const wrapper = shallowMount(Post, {
      props: {
        post: post,
        listLength: 5,
        index: 1,
      },
    });
    await wrapper.findComponent(ChevronUpIcon).trigger('click');
    expect(wrapper.emitted().moveUp).toBeTruthy();
    expect(wrapper.emitted().moveUp[0]).toStrictEqual([1]);
  });

  it('emits moveDown event with correct index when ChevronDownIcon is clicked', async () => {
    const post = { id: 1 };
    const wrapper = shallowMount(Post, {
      props: {
        post: post,
        listLength: 5,
        index: 1,
      },
    });
    await wrapper.findComponent(ChevronDownIcon).trigger('click');
    expect(wrapper.emitted().moveDown).toBeTruthy();
    expect(wrapper.emitted().moveDown[0]).toStrictEqual([1]);
  });

  it('does not render ChevronUpIcon when index is 0', () => {
    const post = { id: 1 };
    const wrapper = shallowMount(Post, {
      props: {
        post: post,
        listLength: 5,
        index: 0,
      },
    });
    expect(wrapper.findComponent(ChevronUpIcon).exists()).toBe(false);
  });

  it('does not render ChevronDownIcon when index is at the last position', () => {
    const post = { id: 1 };
    const wrapper = shallowMount(Post, {
      props: {
        post: post,
        listLength: 5,
        index: 4,
      },
    });
    expect(wrapper.findComponent(ChevronDownIcon).exists()).toBe(false);
  });

  it('renders both ChevronUpIcon and ChevronDownIcon when index is neither 0 nor at the last position', () => {
    const post = { id: 1 };
    const wrapper = shallowMount(Post, {
      props: {
        post: post,
        listLength: 5,
        index: 2,
      },
    });
    expect(wrapper.findComponent(ChevronUpIcon).exists()).toBe(true);
    expect(wrapper.findComponent(ChevronDownIcon).exists()).toBe(true);
  });
});
