<template>
  <div class="flex">
    <div class="w-full flex flex-col lg:flex-row">
      <!-- Search Bar -->
      <ui-search-bar v-model:search="search" class="w-full mb-2 lg:mb-0" style="min-width: 16.9rem" />
      <div class="flex">
        <!-- Sort Button -->
        <ui-dropdown label="Sort" :options="sortOptions" v-model:selected="sort" class="lg:ml-2" />
        <!-- Filter Button -->
        <ui-dropdown label="Filter" :multiple="true" :options="filterOptions" v-model:selected="filter" class="ml-2" />
        <!-- New Project Button -->
      </div>
    </div>
    <nuxt-link to="/projects/new" class="ml-2">
      <Button
        size="small"
        label="New Project"
        icon="pi pi-sparkles"
        severity="success"
        :pt="{ label: { class: 'font-bold white-space-nowrap' }, icon: { class: 'font-bold' } }"
      ></Button>
    </nuxt-link>
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
