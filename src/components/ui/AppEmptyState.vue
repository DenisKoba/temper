<template>
  <div class="w-full flex items-center justify-center">
    <div class="flex flex-col items-center">
      <FolderMinusIcon class="text-gray-300 stroke-1 w-10" />
      <h3 class="mt-2 text-sm font-normal text-gray-500">
        <slot></slot>
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FolderMinusIcon } from '@heroicons/vue/24/outline';
</script>
