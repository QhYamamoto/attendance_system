<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { dayjsKey } from "@/main"
import { default as Dayjs } from "dayjs"
import { inject, onMounted, ref } from "vue"

const dayjs = inject(dayjsKey) as typeof Dayjs
const currentTime = ref(dayjs().format("HH:mm:ss"))

onMounted(() => {
  setInterval(() => {
    currentTime.value = dayjs().format("HH:mm:ss")
  }, 1000)
})
</script>

<template>
  <NavBar title="出退勤打刻画面" />
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
            color="primary"
            style="width: 150px; height: 100px; font-size: 1.5rem"
            >出勤</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            color="error"
            style="width: 150px; height: 100px; font-size: 1.5rem"
            >退勤</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
