<template>
  <div class="flex justify-end">
    <ToggleSwitch
      size="small"
      :default-value="projectStore.selectedComponent?.properties.inline"
      @value-change="projectStore.updateComponent('inline', $event)"
    ></ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
