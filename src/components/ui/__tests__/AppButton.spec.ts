import { mount } from '@vue/test-utils';

import AppButton from '@/components/ui/AppButton.vue';

describe('AppButton', () => {
  it('renders a button with default type and size', () => {
    const wrapper = mount(AppButton);
    expect(wrapper.find('button').attributes('type')).toBe('button');
    expect(wrapper.find('button').classes()).toContain('px-2');
  });

  it('renders a button with specified type and size', () => {
    const wrapper = mount(AppButton, {
      props: {
        type: 'success',
        size: 'xl',
      },
    });
    expect(wrapper.find('button').classes()).toContain('px-3.5');
    expect(wrapper.find('button').classes()).toContain('bg-green-800');
  });

  it('renders button with icon slot', () => {
    const wrapper = mount(AppButton, {
      slots: {
        icon: '<svg class="-mr-0.5 h-5 w-5" aria-hidden="true"></svg>',
      },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders button with content slot', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.text()).toContain('Click me');
  });
});
