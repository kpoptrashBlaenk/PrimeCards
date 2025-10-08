<template>
  <auth-register />
</template>

<script setup lang="ts">
/* Import */
import guestGlobal from '@middleware/guest.global'

/* PageMeta */
definePageMeta({
  pageTransition: { name: 'scale', mode: 'out-in' },
  layout: false,
  middleware: guestGlobal,
})
</script>
