<template>
  <div
    v-if="projectStore.selectedComponent"
    ref="propertiesRef"
    class="mx-auto flex flex-column gap-3 py-3 pr-2 scrollbar"
    :style="{ maxHeight: `${maxHeight}px` }"
  >
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

    <!-- Vertical Align -->
    <div
      v-if="'verticalAlign' in projectStore.selectedComponent.properties"
      class="flex justify-content-evenly align-items-center"
    >
      <projects-edit-tree-properties-label text="Vertical Align" tooltip="Vertical Align" />
      <projects-edit-tree-properties-vertical-align class="w-8" />
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

    <!-- Cursor -->
    <div v-if="'cursor' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Cursor" tooltip="Cursor" />
      <projects-edit-tree-properties-cursor class="w-8" />
    </div>

    <!-- Select -->
    <div v-if="'select' in projectStore.selectedComponent.properties" class="flex justify-content-evenly align-items-center">
      <projects-edit-tree-properties-label text="Select" tooltip="Select" />
      <projects-edit-tree-properties-select class="w-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Refs */
const propertiesRef = ref<HTMLDivElement>()
const maxHeight = ref<number>(0)

/* Stores */
const projectStore = useProjectStore()

/* Functions */
function changeMaxHeight() {
  maxHeight.value = window.innerHeight - propertiesRef.value!.getBoundingClientRect().top
}

/* Hooks */
onMounted(() => {
  changeMaxHeight()

  window.addEventListener('resize', changeMaxHeight)

  const observer = new ResizeObserver(changeMaxHeight)
  observer.observe(propertiesRef.value!)

  onBeforeMount(() => {
    window.removeEventListener('resize', changeMaxHeight)
    observer.disconnect()
  })
})
</script>
