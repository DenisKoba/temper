import { shallowMount } from '@vue/test-utils';

import Action from '@/pages/Posts/components/Action.vue';

jest.mock('@/components/ui/AppButton.vue', () => ({
  name: 'AppButton',
  template: '<app-button-stub>Time travel</app-button-stub>',
}));

describe('Action', () => {
  it('renders log description correctly', () => {
    const log = { description: 'Test description' };
    const wrapper = shallowMount(Action, {
      props: {
        log: log,
      },
    });

    expect(wrapper.find('p').text()).toBe('Test description');
  });

  it('emits revert event with correct log data when time travel button is clicked', async () => {
    const log = { description: 'Test description' };
    const wrapper = shallowMount(Action, {
      props: {
        log: log,
      },
    });

    await wrapper.find('app-button-stub').trigger('click');
    expect(wrapper.emitted().revert).toBeTruthy();
    expect(wrapper.emitted().revert[0]).toEqual([log]);
  });

  it('does not emit revert event when time travel button is not clicked', () => {
    const log = { description: 'Test description' };
    const wrapper = shallowMount(Action, {
      props: {
        log: log,
      },
    });
    expect(wrapper.emitted().revert).toBeUndefined();
  });

  it('emits a custom event when button is clicked', async () => {
    const log = { description: 'Test description' };
    const wrapper = shallowMount(Action, {
      props: {
        log: log,
      },
    });
    await wrapper.find('app-button-stub').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('revert');
  });
});
