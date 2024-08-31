// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  plugins: [{ src: "~/plugins/msal.ts", mode: "client" }],
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@ant-design-vue/nuxt'],

  runtimeConfig: {
    public: {
      clientId: process.env.CLIENTID,
      authority: process.env.AUTHORITY,
      redirectUri: process.env.REDIRECT_URI,
      postLogoutRedirectUri: process.env.POSTLOGOUT_REDIRECT_URI,
    },
  },

})