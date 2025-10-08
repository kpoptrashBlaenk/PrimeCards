<template>
  <div v-if="projectStore.selectedComponent" class="mx-auto flex flex-column gap-3">
    <!-- Text -->
    <div v-if="'text' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Text" tooltip="Text" />
      <projects-edit-tree-properties-text class="w-9" />
    </div>

    <!-- FontSize -->
    <div class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Font Size" tooltip="Font Size" />
      <projects-edit-tree-properties-font-size class="w-9" />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
