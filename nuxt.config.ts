export default defineNuxtConfig({
  app: {
    head: {
      title: "makena <3",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "title",
          content: "makena <3",
        },
        {
          name: "description",
          content: "i'm makena and this is my website",
        },
        {
          name: "type",
          content: "website",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/main.css"],
  components: true,
  devtools: { enabled: true },
  hooks: {
    close: () => {
      // @see https://github.com/nuxt/cli/issues/169#issuecomment-1729300497
      // Workaround for https://github.com/nuxt/cli/issues/169
      process.exit(0);
    },
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Open+Sans": true,
          "Space+Grotesk": true,
        },
      },
    ],
  ],
  nitro: {
    plugins: ["~/server/plugins/database.ts"],
  },
  routeRules: {
    "/": { prerender: true },
    "/api/*": { cache: { maxAge: 60 * 60 } },
  },
  runtimeConfig: {
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    public: {
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
      GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    },
  },
});
