<template>
  <Select
    :options="Object.values(PROPERTIES.select)"
    :default-value="(projectStore.selectedComponent?.properties as { select: SelectKey }).select"
    @change="projectStore.updateComponent('select', $event.value)"
  ></Select>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
