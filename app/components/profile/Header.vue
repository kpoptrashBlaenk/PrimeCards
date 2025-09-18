<template>
  <div class="flex">
    <div class="w-12 flex flex-column lg:flex-row">
      <!-- Search Bar -->
      <UiSearchBar v-model:search="search" class="w-12 mb-2 lg:mb-0" style="min-width: 16.9rem" />
      <div class="flex">
        <!-- Sort Button -->
        <UiDropdown label="Sort" :options="sortOptions" v-model:selected="sort" class="lg:ml-2" />
        <!-- Filter Button -->
        <UiDropdown label="Filter" :multiple="true" :options="filterOptions" v-model:selected="filter" class="ml-2" />
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
</template>

<script setup lang="ts">
/* Imports */
import { vueComputedEmit } from '@functions/vueComputedEmit'

/* Props */
const props = defineProps<{
  search: string
  sort: string
  filter: string[]
  sortOptions: string[]
  filterOptions: string[]
}>()

/* Emits */
const emit = defineEmits(['update:search', 'update:sort', 'update:filter'])

/* Computeds */
const search = vueComputedEmit(emit, props, 'search')
const sort = vueComputedEmit(emit, props, 'sort')
const filter = vueComputedEmit(emit, props, 'filter')
</script>
