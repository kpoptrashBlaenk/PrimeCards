<template>
  <Splitter class="w-full h-full" :gutterSize="2">
    <SplitterPanel :size="20" :minSize="15">
      <ProjectsEditTreeView class="col-2 surface-50 border-right-1 border-200 h-full w-full"></ProjectsEditTreeView>
    </SplitterPanel>

    <SplitterPanel :size="80" :minSize="20">
      <ProjectsEditMain class="col-8 h-full w-full"></ProjectsEditMain>
    </SplitterPanel>

    <!-- hidden and opened by a drawer -->
    <!-- <ProjectsEditProperties class="col-2 surface-50 border-left-1 border-200 h-full w-full"></ProjectsEditProperties> -->
  </Splitter>
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'
import { useUserStore } from '@stores/user'

/* PageMeta */
definePageMeta({
  layout: 'project',
  // middleware: authGlobal,
})

/* Refs */
const loading = ref<boolean>(true)

/* Stores */
const userStore = useUserStore()
const projectStore = useProjectStore()

/* Composables */
const { getDevProject } = useProject()

/* Router */
const route = useRoute()

/* Setup */
try {
  // const devProject = await getDevProject(route.params.project_id as string)

  // if (devProject.user_id !== userStore.user?.user_id)
  //   throw createError({ statusCode: 403, message: 'You are not authorized to edit this project.' })

  // project.value = devProject

  projectStore.select({
    project_id: 1,
    user_id: '',
    created_at: '',
    name: '',
    description: '',
    project_version: {
      version_id: 1,
      version: 1,
      date: '',
      prod: false,
      app: [
        {
          id: 1,
          type: 'page',
          name: 'Page',
          icon: 'desktop',
          parentId: 0,
        },
      ],
    },
  } as SupabaseProjectRow)

  loading.value = false
} catch (error: any) {
  throw error
}
</script>
