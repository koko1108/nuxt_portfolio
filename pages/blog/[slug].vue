<script setup lang="ts">
interface BlogPost {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  [key: string]: any;
}

const route = useRoute();
const slug = route.params.slug;

const { data: post } = await useAsyncData<BlogPost>(
  `blog-${slug}`,
  async () => {
    const result = await queryCollection("content")
      .path(`/blog/${slug}`)
      .first();
    return result ?? {};
  }
);

console.log("Post data:", post.value);
useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
});
</script>

<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-4xl font-bold mb-2">{{ post?.title }}</h1>
    <p class=" mb-4">{{ post?.meta?.date }}</p>
    <p class="text-lg= mb-8">{{ post?.description }}</p>
    <div class="prose dark:prose-invert mb-8">
      <ContentRenderer :value="post ?? {}" />
    </div>

    <div v-if="post?.meta?.tags?.length" class="my-8">
      <a
        v-for="tag in post.meta.tags"
        :key="tag"
        :href="`/blog/tags/${tag}`"
        class="text-sm font-semibold inline-block py-2 px-4 rounded-lg text-gray-100 bg-blue-500 uppercase last:mr-0 mr-4"
      >
        <Icon name="pajamas:label" size="1.5rem" class="text-gray-100 mr-2" />
        {{ tag }}
      </a>
    </div>
  </div>
</template>
