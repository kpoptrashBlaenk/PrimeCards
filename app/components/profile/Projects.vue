<template>
  <div>
    <!-- Header -->
    <ProfileHeader
      v-model:search="search"
      v-model:sort="sort"
      v-model:filter="filter"
      :sort-options="sortOptions"
      :filter-options="filterOptions"
    />
    <Divider />

    <!-- Projects -->
    <UiSkeletons v-if="loading" v-for="skeletonField in skeletonFields" :field="skeletonField" />

    <div v-else-if="projects && projects.length === 0" class="text-5xl font-bold text-primary text-center mt-8">
      <div>We couldn't find any projects</div>
      <div>╥﹏╥</div>
    </div>

    <ProfileProject v-else v-for="project in projects" :project="project"></ProfileProject>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { filterBy, sortBy } from '@functions/filter'

/* Props */
const props = defineProps<{
  profile: SupabaseProfile
  loading: boolean
}>()

/* Refs */
const projects = ref<SupabaseProject[]>([])
const search = ref<string>('')
const sort = ref<string>('')
const filter = ref<string[]>([])
const sortOptions = ref<string[]>(['Last published', 'Last updated', 'Name'])
const filterOptions = ref<string[]>(['Published only'])

/* Watches */
watch(
  () => props.profile,
  (profile) => {
    if (!profile) return

    fetchProjects(profile.user_id)
  },
)
watch([filter, sort, search], () => {
  if (!props.profile) return
  fetchProjects(props.profile.user_id)
})

/* Composables */
const { getProjects } = useProject()

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

/* Fetch Projects */
async function fetchProjects(user_id: string) {
  try {
    // get projects
    let processedProjects = await getProjects(user_id)

    // filter search
    if (search.value && search.value.length > 0) {
      processedProjects = filterBy(processedProjects, search.value, ['name', 'description'], 'some')
    }

    // filter options
    if (filter.value && filter.value.length !== 0) {
      filter.value.forEach((f) => {
        switch (f) {
          // published only
          case filterOptions.value[0]:
            processedProjects = filterBy(processedProjects, '', ['prod_version', 'prod_date'], 'every')
        }
      })
    }

    // sort by
    if (sort.value) {
      switch (sort.value) {
        // last published
        case sortOptions.value[0]:
          processedProjects = sortBy(processedProjects, 'prod_date', true)
          break

        // last updated
        case sortOptions.value[1]:
          processedProjects = sortBy(processedProjects, 'dev_date', true)
          break

        // name
        case sortOptions.value[2]:
          processedProjects = sortBy(processedProjects, 'name')
          break
      }
    }

    projects.value = processedProjects
  } catch (error: any) {
    console.error(error)
    projects.value = []
    return
  }
}

/* Hooks */
onMounted(() => {
  fetchProjects(props.profile.user_id)
})
</script>
