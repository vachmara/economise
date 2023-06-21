require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Économise !',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Adieu Uber Eats et les pizzas ! Découvrez Économise, l'outil qui génère des recettes à partir des ingrédients que vous avez chez vous. En utilisant l'IA, Économise génère des recettes basées sur les ingrédients que vous avez déjà dans votre frigo et votre placard. Plus besoin de gaspiller de l'argent sur des ingrédients supplémentaires ou de laisser des aliments se gâter parce que vous ne savez pas quoi en faire." },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'index, follow' }, 
      { name: 'keywords', content: 'optimisation des courses, économiser de l\'argent, recettes alimentaires, gaspillage alimentaire' },
      { name: 'author', content: 'Valentin Chmara' }, 
      { name: 'og:title', content: 'Économise' },
      { name: 'og:description', content: "Adieu Uber Eats et les pizzas ! Génère une recette en fonction de ce que tu as dans ton frigo." },
      { name: 'og:image', content: 'https://vachmara.github.io/economise/logo.png' },
      { name: 'og:url', content: 'https://vachmara.github.io/economise/' }, // URL du site pour les réseaux sociaux
      { name: 'twitter:card', content: 'summary_large_image' }, // Type de carte Twitter pour l'affichage
      { name: 'twitter:site', content: '@ValentinChmara' }, // Compte Twitter associé au site
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/axios',
    'nuxt-vue-multiselect',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  colorMode: {
    classSuffix: ''
  },

  axios: {
    baseURL: process.env.LOCAL ? 'http://localhost:3333/api' : 'https://economise-api.onrender.com/api',
  }
}
