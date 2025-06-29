<script setup>
const props = defineProps(["posts"]);

console.log("Posts:", props.posts);
</script>

<template>
  <UCard
    v-for="post in props.posts"
    :key="post.path"
    class="mb-6 bg-gray-200 dark:bg-gray-600 shadow shadow-gray-400"
    variant="soft"
  >
    <template #header>
      <NuxtLink :to="post.path">
        <img
          v-if="post.cover"
          :src="`/images/blog/${post.cover}`"
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
      <UButton color="secondary" trailing-icon="i-lucide-arrow-right" size="lg" class=" shadow-md shadow-sky-900 hover:shadow-none hover:translate-y-1 cursor-pointer">
        Read More
      </UButton>
    </NuxtLink>
  </UCard>
</template>
