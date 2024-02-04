<script setup lang="ts">
import { API_META } from "@/constants/api"
import { Request } from "@/modules/api"
import { useAuthStore } from "@/stores/auth"
import { onMounted } from "vue"

const authStore = useAuthStore()

onMounted(() => {
  new Request<RequestParametersB, ResponseA>(API_META.testApi)
    .setParameters({
      id: 1,
      today: "2024-02-03",
    })
    .execute()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
})

const setStore = () => {
  authStore.employee = {
    id: "A12345",
    name: "fuga",
    dateOfBirth: "hoge",
    type: "アルバイト",
  }
  authStore.token = "hogheogehoge"
}

const resetStore = () => {
  authStore.$reset()
}
</script>

<template>
  <div>TOP画面</div>
  <button @click="setStore">ログイン</button>
  <button @click="resetStore">ログアウト</button>
  <p>{{ authStore.isLoggedIn ? "ログイン中" : "ログアウト中" }}</p>
</template>
@/stores/auth
