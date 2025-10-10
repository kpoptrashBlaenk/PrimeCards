<template>
  <div
    v-if="projectStore.selectedComponent"
    ref="propertiesRef"
    class="mx-auto flex flex-col gap-3 pb-5 pr-2 scrollbar"
    :style="{ maxHeight: `${maxHeight}px` }"
  >
    <!-- Text -->
    <div v-if="'text' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Text" tooltip="Text" />
      <projects-edit-tree-properties-text class="w-8/12" />
    </div>

    <!-- Inline -->
    <div v-if="'inline' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Inline" tooltip="Inline" />
      <projects-edit-tree-properties-inline class="w-8/12" />
    </div>

    <!-- Visible -->
    <div v-if="'visible' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Visible" tooltip="Visible" />
      <projects-edit-tree-properties-visible class="w-8/12" />
    </div>

    <!-- Padding -->
    <div v-if="'paddingLeft' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Padding" tooltip="Padding" />
      <projects-edit-tree-properties-padding class="w-8/12" />
    </div>

    <!-- Margin -->
    <div v-if="'marginLeft' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Margin" tooltip="Margin" />
      <projects-edit-tree-properties-margin class="w-8/12" />
    </div>

    <!-- Font -->
    <div v-if="'fontSize' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Font" tooltip="Font" />
      <projects-edit-tree-properties-font class="w-8/12" />
    </div>

    <!-- TextDecoration -->
    <div v-if="'bold' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Text Decoration" tooltip="Text Decoration" />
      <projects-edit-tree-properties-text-decoration class="w-8/12" />
    </div>

    <!-- TextDecorationExtra -->
    <div v-if="'textDecorationStyle' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Text Decoration Extra" tooltip="Text Decoration Extra" />
      <projects-edit-tree-properties-text-decoration-extra class="w-8/12" />
    </div>

    <!-- Spacing -->
    <div v-if="'letterSpacing' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Spacing" tooltip="Spacing" />
      <projects-edit-tree-properties-spacing class="w-8/12" />
    </div>

    <!-- TextAlign -->
    <div v-if="'letterSpacing' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Text Align" tooltip="Text Align" />
      <projects-edit-tree-properties-text-align class="w-8/12" />
    </div>

    <!-- VerticalAlign -->
    <div v-if="'verticalAlign' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Vertical Align" tooltip="Vertical Align" />
      <projects-edit-tree-properties-vertical-align class="w-8/12" />
    </div>

    <!-- Wrap -->
    <div v-if="'wrap' in projectStore.selectedComponent.properties" class="flex justify-between items-center">
      <projects-edit-tree-properties-label text="Wrap" tooltip="Wrap" />
      <projects-edit-tree-properties-wrap class="w-8/12" />
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
