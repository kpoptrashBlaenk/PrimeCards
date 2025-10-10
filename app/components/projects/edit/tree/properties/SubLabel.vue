<template>
  <div class="flex flex-col gap-1 items-center">
    <slot></slot>
    <div class="text-xs">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  text: string
}>()
</script>
