<template>
  <div class="flex justify-end gap-3">
    <Button
      size="small"
      :severity="projectStore.selectedComponent?.properties.bold ? 'primary' : 'secondary'"
      class="bold"
      @click="projectStore.updateComponent('bold', !projectStore.selectedComponent?.properties.bold)"
      >B</Button
    >

    <Button
      size="small"
      :severity="projectStore.selectedComponent?.properties.italic ? 'primary' : 'secondary'"
      class="italic"
      @click="projectStore.updateComponent('italic', !projectStore.selectedComponent?.properties.italic)"
      >I</Button
    >

    <Button
      size="small"
      :severity="projectStore.selectedComponent?.properties.underline ? 'primary' : 'secondary'"
      class="underline"
      @click="projectStore.updateComponent('underline', !projectStore.selectedComponent?.properties.underline)"
      >U</Button
    >

    <Button
      size="small"
      :severity="projectStore.selectedComponent?.properties.lineThrough ? 'primary' : 'secondary'"
      class="line-through"
      @click="projectStore.updateComponent('lineThrough', !projectStore.selectedComponent?.properties.lineThrough)"
      >S</Button
    >

    <Button
      size="small"
      :severity="projectStore.selectedComponent?.properties.overline ? 'primary' : 'secondary'"
      class="overline"
      @click="projectStore.updateComponent('overline', !projectStore.selectedComponent?.properties.overline)"
      >O</Button
    >
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
