<template>
  <Select
    size="small"
    :options="Object.values(PROPERTIES.fontSize)"
    :default-value="projectStore.selectedComponent?.properties.fontSize"
    @change="projectStore.updateComponent('fontSize', $event.value)"
  ></Select>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
