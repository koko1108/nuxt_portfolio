<script setup lang="ts">
interface BlogPost {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  [key: string]: any;
}

const route = useRoute();
const { data: post } = await useAsyncData<BlogPost>(
  `content-${route.path}`,
  async () => {
    const result = await queryCollection("content").path(route.path).first();
    return result ?? {};
  }
);

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
});
</script>

<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-4xl font-bold mb-2">{{ post?.title }}</h1>
    <p class="mb-4 flex items-center">
      <Icon name="heroicons-outline:calendar-days" size="1.5rem" class="mr-2" />
      {{ post?.date }}
    </p>
    <p class="text-lg= mb-8">{{ post?.description }}</p>
    <hr class="border-gray-300 dark:border-gray-600 mb-8" />
    <div class="prose dark:prose-invert mb-8">
      <ContentRenderer :value="post ?? {}" />
    </div>

    <div v-if="post?.tags?.length" class="my-8">
      <a v-for="tag in post.tags" :key="tag" :href="`/blog/tag/${tag}`">
        <UBadge
          icon="i-heroicons-tag"
          color="info"
          variant="soft"
          class="text-base rounded-full px-4"
        >
          <span class="sr-only">Tag:</span>
          {{ tag }}
        </UBadge>
      </a>
    </div>
  </div>
</template>
