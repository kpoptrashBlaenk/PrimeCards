<template>
  <SettingsPage :title="'Account'" />
</template>

<script setup lang="ts">
/* Import */
import authGlobal from '@middleware/auth.global'

/* PageMeta */
definePageMeta({
  layout: 'settings',
  middleware: authGlobal,
})
</script>
