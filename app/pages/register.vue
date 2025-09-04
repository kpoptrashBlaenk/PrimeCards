<template>
  <FormsRegisterForm />
</template>

<script setup lang="ts">
/* Import */
import guest from '~~/middleware/guest'

/* Meta */
definePageMeta({
  middleware: guest,
})
</script>
