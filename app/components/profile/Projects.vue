<template>
  <div>
    <!-- Header -->
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

    <!-- Projects -->
    <UiSkeletons v-if="loading" v-for="skeletonField in skeletonFields" :field="skeletonField" />

    <div v-else-if="filteredProjects && filteredProjects.length === 0" class="text-5xl font-bold text-primary text-center mt-8">
      <div>We couldn't find any projects</div>
      <div>╥﹏╥</div>
    </div>

    <div v-else v-for="project in filteredProjects">
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
/* Imports */
import { getDate } from '@functions/dates'

/* Props */
const props = defineProps<{
  profile: SupabaseProfile
  loading: boolean
}>()

/* Refs */
const projects = ref<SupabaseProject[]>([])
const search = ref<string>('')
const sort = reactive({
  options: ['Last published', 'Last updated', 'Name'],
  value: 'Last published',
})
const filter = reactive({
  options: ['Published only'],
  value: null as string[] | null,
})

/* Computeds */
const filteredProjects = computed(() => {
  let processedProjects = projects.value

  // filter search
  processedProjects = projects.value.filter(
    (project) =>
      project.name.toLowerCase().includes(search.value.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.value.toLowerCase()),
  )

  // filter options
  if (filter.value && filter.value.length !== 0)
    processedProjects = processedProjects.filter((project) => {
      return filter.value?.every((f) => {
        switch (f) {
          // published only
          case filter.options[0]:
            return project.prod_version && project.prod_date

          // default
          default:
            return false
        }
      })
    })

  // sort by
  processedProjects = [...projects.value].sort((a, b) => {
    switch (sort.value) {
      // last published
      case sort.options[0]:
        if (a.prod_version && !b.prod_version) return -1
        if (!a.prod_version && b.prod_version) return 1
        if (a.prod_version && b.prod_version) return b.prod_version - a.prod_version
        return b.dev_version - a.dev_version

      // last updated
      case sort.options[1]:
        if (a.prod_version && !b.prod_version) return -1
        if (!a.prod_version && b.prod_version) return 1
        const aDev = new Date(a.dev_date).getTime()
        const bDev = new Date(b.dev_date).getTime()
        return bDev - aDev

      // default
      default:
        return 0
    }
  })

  return processedProjects
})

/* Composables */
const { getProjects } = useUser()

/* Constants */
const skeletonFields: SkeletonProp[] = [
  {
    type: 'wrapper',
    class: 'grid',
    fields: [
      {
        type: 'wrapper',
        class: 'col-12 sm:col-8',
        fields: [
          {
            type: 'wrapper',
            class: 'flex gap-2 align-items-center',
            fields: [
              { type: 'skeleton', height: 1.75, width: 20 },
              { type: 'skeleton', height: 0.875, width: 5 },
            ],
          },
          {
            type: 'wrapper',
            class: 'mt-3',
            fields: [
              { type: 'skeleton', height: 0.875, width: 25.5 },
              { type: 'skeleton', height: 0.875, width: 25.5, class: 'mt-1' },
              { type: 'skeleton', height: 0.875, width: 25.5, class: 'mt-1' },
            ],
          },
          { type: 'skeleton', height: 0.875, width: 10, class: 'mt-3' },
        ],
      },
      {
        type: 'wrapper',
        class: 'col-12 sm:col-4 flex gap-3 sm:block sm:text-right pr-3',
        fields: [
          {
            type: 'wrapper',
            class: 'flex flex-column align-items-end mb-4',
            fields: [
              { type: 'skeleton', height: 1, width: 7.875 },
              { type: 'skeleton', height: 0.875, width: 7.875, class: 'mt-1' },
            ],
          },
          {
            type: 'wrapper',
            class: 'flex flex-column align-items-end',
            fields: [
              { type: 'skeleton', height: 1, width: 7.875 },
              { type: 'skeleton', height: 0.875, width: 7.875, class: 'mt-1' },
            ],
          },
        ],
      },
    ],
  },
  { type: 'divider' },
]

/* Hooks */
onMounted(async () => {
  try {
    await getProjects(props.profile.user_id)
  } catch (error: any) {
    projects.value = []
  }
})
</script>
