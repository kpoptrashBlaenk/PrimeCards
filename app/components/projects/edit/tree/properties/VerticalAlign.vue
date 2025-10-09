<template>
  <Select
    size="small"
    :options="Object.values(PROPERTIES.verticalAlign)"
    :default-value="(projectStore.selectedComponent?.properties as { verticalAlign: VerticalAlignKey }).verticalAlign"
    @change="projectStore.updateComponent('verticalAlign', $event.value)"
  ></Select>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
