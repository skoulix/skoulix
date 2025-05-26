import tailwindcss from '@tailwindcss/vite';
import locales from './locales.config';

export default defineNuxtConfig({
  modules: [
    //'@nuxtjs/ngrok',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'v-gsap-nuxt',
  ],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-05-14',

  devtools: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [process.env.APP_HOST || 'http://localhost:3000'],
    },
  },

  // ssr: false,

  nitro: {
    prerender: {
      routes: ['/'],
      // crawlLinks: false,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      dev: true,
    },
    renderer: {
      anchorLinks: false,
    },
  },

  // HMR for nested content files
  watch: ['~/content/**/*'],

  i18n: {
    locales,
    defaultLocale: 'en',
    lazy: true,
    strategy: 'prefix_except_default',
    bundle: {
      optimizeTranslationDirective: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
      redirectOn: 'root', // recommended
    },
  },

  icon: {
    mode: 'css',
    cssLayer: 'base',
  },

  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: ['400', '500', '600', '700'],
      },
    ],
  },

  vgsap: {
    composable: true,
    presets: [
      {
        name: 'stagger-default',
        modifiers: 'v-gsap.whenVisible.delay-1000.stagger.from',
        value: { opacity: 0, y: 20 },
      },
    ],
  },

  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
  },
});
