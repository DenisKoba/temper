<template>
  <div class="posts w-full relative overflow-hidden bg-gray-100 h-[100vh]">
    <div
      class="bg-indigo-500 w-[200%] left-[-50%] top-[-20%] lg:top-[-40%] right-0 m-auto h-[400px] absolute -rotate-12 z-0"
    ></div>
    <div
      class="flex flex-col md:flex-row w-full md:w-fit mx-auto mt-2 sm:mt-10"
    >
      <PostList class="h-[60vh] sm:h-fit" />
      <PostActions class="h-[40vh] fixed md:relative" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogPosts } from '@/pages/Posts/composables/useBlogPosts';
import PostActions from '@/pages/Posts/PostActions.vue';
import PostList from '@/pages/Posts/PostList.vue';

const { init } = useBlogPosts();

init();
</script>
