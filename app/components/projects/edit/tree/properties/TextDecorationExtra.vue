<template>
  <div class="flex justify-end gap-3">
    <projects-edit-tree-properties-sub-label text="Style">
      <Select
        size="small"
        :options="Object.values(PROPERTIES.textDecorationStyle)"
        :default-value="projectStore.selectedComponent?.properties.textDecorationStyle"
        class="w-30"
        @change="projectStore.updateComponent('textDecorationStyle', $event.value)"
      ></Select>
    </projects-edit-tree-properties-sub-label>

    <projects-edit-tree-properties-sub-label text="Thickness">
      <InputNumber
        v-model="textDecorationThickness"
        size="small"
        fluid
        @focusout="projectStore.updateComponent('textDecorationThickness', ($event.target as HTMLInputElement).value)"
      />
    </projects-edit-tree-properties-sub-label>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const textDecorationThickness = ref<number>(projectStore.selectedComponent?.properties.textDecorationThickness)
</script>
