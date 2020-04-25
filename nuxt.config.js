require("dotenv").config();

module.exports = {
    head: {
        title: "Schoolly",
        meta: [{
            charset: "utf-8"
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        },
        {
            hid: "description",
            name: "description",
            content: "Nuxt full stack template for creating web app easily."
        }
        ],
        link: [{
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico"
        }]
    },

    env: {
        SOCKET_URI: process.env.SOCKET_URI,
        PAYMENT_REQ_URL: process.env.PAYMENT_REQ_URL,
        PAYMENT_RETURN_URL: process.env.PAYMENT_RETURN_URL,
        PAYMENT_VPC_VERSION: process.env.PAYMENT_VPC_VERSION,
        PAYMENT_VPC_ACCESS_CODE: process.env.PAYMENT_VPC_ACCESS_CODE,
        PAYMENT_VPC_COMMAND: process.env.PAYMENT_VPC_COMMAND,
        PAYMENT_VPC_CURRENCY: process.env.PAYMENT_VPC_CURRENCY,
        PAYMENT_VPC_MERCHANT: process.env.PAYMENT_VPC_MERCHANT,
        PAYMENT_VPC_TICKETNO: process.env.PAYMENT_VPC_TICKETNO,
        PAYMENT_AGAIN_LINK: process.env.PAYMENT_AGAIN_LINK,

    },

    /**
     * config local server|port
     */
    server: {
        port: process.env.PORT,
        host: "0.0.0.0"
    },

    /*
     ** modules
     */
    plugins: [
        { src: "@/plugins/axios.js", ssr: true },
        { src: "@/plugins/click-outside.js", ssr: false },
        { src: "@/plugins/global.js" },
        { src: "@/plugins/vue-awesome-swiper.js", ssr: false },
        { src: "@/plugins/textarea-autosize.js", ssr: false },
        { src: "@/plugins/vuelidate.js", ssr: true },
        { src: "@/plugins/vue-moment.js" },
        { src: "@/plugins/firebase-auth.js" },
        { src: "@/plugins/vue-select.js" },
        { src: "@/plugins/filters.js" },
        { src: "@/plugins/vue-fragment.js" },
        { src: "@/plugins/vue-toast.js", ssr: false },
        { src: "@/plugins/vue-infinite-loading.js", ssr: false },
        { src: '~/plugins/vue-cropper', ssr: false },
        { src: "@/plugins/sticky.js", ssr: false },
        { src: "@/plugins/tooltip.js", ssr: false },
        { src: "@/plugins/vue-input-number.js" },
    ],
    /**
     * Global middleware
     */
    router: {
        middleware: ["check-auth"]
    },

    /*
     ** modules
     */
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/style-resources",
        "@nuxtjs/svg",
        "portal-vue/nuxt",
        "@nuxtjs/recaptcha"
    ],

    /*
     ** axios module options
     * https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: process.env.BASE_URL_API, // Default: http://[HOST]:[PORT][PREFIX]
        redirectError: {
            401: "/login",
            404: "/404"
        },
        retry: {
            retries: 0
        }, // interceptor retry time request
        debug: true // default false
    },

    recaptcha: {
        siteKey: process.env.CAPTCHA_SITEKEY,
        version: 3
    },

    styleResources: {
        scss: [
            "~assets/scss/abstracts/_variables.scss",
            "~assets/scss/abstracts/_functions.scss",
            "~assets/scss/abstracts/_mixins.scss",
            "~assets/scss/abstracts/*.scss",
            "~assets/scss/vendors/*.scss"
        ]
    },

    /*
     ** Global CSS
     */
    css: ["@/assets/scss/styles.scss"],

    /*
     ** Customize the progress bar color
     */
    // loading: {
    //     color: "#3B8070"
    // },

    loading: false,

    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            config.node = {
                console: false,
                fs: "empty",
                net: "empty",
                tls: "empty",
                child_process: "empty",
                module: "empty"
            };
            if (isDev && isClient) {
                // config.module.rules.push({
                //   enforce: 'pre',
                //   test: /\.(js|vue)$/,
                //   loader: 'eslint-loader',
                //   exclude: /(node_modules)/
                // })
            }

            if (isDev) {
                config.devtool = isClient ? 'source-map' : 'inline-source-map'
            }
        }
    }
};