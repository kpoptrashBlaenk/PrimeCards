<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useUserStore } from '~~/stores/user'

onMounted(() => {
  useUserStore().restoreSession()
})
</script>
