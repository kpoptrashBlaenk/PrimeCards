<template>
  <Skeleton height="3.3rem" />
  <Skeleton height="3.3rem" />
  <Skeleton v-if="context === 'register'" height="3.3rem" />
  <div class="flex justify-content-center">
    <Skeleton height="2.6rem" />
  </div>
  <Skeleton height="1.1rem" class="-mt-1" />
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  context: 'register' | 'login'
}>()
</script>
