import "vuetify/styles"
import "./assets/main.scss"

import { createPinia } from "pinia"
import { createApp, type InjectionKey } from "vue"

import { localize } from "@vee-validate/i18n"
import ja from "@vee-validate/i18n/dist/locale/ja.json"
import dayjs from "dayjs"
import "dayjs/locale/ja"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { configure } from "vee-validate"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import App from "./App.vue"
import router from "./router"

import "@mdi/font/css/materialdesignicons.css"

// vee-validateの設定
configure({
  generateMessage: localize({
    ja,
  }),
})

localize("ja")

// Piniaの設定
const pinia = createPinia().use(piniaPluginPersistedstate)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
})

// dayjsの設定
dayjs.locale("ja")

export const dayjsKey: InjectionKey<typeof dayjs> = Symbol()

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .provide(dayjsKey, dayjs)
  .mount("#app")
