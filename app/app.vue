<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
/* Head */
useHead({
  bodyAttrs: {
    class: ' surface-950 h-screen',
  },
})
</script>
