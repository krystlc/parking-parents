// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-02-09",
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: [
    '@netlify/nuxt',
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/leaflet",
    "@nuxtjs/sitemap",
    "@vueuse/nuxt",
    'nuxt-og-image',
  ],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY, // Server-side only
    resendAudienceId: process.env.RESEND_AUDIENCE_ID, // Publicly accessible if needed
    public: {
    }
  },
  css: ["~/assets/css/main.css"],
  site: {
    url: "https://parkingparents.com",
    name: "Parking Parents",
    indexable: true,
  },
  robots: {
    disallow: ["/admin", "/search?*"], // Don't index messy search result strings
  },
  // Force static generation for specific routes
  routeRules: {
    '/': { prerender: true },
    '/parks/*/': {
      prerender: true,
      sitemap: {
        priority: 1.0,
        changefreq: 'weekly'
      }
    },
    '/parks/*/*': {
      prerender: true,
      sitemap: {
        priority: 0.5,
        changefreq: 'monthly'
      }
    },
    '/kit/**': {
      prerender: true,
      sitemap: {
        priority: 0.8,
        changefreq: 'monthly'
      }
    },
  },

  // Optimization for Content v3
  // This helps Nuxt crawl your content files during 'nuxt generate'
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },

  // Sitemap - Ensure it's generated during build
  sitemap: {
    zeroRuntime: true,
    hostname: 'https://parkingparents.com',
    // Logic to prioritize Master Pages
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    // Path-based Prioritization
    strictNuxtContentAds: true, // Optimizes for Nuxt Content v3
  },
});
