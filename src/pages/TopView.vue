<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { API_META } from "@/constants/api"
import { dayjsKey } from "@/main"
import { Request } from "@/modules/api"
import { useAuthStore } from "@/stores/auth"
import { default as Dayjs } from "dayjs"
import { inject, onMounted, ref } from "vue"

const dayjs = inject(dayjsKey) as typeof Dayjs
const currentTime = ref(dayjs().format("HH:mm:ss"))

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

  setInterval(() => {
    currentTime.value = dayjs().format("HH:mm:ss")
  }, 1000)
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
  <NavBar title="出退勤打刻" />
  <v-main>
    <v-container
      class="d-flex flex-column align-center justify-center"
      style="height: 100%"
    >
      <v-row class="d-flex align-end mb-5" style="font-size: 2rem">
        {{ currentTime }}
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn
            @click="setStore"
            color="primary"
            style="width: 150px; height: 100px; font-size: 1.5rem"
            >出勤</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            @click="resetStore"
            color="error"
            style="width: 150px; height: 100px; font-size: 1.5rem"
            >退勤</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
