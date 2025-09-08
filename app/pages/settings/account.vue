<template>
  <SettingsPage />
</template>

<script setup lang="ts">
/* Import */
import authGlobal from '@middleware/auth.global'

/* Import */

/* PageMeta */
definePageMeta({
  layout: 'settings',
  middleware: authGlobal,
})
</script>
