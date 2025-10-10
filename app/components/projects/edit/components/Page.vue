<template>
  <div ref="pageRef" class="w-full h-full overflow-hidden">
    <component
      v-if="children"
      v-for="(child, index) in children"
      :key="index"
      :is="getComponent(child.type)"
      :component="child"
    />
  </div>

  <projects-edit-components-overlay v-if="pageRef" :id="page.id" :rect="pageRect" />
</template>

<script setup lang="ts">
/* Imports */
import { getComponent } from '@functions/component'
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
const children = computed(() => projectStore.findChildren(props.page.id))

/* Hooks */
onMounted(() => {
  const observer = new ResizeObserver(() => {
    pageRect.value = pageRef.value?.getBoundingClientRect()
  })

  observer.observe(pageRef.value!)

  onBeforeMount(() => observer.disconnect())
})
</script>
