<template>
  <NuxtLayout name="default">
    <div class="flex flex-column gap-5 text-center font-bold py-8">
      <div class="text-8xl" style="letter-spacing: 0.3rem">Error {{ error?.statusCode }}</div>
      <div class="text-3xl" v-html="error?.message"></div>
      <NuxtLink to="/">
        <Button size="large" rounded class="font-bold mt-4">Return Home</Button>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
/* Imports */
import type { NuxtError } from '#app'

/* Props */
defineProps({
  error: Object as () => NuxtError,
})
</script>
