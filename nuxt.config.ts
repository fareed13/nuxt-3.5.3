// https://nuxt.com/docs/api/configuration/nuxt-config
import netlifyEnv from './netlify-env';
// import { getPostRoutes } from './utils/dynamicRoute'

export default defineNuxtConfig({
  site: {
    url: `https://${process.env.DEFAULT_PAGE_DOMAIN}`,
  },
  target: 'static',
  // hooks: {
  //   async 'nitro:config'(nitroConfig) {
  //     if (nitroConfig.dev) {
  //       return
  //     }
  //     let slugs = await getPostRoutes();
  //     nitroConfig.prerender.routes.push(...slugs)
  //     return
  //   }
  // },
  runtimeConfig: {
    public: {
      ...netlifyEnv,
      DEFAULT_PAGE_DOMAIN: process.env.DEFAULT_PAGE_DOMAIN
    }
  },

  head: {
    titleTemplate: '%s',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' }
    ]
  },
  loading: { color: '#fff' },

  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css', '@/assets/sass/_custom.scss', '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss', '@mdi/font/css/materialdesignicons.min.css',],
  build: {
    extractCSS: true,
    transpile: ['vuetify', '@vuepic/vue-datepicker', '@fawmi/vue-google-maps'],
    splitChunks: {
      layouts: true
    },
    optimization: {
      runtimeChunk: true
    },
    plugins: [],
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-jsonld',
    '@nuxt/image',
    'nuxt-speedkit',
    '@vite-pwa/nuxt',
    // 'nuxt-simple-sitemap',
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: ['/clearcache', '/thank-you'],
      Host: process.env.DEFAULT_PAGE_DOMAIN,
      Sitemap: `https://${process.env.DEFAULT_PAGE_DOMAIN}/sitemap.xml`
    }],
  ],

  pwa: {
    registerType: 'autoUpdate',
    selfDestroying: true,
    manifest: {
      name: process.env.DEFAULT_PAGE_DOMAIN,
      short_name: process.env.DEFAULT_PAGE_DOMAIN,
      description: process.env.DEFAULT_PAGE_DOMAIN,
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon.png',
          sizes: '64x164',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      cleanupOutdatedCaches: true
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

  // speed kit config
  speedkit: {

    detection: {
      performance: true,
      browserSupport: true
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },

    fonts: [
      {
        family: 'Lato',
        locals: ['Lato'],
        fallback: ['Roboto', 'sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 400,
            sources: [
              { src: '@/assets/fonts/lato-v22-latin-regular.woff', type: 'woff' },
              { src: '@/assets/fonts/lato-v22-latin-regular.woff2', type: 'woff2' }
            ]
          },
          {
            style: 'normal',
            weight: 700,
            sources: [
              { src: '@/assets/fonts/lato-v22-latin-700.woff', type: 'woff' },
              { src: '@/assets/fonts/lato-v22-latin-700.woff2', type: 'woff2' }
            ]
          }
        ]
      },
      {
        family: 'Khand',
        locals: ['Khand'],
        fallback: ['Roboto', 'sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 600,
            sources: [
              { src: '@/assets/fonts/khand-v12-latin-600.woff', type: 'woff' },
              { src: '@/assets/fonts/khand-v12-latin-600.woff2', type: 'woff2' }
            ]
          }
        ]
      },
      {
        family: 'Allerta Stencil',
        locals: ['Allerta Stencil'],
        fallback: ['Roboto', 'sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 400,
            sources: [
              { src: '@/assets/fonts/allerta-stencil-v16-latin-regular.woff', type: 'woff' },
              { src: '@/assets/fonts/allerta-stencil-v16-latin-regular.woff2', type: 'woff2' }
            ]
          }
        ]
      },
      {
        family: 'Caveat',
        locals: ['Caveat'],
        fallback: ['Roboto', 'sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 700,
            sources: [
              { src: '@/assets/fonts/caveat-v14-latin-700.woff', type: 'woff' },
              { src: '@/assets/fonts/caveat-v14-latin-700.woff2', type: 'woff2' }
            ]
          }
        ]
      },
      {
        family: 'Poppins',
        locals: ['Poppins'],
        fallback: ['Roboto', 'sans-serif'],
        variances: [
          {
            style: 'normal',
            weight: 400,
            sources: [
              { src: '@/assets/fonts/poppins-v19-latin-regular.woff', type: 'woff' },
              { src: '@/assets/fonts/poppins-v19-latin-regular.woff2', type: 'woff2' }
            ]
          }
        ]
      }
    ],

    componentAutoImport: false,
    componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%'
    },

    loader: {
      dataUri: null,
      size: '100px',
      backgroundColor: 'grey'
    }

  },

  image: {
    screens: {
      default: 320,
      xxs: 480,
      xs: 576,
      sm: 768,
      md: 996,
      lg: 1200,
      xl: 1367,
      xxl: 1600,
      '4k': 1921
    },

    domains: ['img.youtube.com', 'i.vimeocdn.com'],

    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    }
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  

})
