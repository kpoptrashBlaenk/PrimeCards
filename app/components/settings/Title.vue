<template>
  <div v-if="context === 'title'" class="text-4xl -mb-2 mt-3">{{ title }}</div>
  <div v-if="context === 'subtitle'" class="text-500 mb-2" :class="{ 'mt-3': !first }">{{ title }}</div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  title: string
  context: 'title' | 'subtitle'
  first?: boolean
}>()
</script>
