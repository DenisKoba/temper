import { FolderMinusIcon } from '@heroicons/vue/24/outline';
import { mount } from '@vue/test-utils';

import AppEmptyState from '@/components/ui/AppEmptyState.vue';

describe('AppEmptyState', () => {
  it('renders folder icon and slot content', () => {
    const wrapper = mount(AppEmptyState, {
      slots: {
        default: 'Folder Name',
      },
    });

    expect(wrapper.findComponent(FolderMinusIcon).exists()).toBe(true);
    expect(wrapper.text()).toContain('Folder Name');
  });

  it('renders slot content properly', () => {
    const wrapper = mount(AppEmptyState, {
      slots: {
        default: '<span>Custom Folder</span>',
      },
    });

    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.text()).toContain('Custom Folder');
  });
});
