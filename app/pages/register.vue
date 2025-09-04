<template>
  <FormsRegisterForm />
</template>

<script setup lang="ts">
/* Import */
import guest from '~~/middleware/guest.global'

/* Meta */
definePageMeta({
  middleware: guest,
})
</script>
