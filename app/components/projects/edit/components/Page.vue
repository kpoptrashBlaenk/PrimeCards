<template>
  <div ref="pageRef" class="w-full h-full">
    <component
      v-if="'children' in page"
      v-for="(child, index) in page.children"
      :key="index"
      :is="getComponentName(child.type)"
      :component="child"
    />
  </div>
  <ProjectsEditComponentsOverlay v-if="pageRef" :id="page.id" :rect="pageRect" />
</template>

<script setup lang="ts">
/* Imports */
import { getComponentName } from '@functions/component'

/* Props */
defineProps<{
  page: PageComponent
}>()

/* Refs */
const pageRef = ref<HTMLDivElement>()
const pageRect = ref<DOMRect | undefined>(pageRef.value?.getBoundingClientRect())

/* Hooks */
onMounted(() => {
  const observer = new ResizeObserver(() => {
    pageRect.value = pageRef.value!.getBoundingClientRect()
  })

  observer.observe(pageRef.value!)

  onBeforeMount(() => observer.disconnect())
})
</script>
