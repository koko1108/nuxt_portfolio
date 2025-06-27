<script setup>
// 首頁專屬 SEO，會覆蓋 app.vue 的預設
useSeoMeta({
  title: "Koko - Portfolio首頁",
  description: "歡迎來到 Koko 的個人作品集網站，探索我的最新專案與部落格文章！",
});
</script>
<template>
  <section class="mx-auto py-22 px-4">
    <h1 class="text-4xl font-bold">👋🏻 Hello, I'm Koko</h1>

    <p class="text-2xl text-gray-600 dark:text-gray-300 py-5">
      Explore my latest blogs and projects—get inspired!
    </p>

    <div class="flex gap-4 mt-5">
      <UButton to="/projects" color="primary"> View Projects </UButton>
      <UButton to="/blog" variant="outline"> Read Blog </UButton>
    </div>
  </section>
</template>
