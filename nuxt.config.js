export default {
    ssr: false,

    target: 'static',

    head: {
        title: 'Abacus Practice',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: ['~/assets/css/fonts'],

    buildModules: ['@nuxtjs/eslint-module'],

    modules: ['@nuxtjs/pwa'],

    pwa: {
        manifest: {
            lang: 'en'
        }
    }
}
