<template>
  <div
    class="px-2 sm:px-10 relative w-full sm:min-w-[420px] flex flex-col items-center max-h-[90vh] h-fit overflow-hidden"
  >
    <h2 class="py-3 text-xl sticky top-0 text-white self-start">
      Sortable Post List
    </h2>
    <TransitionGroup
      v-if="shortPostsList.length"
      name="fade"
      class="overflow-scroll w-full"
      tag="div"
    >
      <PostSingle
        v-for="(post, index) in shortPostsList"
        :key="post.id"
        class="item"
        :post="post"
        :index="index"
        :list-length="shortPostsList.length"
        @moveUp="moveUp"
        @moveDown="moveDown"
      />
    </TransitionGroup>
    <AppLoader v-else class="w-10 py-10" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppLoader from '@/components/ui/AppLoader.vue';
import { BlogPost } from '@/core/api/fetchBlogPosts';
import PostSingle from '@/pages/BlogPosts/components/Post.vue';
import { useBlogPosts } from '@/pages/BlogPosts/composables/useBlogPosts';

const { posts, moveUp, moveDown } = useBlogPosts();

const shortPostsList = computed<BlogPost[]>(
  () => posts.value.slice(0, 5) ?? []
);
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
