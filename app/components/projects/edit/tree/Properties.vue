<template>
  <div v-if="projectStore.selectedComponent" class="mx-auto flex flex-column gap-3">
    <!-- Text -->
    <div v-if="'text' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Text" tooltip="Text" />
      <projects-edit-tree-properties-text class="w-8" />
    </div>

    <!-- FontSize -->
    <div v-if="'fontSize' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Font Size" tooltip="Font Size" />
      <projects-edit-tree-properties-font-size class="w-8" />
    </div>

    <!-- FontWeight -->
    <div v-if="'fontWeight' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Font Weight" tooltip="Font Weight" />
      <projects-edit-tree-properties-font-weight class="w-8" />
    </div>

    <!-- TextDecoration -->
    <div v-if="'italic' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Text Decoration" tooltip="Text Decoration" />
      <projects-edit-tree-properties-text-decoration class="w-8" />
    </div>

    <!-- TextAlign -->
    <div v-if="'textAlign' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Text Align" tooltip="Text Align" />
      <projects-edit-tree-properties-text-align class="w-8" />
    </div>

    <!-- LineHeight -->
    <div v-if="'lineHeight' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Line Height" tooltip="Line Height" />
      <projects-edit-tree-properties-line-height class="w-8" />
    </div>

    <!-- Wrap -->
    <div v-if="'wrap' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Wrap" tooltip="Wrap" />
      <projects-edit-tree-properties-wrap class="w-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
