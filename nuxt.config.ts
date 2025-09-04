import AuraDarkPink from './assets/themes/auraDarkPink'

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      include: ['../plugins/**/*.ts', '../middleware/*.ts'],
    },
    sharedTsConfig: {
      include: ['../node_modules/@supabase/supabase-js/**/*'],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  plugins: ['~~/plugins/session.server'],
  app: {
    head: {
      title: 'PrimeCards',
      htmlAttrs: {
        lang: 'en',
        class: 'p-dark',
      },
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
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
