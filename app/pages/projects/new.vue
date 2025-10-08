<template>
  <div>
    <projects-new-stepper />
  </div>
</template>

<script setup lang="ts">
/* Import */
import authGlobal from '@middleware/auth.global'

/* PageMeta */
definePageMeta({
  middleware: authGlobal,
})
</script>
