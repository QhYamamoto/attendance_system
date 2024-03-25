<script setup lang="ts">
defineProps<{
  direction: "left" | "right"
}>()
</script>

<template>
  <v-btn
    color="blue-grey-lighten-3"
    density="compact"
    :icon="`mdi-arrow-${direction}`"
  />
</template>
