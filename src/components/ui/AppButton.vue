<template>
  <button
    type="button"
    :class="[
      buttonStyle,
      buttonSize,
      disabled ? '!bg-gray-100' : '',
      'flex items-center justify-center',
    ]"
    :disabled="disabled"
  >
    <slot name="icon" class="-mr-0.5 h-5 w-5" aria-hidden="true"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'danger'
  | 'disabled';

type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

const props = withDefaults(
  defineProps<{ type?: ButtonType; size?: ButtonSize; disabled?: boolean }>(),
  { type: 'primary', size: 'xs', disabled: false }
);

const buttonSize = computed<string>(() => {
  switch (props.size) {
    case 'xs':
    default:
      return 'px-2 py-1 text-xs';
    case 's':
      return 'px-2 py-1 text-sm';
    case 'm':
      return 'px-2.5 py-1.5 text-sm';
    case 'l':
      return 'px-3 py-2 text-sm';
    case 'xl':
      return 'px-3.5 py-2.5 text-sm';
  }
});

const buttonStyle = computed<string>(() => {
  switch (props.type) {
    case 'secondary':
      return 'rounded-md bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
    case 'danger':
      return 'rounded-md bg-red-500 font-semibold text-white shadow-sm hover:bg-red-400';
    case 'warning':
      return 'rounded-md bg-yellow-500 font-semibold text-white shadow-sm hover:bg-yellow-400';
    case 'success':
      return 'rounded-md bg-green-800 font-semibold text-white shadow-sm hover:bg-green-700';
    case 'disabled':
      return 'rounded-md bg-gray-500 font-semibold text-white shadow-sm';
    case 'primary':
    default:
      return 'rounded-md bg-indigo-500 font-semibold text-white shadow-sm hover:bg-indigo-400';
  }
});
</script>

<style scoped></style>
