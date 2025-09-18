<template>
  <div class="grid">
    <div class="col-12 sm:col-8">
      <!-- Title -->
      <div class="flex gap-2 align-items-center">
        <NuxtLink :to="`/projects/${project.project_id}`" class="text-2xl no-underline text-primary font-bold">
          {{ project.name }}
        </NuxtLink>
        <Tag
          :value="project.prod_version ? 'Published' : 'Unpublished'"
          :severity="project.prod_version ? 'success' : 'danger'"
          class="h-1rem text-xs"
          rounded
        />
      </div>
      <!-- Description -->
      <div class="text-400 text-sm line-height-2 mt-2">{{ project.description }}</div>
      <!-- Date created -->
      <div class="text-400 text-sm mt-3">{{ getDate('Created', new Date(project.created_at)) }}</div>
    </div>
    <div class="col-12 sm:col-4 flex gap-3 sm:block sm:text-right pr-3">
      <!-- Prod -->
      <div v-if="project.prod_version && project.prod_date" class="mb-4">
        <Tag :value="`Production: v.${fixVersion(project.prod_version)}`" severity="success" />
        <div class="text-xs text-400 ml-1 mt-1">{{ getDate('Published', new Date(project.prod_date)) }}</div>
      </div>
      <!-- Dev -->
      <div>
        <Tag :value="`Development: v.${fixVersion(project.dev_version)}`" severity="warn" />
        <div class="text-xs text-400 ml-1 mt-1">{{ getDate('Updated', new Date(project.dev_date)) }}</div>
      </div>
      <NuxtLink :to="`/projects/${project.project_id}`">
        <Button v-if="project.user_id === userStore.user?.user_id" size="small" class="mt-2 font-bold w-5">Edit</Button>
      </NuxtLink>
    </div>
    <Divider class="mt-2" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { getDate } from '@functions/dates'
import { fixVersion } from '@functions/version'
import { useUserStore } from '@stores/user'

/* Props */
defineProps<{
  project: SupabaseProject
}>()

/* Stores */
const userStore = useUserStore()
</script>
