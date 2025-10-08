<template>
  <Select
    :options="Object.values(PROPERTIES.cursor)"
    :default-value="(projectStore.selectedComponent?.properties as { cursor: CursorKey }).cursor"
    @change="projectStore.updateComponent('cursor', $event.value)"
  ></Select>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
