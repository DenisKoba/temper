<template>
  <div
    class="action flex justify-between items-center gap-x-6 p-5 bg-white border-b border-gray-100 overflow-scroll"
  >
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-xs text-gray-600">
          {{ log.description }}
        </p>
      </div>
    </div>
    <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
      <AppButton type="success" @click="$emit('revert', log)"
        >Time travel</AppButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { ActionLog } from '@/pages/Posts/composables/useBlogPosts';

defineProps<{
  log: ActionLog;
}>();

defineEmits<{
  revert: (log: ActionLog) => void;
}>();
</script>

<style scoped></style>
