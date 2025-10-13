<template>
  <div class="flex justify-end">
    <ColorPicker
      v-model="color"
      size="small"
      @value-change="projectStore.updateComponent('fontColor', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const color = ref<string>(projectStore.selectedComponent?.properties.fontColor)
</script>
