<template>
  <div class="mx-auto flex flex-column">
    <Button
      v-for="component in Object.values(COMPONENTS).filter((component) => component.type !== 'page')"
      :label="component.name"
      :icon="`pi pi-${component.icon}`"
      variant="text"
      size="small"
      class="w-12 justify-content-start"
      @click="projectStore.createComponent(component.type as ComponentType)"
    ></Button>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { COMPONENTS } from '@constants/components'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
