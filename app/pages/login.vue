<template>
  <FormsLoginForm />
</template>

<script setup lang="ts">
/* Import */
import { FormsLoginForm } from '#components'
import guest from '~~/middleware/guest'

/* Meta */
definePageMeta({
  middleware: guest,
})
</script>
