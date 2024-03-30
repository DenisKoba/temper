<template>
  <div
    :class="[
      'actions min-w-[100vw] md:min-w-[366px] flex flex-col overflow-scroll rounded-sm shadow z-10 md:h-fit bg-gray-100 lg:max-h-[90vh] transition-all',
      { 'actions-expanded': isExpanded },
    ]"
  >
    <h2
      class="text-md text-indigo-500 md:text-gray-600 bg-white p-4 lg:p-3 border-b sm:border-none flex items-center justify-between font-bold md:font-normal z-20"
      @click="toggleActions"
    >
      List of actions committed
      <span class="md:hidden flex gap-0.5">
        <span
          v-if="logs.length"
          class="px-2.5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs"
          >{{ logs.length }}</span
        >
        <ChevronDoubleUpIcon v-if="!isExpanded" class="w-6" />
        <ChevronDoubleDownIcon v-else class="w-6" />
      </span>
    </h2>
    <div
      v-if="logs.length"
      class="pb-0 sm:m-5 lg:rounded-md overflow-scroll bg-gray-100 h-full lg:shadow relative z-10"
    >
      <TransitionGroup name="fade">
        <Action
          v-for="(log, index) in logs"
          :key="index"
          :log="log"
          @revert="revert"
        />
      </TransitionGroup>
    </div>
    <AppEmptyState v-else class="p-5 bg-gray-100 h-full relative z-10">
      Post actions are empty
    </AppEmptyState>
    <div
      v-if="isExpanded"
      class="fixed bg-black w-full h-full left-0 top-0 opacity-70 z-0 transition-all"
      @click="collapse"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/vue/20/solid';
import { ref } from 'vue';

import AppEmptyState from '@/components/ui/AppEmptyState.vue';
import Action from '@/pages/BlogPosts/components/Action.vue';
import { useBlogPosts } from '@/pages/BlogPosts/composables/useBlogPosts';

const isExpanded = ref(false);

const { logs, revert } = useBlogPosts();

const toggleActions = (): boolean => (isExpanded.value = !isExpanded.value);
const collapse = (): boolean => (isExpanded.value = false);
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.actions {
  bottom: calc(-40vh + 57px);
}

.actions-expanded {
  bottom: 0;
}

@media screen and (min-width: 760px) {
  .actions {
    bottom: 0;
  }
}
</style>
