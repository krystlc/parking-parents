// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/leaflet"],
  css: ["~/assets/css/main.css"],
});
