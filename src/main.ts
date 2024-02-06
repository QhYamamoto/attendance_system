import "vuetify/styles"
import "./assets/main.scss"

import { createPinia } from "pinia"
import { createApp } from "vue"

import { localize } from "@vee-validate/i18n"
import ja from "@vee-validate/i18n/dist/locale/ja.json"
import { required } from "@vee-validate/rules"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { configure, defineRule } from "vee-validate"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import App from "./App.vue"
import router from "./router"

import "@mdi/font/css/materialdesignicons.css"

defineRule("required", required)

configure({
  generateMessage: localize({
    ja,
  }),
})

localize("ja")

const pinia = createPinia().use(piniaPluginPersistedstate)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
})

createApp(App).use(vuetify).use(pinia).use(router).mount("#app")
