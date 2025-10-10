<template>
  <div class="flex justify-end gap-3 items-center flex-wrap">
    <ToggleButton
      :default-value="projectStore.selectedComponent?.properties.textOverflow"
      on-label="Ellipsis"
      off-label="Clip"
      size="small"
      :pt="{
        content: {
          class: projectStore.selectedComponent?.properties.textOverflow ? 'bg-surface-900' : 'bg-surface-800',
        },
      }"
      class="bg-surface-800 border-surface-900 w-30"
      :class="{
        'hidden!':
          projectStore.selectedComponent?.properties.overflow !== 'hidden' || projectStore.selectedComponent?.properties.wrap,
      }"
      @value-change="projectStore.updateComponent('textOverflow', $event)"
    />

    <Select
      size="small"
      class="w-30"
      :class="{ 'hidden!': projectStore.selectedComponent?.properties.wrap }"
      :options="Object.values(PROPERTIES.overflow)"
      :default-value="projectStore.selectedComponent?.properties.overflow"
      @change="projectStore.updateComponent('overflow', $event.value)"
    ></Select>

    <ToggleSwitch
      size="small"
      :default-value="projectStore.selectedComponent?.properties.wrap"
      @value-change="projectStore.updateComponent('wrap', $event)"
    ></ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
