<template>
  <div class="flex justify-content-between">
    <Button
      v-for="align in Object.values(PROPERTIES.textAlign)"
      :severity="
        (projectStore.selectedComponent?.properties as { textAlign: TextAlignKey }).textAlign === PROPERTIES.textAlign[align]
          ? 'primary'
          : 'secondary'
      "
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
