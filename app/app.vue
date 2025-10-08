<template>
  <nuxt-loading-indicator />
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup lang="ts">
/* Head */
useHead({
  bodyAttrs: {
    class: ' surface-950 h-screen',
  },
})
</script>
