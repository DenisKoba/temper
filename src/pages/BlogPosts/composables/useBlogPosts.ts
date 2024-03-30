import { ref } from 'vue';

import { fetchBlogPosts, BlogPost } from '@/core/api/fetchBlogPosts';

export type ActionLog = {
  prevIndex: number;
  postId: string;
  description: string;
};

const posts = ref<BlogPost[]>([]);
const logs = ref<ActionLog[]>([]);

export const useBlogPosts = () => {
  const moveUp = (index: number) => {
    if (index === 0) return;
    const post = posts.value[index];
    posts.value.splice(index, 1);
    posts.value.splice(index - 1, 0, post);
    logs.value.unshift({
      postId: post.id,
      prevIndex: index,
      description: `Moved ${post.id} from index ${index} to index ${index - 1}`,
    });
  };

  const moveDown = (index: number) => {
    if (index === posts.value.length - 1) return;
    const post = posts.value[index];
    posts.value.splice(index, 1);
    posts.value.splice(index + 1, 0, post);
    logs.value.unshift({
      postId: post.id,
      prevIndex: index,
      description: `Moved ${post.id} from index ${index} to index ${index + 1}`,
    });
  };

  const revert = (log: ActionLog) => {
    const logIndex = logs.value.indexOf(log);
    const slice = logs.value.slice(0, logIndex + 1);

    logs.value.splice(0, logIndex + 1);

    slice.forEach((item) => {
      const post = posts.value.find((p) => p.id === item.postId);
      if (!post) return;
      const postIndex = posts.value.indexOf(post);
      posts.value.splice(postIndex, 1);
      posts.value.splice(item.prevIndex, 0, post);
    });
  };

  const init = async () => {
    posts.value = await fetchBlogPosts();
  };

  return {
    posts,
    logs,
    moveUp,
    moveDown,
    revert,
    init,
  };
};
