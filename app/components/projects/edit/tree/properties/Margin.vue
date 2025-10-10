<template>
  <div class="flex flex-wrap justify-end gap-2">
    <div class="flex gap-2">
      <!-- Left -->
      <projects-edit-tree-properties-sub-label text="Left">
        <InputText
          v-model="margin.left"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('marginLeft', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>

      <!-- Right -->
      <projects-edit-tree-properties-sub-label text="Right">
        <InputText
          v-model="margin.right"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('marginRight', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>
    </div>

    <div class="flex gap-2">
      <!-- Top -->
      <projects-edit-tree-properties-sub-label text="Top">
        <InputText
          v-model="margin.top"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('marginTop', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>

      <!-- Bottom -->
      <projects-edit-tree-properties-sub-label text="Bottom">
        <InputText
          v-model="margin.bottom"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('marginBottom', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const margin = reactive({
  left: projectStore.selectedComponent?.properties.marginLeft,
  right: projectStore.selectedComponent?.properties.marginRight,
  top: projectStore.selectedComponent?.properties.marginTop,
  bottom: projectStore.selectedComponent?.properties.marginBottom,
})
</script>
