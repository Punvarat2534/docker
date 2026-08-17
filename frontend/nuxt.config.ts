export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@vesp/nuxt-fontawesome',
    ['@vee-validate/nuxt',
      { autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      }],
   ],
  css: ['~/assets/css/main.css'],
  plugins: [
    { src: "~/plugins/jquery", mode: "client" },
  ], 
  ui: {
    theme: {
      colors: ['primary', 'error']
    }
  },fontawesome: {
    icons: {
      solid: ['angle-double-left','angle-double-right','chevron-right','chevron-left','home','search','pencil','pencil-square','plus-circle','bars','times','trash','check-circle'],
    }
  }
})