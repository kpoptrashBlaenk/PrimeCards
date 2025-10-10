<template>
  <div class="flex justify-end gap-3">
    <projects-edit-tree-properties-sub-label text="Family">
      <Select
        size="small"
        :options="Object.values(PROPERTIES.fontFamily)"
        :default-value="projectStore.selectedComponent?.properties.fontFamily"
        class="w-30"
        @change="projectStore.updateComponent('fontFamily', $event.value)"
      ></Select>
    </projects-edit-tree-properties-sub-label>

    <div class="flex flex-1 flex-col gap-1 items-center">
      <InputNumber
        v-model="fontSize"
        size="small"
        fluid
        @focusout="projectStore.updateComponent('fontSize', ($event.target as HTMLInputElement).value)"
      />
      <div class="text-xs">Size</div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const fontSize = ref<number>(projectStore.selectedComponent?.properties.fontSize)
</script>
