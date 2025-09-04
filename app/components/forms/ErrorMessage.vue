<template>
  <Message icon="pi pi-exclamation-circle" severity="error" size="small" variant="simple" class="-mt-3">{{ message }}</Message>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  message: string
}>()
</script>
