<template>
  <div class="flex flex-wrap justify-end gap-2">
    <div class="flex gap-2">
      <!-- Left -->
      <projects-edit-tree-properties-sub-label text="Left">
        <InputText
          v-model="padding.left"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('paddingLeft', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>

      <!-- Right -->
      <projects-edit-tree-properties-sub-label text="Right">
        <InputText
          v-model="padding.right"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('paddingRight', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>
    </div>

    <div class="flex gap-2">
      <!-- Top -->
      <projects-edit-tree-properties-sub-label text="Top">
        <InputText
          v-model="padding.top"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('paddingTop', ($event.target as HTMLInputElement).value)"
        />
      </projects-edit-tree-properties-sub-label>

      <!-- Bottom -->
      <projects-edit-tree-properties-sub-label text="Bottom">
        <InputText
          v-model="padding.bottom"
          size="small"
          class="w-15"
          @focusout="projectStore.updateComponent('paddingBottom', ($event.target as HTMLInputElement).value)"
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
const padding = reactive({
  left: projectStore.selectedComponent?.properties.paddingLeft,
  right: projectStore.selectedComponent?.properties.paddingRight,
  top: projectStore.selectedComponent?.properties.paddingTop,
  bottom: projectStore.selectedComponent?.properties.paddingBottom,
})
</script>
