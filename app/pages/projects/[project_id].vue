<template>
  <Splitter class="w-full h-full">
    <SplitterPanel :size="20">
      <ProjectsEditTree class="col-2 surface-50 border-right-1 border-200 h-full w-full"></ProjectsEditTree>
    </SplitterPanel>

    <SplitterPanel :size="80">
      <ProjectsEditMain class="col-8 h-full w-full"></ProjectsEditMain>
    </SplitterPanel>

    <SplitterPanel :size="20">
      <ProjectsEditProperties class="col-2 surface-50 border-left-1 border-200 h-full w-full"></ProjectsEditProperties>
    </SplitterPanel>
  </Splitter>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

/* PageMeta */
definePageMeta({
  layout: 'project',
  // middleware: authGlobal,
})

/* Refs */
const loading = ref<boolean>(true)
const project = ref<SupabaseProjectRow>()

/* Stores */
const userStore = useUserStore()

/* Composables */
const { getDevProject } = useProject()

/* Router */
const route = useRoute()

/* Setup */
try {
  const devProject = await getDevProject(route.params.project_id as string)

  if (devProject.user_id !== userStore.user?.user_id)
    throw createError({ statusCode: 403, message: 'You are not authorized to edit this project.' })

  project.value = devProject

  loading.value = false
} catch (error: any) {
  throw error
}
</script>
