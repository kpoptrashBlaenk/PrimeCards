<template>
  <div class="flex justify-end gap-3">
    <Button
      v-for="align in Object.values(PROPERTIES.textAlign)"
      size="small"
      :severity="projectStore.selectedComponent?.properties.textAlign === PROPERTIES.textAlign[align] ? 'primary' : 'secondary'"
      :icon="`pi pi-align-${align}`"
      @click="projectStore.updateComponent('textAlign', PROPERTIES.textAlign[align])"
    ></Button>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { PROPERTIES } from '@constants/properties'
import { useProjectStore } from '@stores/project'

/* Stores */
const projectStore = useProjectStore()
</script>
