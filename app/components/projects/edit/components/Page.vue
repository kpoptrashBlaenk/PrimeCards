<template>
  <div ref="pageRef" class="w-full h-full">
    <component
      v-if="children"
      v-for="(child, index) in children"
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
import { useProjectStore } from '@stores/project'

/* Props */
const props = defineProps<{
  page: PageComponent
}>()

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const pageRef = ref<HTMLDivElement>()
const pageRect = ref<DOMRect | undefined>(pageRef.value?.getBoundingClientRect())
const children = ref<ProjectComponent[] | undefined>(projectStore.findChildren(props.page.id))

/* Hooks */
onMounted(() => {
  const observer = new ResizeObserver(() => {
    pageRect.value = pageRef.value?.getBoundingClientRect()
  })

  observer.observe(pageRef.value!)

  onBeforeMount(() => observer.disconnect())
})
</script>
