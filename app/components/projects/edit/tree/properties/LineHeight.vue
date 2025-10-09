<template>
  <Select
    size="small"
    :options="Object.values(PROPERTIES.lineHeight)"
    :default-value="(projectStore.selectedComponent?.properties as { lineHeight: LineHeightKey }).lineHeight"
    @change="projectStore.updateComponent('lineHeight', $event.value)"
  ></Select>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
