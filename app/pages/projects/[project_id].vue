<template>
  <div></div>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@stores/user'

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
