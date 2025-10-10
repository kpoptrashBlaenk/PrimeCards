<template>
  <div class="flex justify-end gap-3 items-center">
    <ToggleButton
      :default-value="projectStore.selectedComponent?.properties.overflow"
      on-label="Overflow On"
      off-label="Overflow Off"
      size="small"
      :pt="{
        content: {
          class: projectStore.selectedComponent?.properties.overflow ? 'bg-surface-900' : 'bg-surface-800',
        },
      }"
      class="bg-surface-800 border-surface-900"
      :class="{ 'opacity-0': projectStore.selectedComponent?.properties.wrap }"
      @value-change="projectStore.updateComponent('overflow', $event)"
    />

    <ToggleSwitch
      size="small"
      :default-value="projectStore.selectedComponent?.properties.wrap"
      @value-change="projectStore.updateComponent('wrap', $event)"
    ></ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
