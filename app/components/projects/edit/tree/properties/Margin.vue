<template>
  <div class="flex flex-wrap justify-end gap-2">
    <div
      v-for="margin in [
        ['Left', 'Right'],
        ['Top', 'Bottom'],
      ]"
      class="flex gap-2"
    >
      <div v-for="mar in margin" class="flex flex-col gap-2 items-center">
        <Select
          size="small"
          :options="Object.values(PROPERTIES.margin)"
          :default-value="projectStore.selectedComponent?.properties[`margin${mar}`]"
          @change="projectStore.updateComponent(`margin${mar}`, $event.value)"
        ></Select>
        <div class="text-sm">{{ mar }}</div>
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
