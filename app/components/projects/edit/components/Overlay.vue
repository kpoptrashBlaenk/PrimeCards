<template>
  <div
    :style="{ width: rect?.width + 'px', height: rect?.height + 'px', left: rect?.left + 'px', top: rect?.top + 'px' }"
    class="fixed z-1"
    :class="{ 'border-3 border-primary': projectStore.selectedComponent?.id === id }"
  ></div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Props */ defineProps<{
  id: number
  rect: DOMRect | undefined
}>()

/* Stores */
const projectStore = useProjectStore()
</script>
