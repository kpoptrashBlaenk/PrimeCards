<template>
  <div class="flex justify-end gap-3">
    <projects-edit-tree-properties-sub-label text="Letter">
      <InputNumber
        v-model="letterSpacing"
        size="small"
        fluid
        @focusout="projectStore.updateComponent('letterSpacing', ($event.target as HTMLInputElement).value)"
      />
    </projects-edit-tree-properties-sub-label>

    <projects-edit-tree-properties-sub-label text="Height">
      <InputNumber
        v-model="lineHeight"
        size="small"
        fluid
        @focusout="projectStore.updateComponent('lineHeight', ($event.target as HTMLInputElement).value)"
      />
    </projects-edit-tree-properties-sub-label>

    <projects-edit-tree-properties-sub-label text="Indent">
      <InputNumber
        v-model="indent"
        size="small"
        fluid
        @focusout="projectStore.updateComponent('indent', ($event.target as HTMLInputElement).value)"
      />
    </projects-edit-tree-properties-sub-label>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const letterSpacing = ref<number>(projectStore.selectedComponent?.properties.letterSpacing)
const lineHeight = ref<number>(projectStore.selectedComponent?.properties.lineHeight)
const indent = ref<number>(projectStore.selectedComponent?.properties.indent)
</script>
