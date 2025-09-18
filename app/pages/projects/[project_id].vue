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

/* Hooks */
onMounted(async () => {
  try {
    const devProject = await getDevProject(route.params.project_id as string)

    if (devProject.user_id !== userStore.user?.user_id) throw new Error('User not authorized to edit this project.')

    project.value = devProject
  } catch (error: any) {
    console.error(error)
    // TODO: 403 user authroization
  } finally {
    loading.value = false
  }
})
</script>
