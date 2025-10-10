<template>
  <div class="mx-auto flex flex-col p-5">
    <Button
      v-for="component in Object.values(COMPONENTS).filter((component) => component.type !== 'page')"
      :label="component.name"
      :icon="`pi pi-${component.icon}`"
      variant="text"
      size="small"
      class="w-full justify-start!"
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
