export default defineNuxtConfig({
  app: {
    head: {
      title: "makena <3",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "i'm makena kong, a full-stack engineer and artist based in san francisco",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/main.css"],
  components: true,
  devtools: { enabled: true },
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
    //'/api/*': { cache: { maxAge: 60 * 60 } },
  },
  runtimeConfig: {
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    public: {
      FIREBASE_STORAGE_TOKEN: process.env.FIREBASE_STORAGE_TOKEN,
    },
  },
});
