<template>
  <div>
    <div class="flex justify-content-between">
      <!-- Search Bar -->
      <UiSearchBar v-model:search="search" />
      <!-- Sort Button -->
      <UiDropdown label="Sort" :options="sort.options" v-model:selected="sort.value" />
      <!-- Filter Button -->
      <UiDropdown label="Filter" :multiple="true" :options="filter.options" v-model:selected="filter.value" />
      <!-- New Project Button -->
      <NuxtLink to="/projects/new">
        <Button
          size="small"
          label="New Project"
          icon="pi pi-sparkles"
          severity="success"
          :pt="{ label: { class: 'font-bold' }, icon: { class: 'font-bold' } }"
        ></Button>
      </NuxtLink>
    </div>
    <Divider />
  </div>
</template>

<script setup lang="ts">
/* Refs */
const search = ref<string>('')
const sort = reactive({
  options: ['Last published', 'Last updated', 'Name'],
  value: 'Last published',
})
const filter = reactive({
  options: ['Published only'],
  value: null,
})

/* Constants */
const projects = [
  {
    name: 'test project',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu auctor dolor. Duis consequat ipsum quis orci dapibus, nec imperdiet velit blandit. Fusce ac felis tortor. Vivamus imperdiet ex eu laoreet gravida. Mauris lacus mauris, efficitur at pretium non, eleifend vel arcu. Ut ligula augue, euismod nec rutrum nec, viverra at lorem. Donec vitae erat eget magna mattis mattis.',
    devVersion: 2.3,
    prodVersion: 1.4,
    dateDev: new Date().getDate(),
    dateProd: new Date().getDate(),
  },
]
</script>
