// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Koko Portfolio",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/apollo",
  ],
  css: ["~/assets/css/main.css"],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  apollo: {
    autoImports: true,
    clients: {
      default: {
         httpEndpoint: 'https://api.github.com/graphql', // GitHub GraphQL API endpoint
        httpLinkOptions: {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}` // 設定驗證 header
          }
        },
      },
    },
  },
});
