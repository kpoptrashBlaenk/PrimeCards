import AuraDarkPink from './app/assets/themes/auraDarkPink'

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      include: ['../plugins/*', '../middleware/*', '../shared/**/*', '../stores/*'],
    },
    sharedTsConfig: {
      include: ['../node_modules/@supabase/supabase-js/**/*'],
    },
  },
  alias: {
    '@app': '../app/app.vue',
    '@components': '../app/components',
    '@composables': '../app/composables',
    '@layouts': '../app/layouts',
    '@pages': '../app/pages',
    '@assets': '../app/assets',
    '@schemas': '../app/utils/schemas',
    '@functions': '../app/utils/functions',
    '@stores': '../stores',
    '@middleware': '../middleware',
    '@plugins': '../plugins',
    '~': '',
    '@': '',
    '~~': '',
    '@@': '',
    '#shared': '',
    '#assets': '',
    '#plugins': '',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  plugins: ['@plugins/session.server.ts'],
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
  css: ['primeflex/primeflex.css', 'primeicons/primeicons.css', '@assets/css/main.css'],
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', '@primevue/nuxt-module'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceKey: process.env.NUXT_SECRET_SUPABASE_SERVICE_KEY,
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
