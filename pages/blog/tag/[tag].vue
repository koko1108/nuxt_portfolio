<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const tag = route.params.tag as string;

const { data: posts } = await useAsyncData(`tag-${tag}`, () =>
  queryCollection('content')
    .where('tags', 'LIKE', `%${tag}%`)
    .order('date', 'DESC')
    .all()
);

console.log(posts.value);
</script>

<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <h1 class="text-4xl font-bold mb-2">#{{ tag }}</h1>
    <div v-if="posts && posts.length">
      <div v-for="post in posts" :key="post.path" class="mb-8">
        <NuxtLink :to="post.path" class="text-2xl font-semibold hover:underline">
          {{ post.title }}
        </NuxtLink>
        <p class="text-gray-500 text-sm mb-1">{{ post.date }}</p>
        <p class="mb-2">{{ post.description }}</p>
      </div>
    </div>
    <div v-else class="text-gray-400 text-center py-12">
      沒有找到相關文章。
    </div>
  </div>
</template>
