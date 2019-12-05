require('dotenv').config()


module.exports = {


  head: {
    title: 'nuxt-full-stack-template',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt full stack template for creating web app easily.'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /**
   * config local server|port
   */
  server: {
    port: process.env.PORT,
    host: '0.0.0.0'
  },

  /*
   ** modules
   */
  plugins: [
    { src: '@/plugins/axios.js', ssr: true },
    { src: '@/plugins/click-outside.js', ssr: false },
    { src: '@/plugins/global.js' },
    { src: '@/plugins/vue-awesome-swiper.js', ssr: false },
  ],

  /*
   ** modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  /*
   ** axios module options
   * https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: process.env.BASE_URL, // Default: http://[HOST]:[PORT][PREFIX]
    prefix: '/api',
    redirectError: {
      401: '/login',
      404: '/404'
    },
    retry: {
      retries: 3
    }, // interceptor retry time request
    debug: false, // default false
  },

  styleResources: {
    scss: [
    ],
  },

  /*
   ** Global CSS
   */
  css: [
  ],

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
