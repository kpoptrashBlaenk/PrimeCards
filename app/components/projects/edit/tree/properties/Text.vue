<template>
  <InputText
    v-model="text"
    name="propertyText"
    size="small"
    @focusout="projectStore.updateComponent('text', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
/* Imports */
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()

/* Refs */
const text = ref<string>(projectStore.selectedComponent?.properties.text)
</script>
