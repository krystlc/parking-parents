// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-02-09",
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/leaflet", "@nuxtjs/sitemap", "@vueuse/nuxt", 'nuxt-og-image'],
  css: ["~/assets/css/main.css"],
  site: {
    url: "https://parkingparents.com",
    name: "Parking Parents",
    indexable: true,
  },
  robots: {
    disallow: ["/admin", "/search?*"], // Don't index messy search result strings
  },
  sitemap: {
    // Logic to prioritize Master Pages
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
    },
    // We can filter collections or adjust individual paths here
  },
});
