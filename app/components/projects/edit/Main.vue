<template>
  <div>
    <ProjectsEditComponentsPage v-if="selectedPage" :page="selectedPage" :key="selectedPage.id" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const selectedPage = ref<PageComponent>()

/* Hooks */
onMounted(() => {
  selectedPage.value = projectStore.project!.project_version.app[projectStore.selectedPage] as PageComponent
})
</script>
