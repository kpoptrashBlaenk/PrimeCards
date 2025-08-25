import AuraDarkPink from './assets/themes/auraDarkPink'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'PrimeCards',
      htmlAttrs: {
        lang: 'en',
        class: 'p-dark'
      },
    },
  },
  css: ['primeflex/primeflex.css', 'primeicons/primeicons.css', '~~/assets/css/main.css'],
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', '@primevue/nuxt-module'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false,
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: AuraDarkPink,
        options: {
          darkModeSelector: '.p-dark',
          cssLayer: false,
        },
      },
    },
  },
})
