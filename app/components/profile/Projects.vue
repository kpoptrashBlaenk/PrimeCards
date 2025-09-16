<template>
  <div>
    <div class="flex">
      <div class="w-12 flex flex-column lg:flex-row">
        <!-- Search Bar -->
        <UiSearchBar v-model:search="search" class="w-12 mb-2 lg:mb-0" style="min-width: 16.9rem" />
        <div class="flex">
          <!-- Sort Button -->
          <UiDropdown label="Sort" :options="sort.options" v-model:selected="sort.value" class="lg:ml-2" />
          <!-- Filter Button -->
          <UiDropdown label="Filter" :multiple="true" :options="filter.options" v-model:selected="filter.value" class="ml-2" />
          <!-- New Project Button -->
        </div>
      </div>
      <NuxtLink to="/projects/new" class="ml-2">
        <Button
          size="small"
          label="New Project"
          icon="pi pi-sparkles"
          severity="success"
          :pt="{ label: { class: 'font-bold white-space-nowrap' }, icon: { class: 'font-bold' } }"
        ></Button>
      </NuxtLink>
    </div>
    <Divider />
    <div v-for="project in projects">
      <div class="grid">
        <div class="col-7">
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
        <div class="col-5 text-right">
          <!-- Prod -->
          <div v-if="project.prod_version" class="mb-4">
            <Tag :value="`Production: v.${project.prod_version}`" severity="success" />
            <div class="text-xs text-400 ml-1 mt-1">{{ getDate('Published', new Date(project.prod_date)) }}</div>
          </div>
          <!-- Dev -->
          <div>
            <Tag :value="`Development: v.${project.dev_version}`" severity="warn" />
            <div class="text-xs text-400 ml-1 mt-1">{{ getDate('Updated', new Date(project.dev_date)) }}</div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDate } from '@functions/dates'

/* Refs */
// const projects = ref<SupabaseProject[]>()
const search = ref<string>('')
const sort = reactive({
  options: ['Last published', 'Last updated', 'Name'],
  value: 'Last published',
})
const filter = reactive({
  options: ['Published only'],
  value: null,
})

/* Composables */
const { getProjects } = useUser()

/* Constants */
const projects: SupabaseProject[] = [
  {
    project_id: 1,
    user_id: '1',
    created_at: `${new Date(2024, 4, 1)}`,
    name: 'test project',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu auctor dolor. Duis consequat ipsum quis orci dapibus, nec imperdiet velit blandit. Fusce ac felis tortor. Vivamus imperdiet ex eu laoreet gravida. Mauris lacus mauris, efficitur at pretium non, eleifend vel arcu. Ut ligula augue, euismod nec rutrum nec, viverra at lorem. Donec vitae erat eget magna mattis mattis.',
    dev_version: 2.3,
    prod_version: 1.4,
    dev_date: `${new Date(2025, 4, 15)}`,
    prod_date: `${new Date(2025, 8, 1)}`,
  },
]

/* Hooks */
onMounted(async () => {
  // get projects
})
</script>
