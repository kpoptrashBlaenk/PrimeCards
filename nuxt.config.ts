export default defineNuxtConfig({
  app: {
    head: {
      title: 'PrimeCards',
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['primeflex/primeflex.css'],
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', '@primevue/nuxt-module'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
  },
})
