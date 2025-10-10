<template>
  <nuxt-layout name="default">
    <div class="flex flex-col justify-center gap-5 text-center font-bold h-full -mt-12">
      <div class="text-9xl tracking-wide">Error {{ error?.statusCode }}</div>
      <div class="text-3xl" v-html="error?.message"></div>
      <nuxt-link to="/">
        <Button size="large" rounded class="font-bold mt-4">Return Home</Button>
      </nuxt-link>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">
/* Imports */
import type { NuxtError } from '#app'

/* Props */
defineProps({
  error: Object as () => NuxtError,
})
</script>
