<script setup>
useSeoMeta({
  titleTemplate: "%s - Koko Portfolio",
  description: "Koko 的個人作品集網站，展示前端開發專案與部落格文章分享。",
  ogSiteName: "Koko Portfolio",
  ogImage: "/favicon.png",
  author: "Koko",
  keywords: "前端工程師, Vue.js, Nuxt.js, 作品集",
});
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main
      class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-10 grow items-start w-full"
    >
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

