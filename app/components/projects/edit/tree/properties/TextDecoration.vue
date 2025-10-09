<template>
  <div class="flex justify-content-evenly">
    <Button
      size="small"
      :severity="(projectStore.selectedComponent?.properties as { italic: boolean }).italic ? 'primary' : 'secondary'"
      class="font-italic"
      @click="projectStore.updateComponent('italic', !(projectStore.selectedComponent?.properties as { italic: boolean }).italic)"
      >I</Button
    >

    <Button
      size="small"
      :severity="(projectStore.selectedComponent?.properties as { underline: boolean }).underline ? 'primary' : 'secondary'"
      class="underline"
      @click="
        projectStore.updateComponent(
          'underline',
          !(projectStore.selectedComponent?.properties as { underline: boolean }).underline,
        )
      "
      >U</Button
    >

    <Button
      size="small"
      :severity="(projectStore.selectedComponent?.properties as { lineThrough: boolean }).lineThrough ? 'primary' : 'secondary'"
      class="line-through"
      @click="
        projectStore.updateComponent(
          'lineThrough',
          !(projectStore.selectedComponent?.properties as { lineThrough: boolean }).lineThrough,
        )
      "
      >S</Button
    >
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
