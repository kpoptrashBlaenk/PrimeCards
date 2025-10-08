<template>
  <Select
    :options="Object.values(PROPERTIES.fontWeight)"
    :default-value="(projectStore.selectedComponent?.properties as { fontWeight: FontWeightKey }).fontWeight"
    @change="projectStore.updateComponent('fontWeight', $event.value)"
  ></Select>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
