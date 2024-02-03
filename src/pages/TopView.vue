<script setup lang="ts">
import { API_META } from "@/constants/api"
import { Request } from "@/modules/api"
import { onMounted } from "vue"

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
</script>

<template>
  <div>TOP画面yo</div>
</template>
