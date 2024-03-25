<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import ButtonLarge from "@/components/atoms/buttons/ButtonLarge.vue"
import { dayjsKey } from "@/main"
import { default as Dayjs } from "dayjs"
import { inject, onMounted, ref } from "vue"

const dayjs = inject(dayjsKey) as typeof Dayjs
const currentDate = ref(dayjs().format("YYYY年MM月DD日"))
const currentTime = ref(dayjs().format("HH:mm:ss"))

onMounted(() => {
  setInterval(() => {
    currentDate.value = dayjs().format("YYYY年MM月DD日")
    currentTime.value = dayjs().format("HH:mm:ss")
  }, 1000)
})
</script>

<template>
  <NavBar title="出退勤打刻画面" />
  <v-main>
    <v-container class="d-flex flex-column align-center justify-center h-100">
      <v-row class="d-flex flex-column align-center justify-end mb-5">
        <span>{{ currentDate }}</span>
        <span class="text-h4">
          {{ currentTime }}
        </span>
      </v-row>
      <v-row>
        <v-col cols="4">
          <ButtonLarge color="primary" text="出勤" />
        </v-col>
        <v-col cols="4">
          <ButtonLarge color="error" text="退勤" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
