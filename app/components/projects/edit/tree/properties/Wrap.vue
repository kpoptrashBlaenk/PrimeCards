<template>
  <div class="flex justify-content-between align-items-center pr-4">
    <ToggleSwitch
      :default-value="(projectStore.selectedComponent?.properties as { wrap: boolean }).wrap"
      @value-change="projectStore.updateComponent('wrap', $event)"
    ></ToggleSwitch>

    <ToggleButton
      :default-value="(projectStore.selectedComponent?.properties as { overflow: boolean }).overflow"
      on-label="Overflow On"
      off-label="Overflow Off"
      size="small"
      :pt="{
        content: {
          class: (projectStore.selectedComponent?.properties as { overflow: boolean }).overflow ? 'surface-50' : 'surface-100',
        },
      }"
      class="surface-100 border-50"
      :class="{ 'opacity-0': (projectStore.selectedComponent?.properties as { wrap: boolean }).wrap }"
      @value-change="projectStore.updateComponent('overflow', $event)"
    />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
