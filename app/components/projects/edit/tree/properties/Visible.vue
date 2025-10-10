<template>
  <div class="flex justify-content-end">
    <ToggleSwitch
      size="small"
      :default-value="projectStore.selectedComponent?.properties.wrap"
      @value-change="projectStore.updateComponent('visible', $event)"
    ></ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
