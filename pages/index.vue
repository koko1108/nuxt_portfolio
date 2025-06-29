<script setup>
const { data: posts } = await useAsyncData("latest-posts", () =>
  queryCollection("content")
    .where("path", "LIKE", "/blog%")
    .order("date", "DESC")
    .limit(3)
    .all()
);

console.log(posts.value);
// 首頁專屬 SEO，會覆蓋 app.vue 的預設
useSeoMeta({
  title: "Koko - Portfolio首頁",
  description: "歡迎來到 Koko 的個人作品集網站，探索我的最新專案與部落格文章！",
});
</script>
<template>
  <section>
    <h1 class="text-4xl font-bold mt-8">👋🏻 Hello, I'm Koko</h1>

    <p class="text-2xl text-gray-600 dark:text-gray-300 py-5">
      Explore my latest blogs and projects—get inspired!
    </p>

    <div class="flex gap-4 mt-5 mb-20">
      <UButton to="/projects" color="secondary" size="xl"> View Projects </UButton>
      <UButton to="/blog" color="secondary" variant="outline" size="xl"> Read Blog </UButton>
    </div>
  </section>
  <section>
    <h2 class="text-3xl font-bold mt-8">Latest Blog Posts</h2>
    <div class="grid md:grid-cols-3 pt-8 gap-10">
      <Post :posts="posts" />
    </div>
  </section>
</template>
