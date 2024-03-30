<template>
  <div
    class="flex justify-between gap-x-10 p-2 rounded-md bg-white shadow-sm mb-4 items-center min-h-[68px]"
  >
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-500">
          Post {{ post.id }}
        </p>
      </div>
    </div>
    <div class="shrink-0 flex flex-col items-end gap-1">
      <ChevronUpIcon
        v-if="index > 0"
        class="w-6 h-6 lg:w-5 lg:h-5 cursor-pointer text-indigo-500 hover:opacity-[0.4]"
        @click="$emit('moveUp', index)"
      />
      <ChevronDownIcon
        v-if="index < listLength - 1"
        class="w-6 h-6 lg:w-5 lg:h-5 cursor-pointer text-indigo-500 hover:opacity-[0.4]"
        @click="$emit('moveDown', index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

import { Post } from '@/core/api/fetchBlogPosts';

defineProps<{
  post: Post;
  listLength: number;
  index: number;
}>();

defineEmits<{
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}>();
</script>

<style scoped></style>
