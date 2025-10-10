<template>
  <div class="flex flex-wrap justify-end gap-2">
    <div
      v-for="padding in [
        ['Left', 'Right'],
        ['Top', 'Bottom'],
      ]"
      class="flex gap-2"
    >
      <div v-for="pad in padding" class="flex flex-col gap-2 items-center">
        <Select
          size="small"
          :options="Object.values(PROPERTIES.padding)"
          :default-value="projectStore.selectedComponent?.properties[`padding${pad}`]"
          @change="projectStore.updateComponent(`padding${pad}`, $event.value)"
        ></Select>
        <div class="text-sm">{{ pad }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
