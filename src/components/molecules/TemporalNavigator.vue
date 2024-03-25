<script setup lang="ts">
import ButtonArrow from "@/components/atoms/buttons/ButtonArrow.vue"

defineProps<{
  label: string
  showPrevious: () => void
  showNext: () => void
}>()
</script>
<template>
  <ButtonArrow direction="left" @click="showPrevious" />
  <span class="mx-5" style="font-size: 1.4rem">{{ label }}</span>
  <ButtonArrow direction="right" @click="showNext" />
</template>
