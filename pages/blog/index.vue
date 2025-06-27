<script setup>
// 使用 useAsyncData 進行異步資料獲取，並快取結果
// 'blog-posts' 是快取的 key，用於識別和快取這個查詢
const { data: posts } = await useAsyncData("blog-posts", () =>
  // 從 'content' 集合中查詢資料
  // where('path', 'LIKE', '/blog%') 篩選出'路徑(path)'以 'LIKE'(SQL 的模糊匹配操作符)匹配模式為'/blog%'('/blog' 開頭的)
  // .all() 回傳所有符合條件的結果（陣列格式）
  queryCollection("content").where("path", "LIKE", "/blog%").all()
);

useSeoMeta({
  title: "Blog - Koko 的部落格",
  description: "探索我的技術文章和開發心得",
});
</script>

<template>
  <h1 class="text-4xl font-bold mb-8">部落格文章</h1>

  <section
    class="grid md:grid-cols-3 mt-8 gap-10"
    v-if="posts && posts.length > 0"
  >
    <Post :posts="posts" />
  </section>

  <div v-else class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400">還沒有文章</p>
  </div>
</template>
