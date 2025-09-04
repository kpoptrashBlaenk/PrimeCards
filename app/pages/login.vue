<template>
  <FormsLoginForm />
</template>

<script setup lang="ts">
/* Import */
import guest from '~~/middleware/guest.global'

/* PageMeta */
definePageMeta({
  pageTransition: { name: 'scale', mode: 'out-in' },
  middleware: guest,
})
</script>
