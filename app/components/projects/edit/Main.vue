<template>
  <div>
    <projects-edit-components-page v-if="selectedPage" :page="selectedPage" :key="selectedPage.id" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const selectedPage = ref<PageComponent>()

/* Watches */
watch(
  () => projectStore.selectedPage,
  (newValue) => {
    selectPage(newValue)
  },
)

/* Hooks */
onMounted(() => {
  selectPage(projectStore.selectedPage)
})

/* Functions */
function selectPage(id: number) {
  selectedPage.value = projectStore.project!.project_version.app.find((component) => component.id === id) as PageComponent
}
</script>
