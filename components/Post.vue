<script setup>
const props = defineProps(["posts"]);

console.log("Posts:", props.posts);
</script>

<template>
  <UCard
    v-for="post in props.posts"
    :key="post.path"
    class="mb-6 bg-gray-100 dark:bg-gray-600 shadow-lg dark:shadow-gray-600"
    variant="soft"
  >
    <template #header>
      <NuxtLink :to="post.path">
        <img
          v-if="post.meta.cover"
          :src="`/images/blog/${post.meta.cover}`"
          :alt="`${post.title} Cover Image`"
          class="w-full h-48 object-cover rounded-t-lg"
        />
      </NuxtLink>
    </template>
    <h3 class="text-gray-900 dark:text-gray-200 text-xl font-bold mb-2">
      {{ post.title }}
    </h3>
    <p class="text-gray-700 dark:text-gray-300 mb-4">{{ post.description }}</p>
    <NuxtLink :to="post.path">
      <UButton trailing-icon="i-lucide-arrow-right" size="md">
        Read More
      </UButton>
    </NuxtLink>
  </UCard>
</template>
